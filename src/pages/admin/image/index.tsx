import { LayoutAdmin } from '@/components/common';
import { ModalCustom, FileUpload, Image, Loading } from '@/components/ui';
import { Button, Container, Text, Link, Stack, useBoolean, useDisclosure, useToast, Flex, Heading, MenuButton, Menu, MenuList, MenuItem, CloseButton, IconButton, Progress, Icon, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import clsx from 'clsx';
import { NextPage } from 'next';
import { BsChevronDown, BsLink } from 'react-icons/bs';
import apiImage from '@/lib/cloudinary';
import useSWR from 'swr';

const AdminImage: NextPage = () => {
    const toast = useToast()
    const { data, error } = useSWR('/api/image', (url: RequestInfo) => fetch(url).then((res) => res.json()))
    const { result, nextPage } = data ?? { result: undefined, nextPage: '' }
    const [edit, setEdit] = useState<any>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [tick, setTick] = useBoolean()
    const [listDelete, setListDelete] = useState<string[]>([])

    const validateFiles = (value: FileList) => {
        if (value.length < 1) {
            return 'Files is required'
        }
        for (const file of Array.from(value)) {
            const fsMb = file.size / (1024 * 1024)
            const MAX_FILE_SIZE = 10
            if (fsMb > MAX_FILE_SIZE) {
                return 'Max file size 10mb'
            }
        }
        return true
    }

    const onChangeFile = async (value: any) => {
        if (validateFiles(value)) {
            let fileListAsArray: File[] = Array.from(value.target.files)
            await Promise.all(
                fileListAsArray.map((file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", apiImage.upload_preset);
                    return fetch(`https://api.cloudinary.com/v1_1/${apiImage.cloudName}/image/upload`, {
                        method: "POST",
                        body: data,
                    });
                })
            ).then(async (res) => {
                let check: number = 0
                let filesAfter: any[] = []
                res.map(async val => {
                    if (val.ok) {
                        check = check + 1
                        filesAfter.push(await val.json())
                    }
                })
                /* filesAfter = filesAfter.reverse()
                let cloneData: any = images
                filesAfter.map(item => {
                    cloneData.unshift(item)
                })
                setImages(cloneData) */
                toast({
                    title: `Upload file ${check + '/' + fileListAsArray.length}`,
                    status: (check == fileListAsArray.length ? 'success' : 'error'),
                    isClosable: true,
                    position: 'bottom-right'
                })
            }).catch((err) => console.log("err upload", err));
        }
    }

    const handelClickImgae = async (title: string, image: string) => {
        if (tick) {
            if (!listDelete.find(e => e == title)) {
                setListDelete([...listDelete, title])
            } else {
                const clone = listDelete.filter(e => e != title)
                setListDelete(clone)
            }
            return;
        }
        /* let metadata: any = await firebase.getImage(path)
        setEdit({ link: link, meta: metadata })
        onOpen() */
    }

    const deleteImages = async (files: string[]) => {
        if (files && files.length > 0) {
            const delData = await fetch('/api/image', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ files: files })
            })
            toast({
                title: `Deleted file`,
                status: (delData.ok ? 'success' : 'error'),
                isClosable: true,
                position: 'bottom-right'
            })
            setTick.off()
        }
    }

    return <LayoutAdmin>
        <Container maxW={'container.xl'} py='1'>
            <Stack justifyContent={'space-between'} direction='row' mb='4' bg={'whiteAlpha.900'} p='1' shadow={'md'} rounded='md'>
                <Stack direction='row' alignItems='center'>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                            Actions
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => { setTick.toggle(); setListDelete([]) }}>Select Images</MenuItem>
                        </MenuList>
                    </Menu>
                    {tick && <Button onClick={() => deleteImages(listDelete)}>Delete</Button>}
                    {tick && <CloseButton onClick={() => setTick.off()} />}
                </Stack>
                <Stack justifyContent={'space-between'} direction='row'>
                    <FileUpload
                        accept={'image/*'}
                        multiple
                        onChange={onChangeFile} />
                </Stack>
            </Stack>
            {!result ? <Loading/>
                : <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={2}>
                    {result && result.map((v: any, i: number) =>
                        <Link className={clsx(
                            listDelete.length != 0 && listDelete.find(e => e == v.public_id) && 'checkImage',
                            tick && 'selectImage')}
                            key={i} mr='2'
                            textDecoration="none" _hover={{ textDecoration: 'none' }}
                            onClick={() => handelClickImgae(v.public_id, v.image)} >
                            <Stack width="150px" height="175px" shadow={'md'} spacing='0' rounded={'sm'}>
                                <Image
                                    objectFit="cover"
                                    className='hoverImage'
                                    src={v.secure_url}
                                    alt={`Image ${v.public_id}`}
                                    width="150px"
                                    height="150px"
                                    layout='intrinsic' />
                                <Stack height={'25px'} direction={'row'} alignItems='center'>
                                    <Icon as={BsLink} onClick={() => {
                                        navigator.clipboard.writeText(v.secure_url)
                                        toast({
                                            title: `Copy link`,
                                            status: 'info',
                                            isClosable: true,
                                            position: 'bottom-right'
                                        })
                                    }} />
                                    <Text isTruncated>{v.public_id}</Text>
                                </Stack>
                            </Stack>
                        </Link>)
                    }
                </SimpleGrid>}
        </Container>
        <ModalCustom title='IMAGE' isOpen={isOpen} onClose={onClose}>
            {edit && <Stack direction={'column'} gap={4}>
                <Image
                    objectFit="cover"
                    className='hoverImage'
                    src={edit.link}
                    alt={`Image ${edit.meta.name}`}
                    width="100%"
                    height="100%"
                    layout='responsive' />
                <Stack direction={'column'}>
                    <Heading fontSize={'2xl'}>{edit.meta.name}</Heading>
                    <Text>ContentType: {edit.meta.contentType}</Text>
                    <Text>Path: {edit.meta.fullPath}</Text>
                    <Text>Size: {edit.meta.size}bytes</Text>
                    <Text>Created: {new Date(edit.meta.timeCreated).toLocaleString()}</Text>
                    <Text>Updated: {new Date(edit.meta.updated).toLocaleString()}</Text>
                    <Text color='gray.500' isTruncated>Link: <Link href={edit.link}>{edit.link}</Link></Text>
                </Stack>
            </Stack>
            }
        </ModalCustom>
    </LayoutAdmin>;
}

export default AdminImage;