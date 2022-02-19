import { LayoutAdmin } from '@/components/common';
import { Box, Button, Container, Text, Link, Stack, useBoolean, useDisclosure, useToast, Flex, Heading, MenuButton, Menu, MenuList, MenuItem, CloseButton, IconButton, Progress, Icon, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ModalCustom } from '@/components/ui';
import FileUpload from '@/components/ui/FileUpload';
import { useForm } from 'react-hook-form'
import clsx from 'clsx';
import { NextPage } from 'next';
import { BsChevronDown, BsLink } from 'react-icons/bs';
import apiImage from '@/lib/cloudinary';
import useSWR from 'swr';

const AdminImage: NextPage = () => {
    const toast = useToast()

    const [images, setImages] = useState([])
    const [edit, setEdit] = useState<any>()
    const [load, setLoad] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [SCheck, setSCheck] = useBoolean()
    const [checkImg, setCheckImg] = useState<string[]>([])
    const { register } = useForm<{ file_: FileList }>()

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
            setLoad(true)
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
                filesAfter = filesAfter.reverse()
                let cloneData: any = images
                filesAfter.map(item => {
                    cloneData.unshift(item)
                })
                setImages(cloneData)
                toast({
                    title: `Upload file ${check + '/' + fileListAsArray.length}`,
                    status: (check == fileListAsArray.length ? 'success' : 'error'),
                    isClosable: true,
                    position: 'bottom-right'
                })
            }).catch((err) => console.log("err upload", err));
            setLoad(false)
        }
    }

    const handelClickImgae = async (title: string, image: string) => {
        if (SCheck) {
            if (!checkImg.find(e => e == title)) {
                setCheckImg([...checkImg, title])
            } else {
                const clone = checkImg.filter(e => e != title)
                setCheckImg(clone)
            }
            return
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
            setSCheck.off()
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await fetch('/api/image')
                .then(res => {
                    return res.json()
                })
            setImages(data.resources)
        }
        getData()
    }, [])

    return <LayoutAdmin>
        <Container maxW={'container.xl'} py='1'>
            <Stack justifyContent={'space-between'} direction='row' mb='4' bg={'whiteAlpha.900'} p='1' shadow={'md'} rounded='md'>
                <Stack direction='row' alignItems='center'>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                            Actions
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => {
                                setSCheck.toggle()
                                setCheckImg([])
                            }}>Select Images</MenuItem>
                        </MenuList>
                    </Menu>
                    {SCheck && <Button onClick={() => deleteImages(checkImg)}>Delete</Button>}
                    {SCheck && <CloseButton onClick={() => setSCheck.off()} />}
                </Stack>
                <Stack justifyContent={'space-between'} direction='row'>
                    <Flex>
                        <FileUpload
                            loader={load}
                            accept={'image/*'}
                            multiple
                            register={register('file_', { validate: validateFiles, onChange: onChangeFile })} />
                    </Flex>
                </Stack>
            </Stack>
            {!images
                ? <Text>Loading...</Text>
                : <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={2}>
                    {images && images.map((v: any, i: number) =>
                        <Link className={clsx(
                            checkImg.length != 0 && checkImg.find(e => e == v.public_id) && 'checkImage',
                            SCheck && 'selectImage',
                        )}
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
                                    <Icon as={BsLink} onClick={()=>{
                                        navigator.clipboard.writeText(v.secure_url)
                                        toast({
                                            title: `Copy link`,
                                            status: 'info',
                                            isClosable: true,
                                            position: 'bottom-right'
                                        })
                                    }}/>
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