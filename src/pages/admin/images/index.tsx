import { LayoutAdmin } from '@/components/common';
import { Box, Button, Container, Text, Link, Stack, useBoolean, useDisclosure, useToast, Flex, Heading, MenuButton, Menu, MenuList, MenuItem, CloseButton } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ModalCustom } from '@/components/ui';
import FileUpload from '@/components/ui/FileUpload';
import { useForm } from 'react-hook-form'
import clsx from 'clsx';
import { NextPage } from 'next';

import { BsChevronDown } from 'react-icons/bs';

type FormValues = { file_: FileList }
type ValueData = { name: string, path: string, link: string }

const AdminImages: NextPage = () => {
    const toast = useToast()
    const [data, setData] = useState<Array<ValueData>>([])
    const [isLoading, setLoading] = useState(true)
    const [edit, setEdit] = useState<any>()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [SCheck, setSCheck] = useBoolean()
    const [checkImg, setCheckImg] = useState<string[]>([])
    const { register } = useForm<FormValues>()

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
        /* if (validateFiles(value)) {
            let fileListAsArray: File[] = Array.from(value.target.files)
            const values = await firebase.addImage(fileListAsArray)
            const clone = values.reverse()
            let cloneData: ValueData[] = clone.concat(data)
            setData(cloneData)
        } */
    }

    const handelClickImgae = async (path: string, link: string) => {
        /* if (SCheck) {
            if (!checkImg.find(e => e == path)) {
                setCheckImg([...checkImg, path])
            } else {
                const clone = checkImg.filter(e => e != path)
                setCheckImg(clone)
            }
            return
        }
        let metadata: any = await firebase.getImage(path)
        setEdit({ link: link, meta: metadata })
        onOpen() */
    }

    const deleteImages = async (files: string[]) => {
       /*  if (files && files.length > 0) {
            const res = await firebase.deleteImages(files)
            if (res && data) {
                toast({ title: `Deleted ${files.length} item`, position: 'bottom-right' })
                let cloneData = data
                files.map(value => {
                    cloneData = cloneData.filter(e => e.path != value)
                })
                setData(cloneData)
            }
            setSCheck.off()
        } */
    }

    useEffect(() => {
        async function getData() {
            /* let res = firebase.getAllImages()
            var arrayOfValues = await Promise.all(await res)
            if (arrayOfValues) {
                setData(arrayOfValues)
                setLoading(false)
            } */
        }
        if (isLoading) {
            getData()
        }
    })

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
                    {SCheck && <CloseButton onClick={()=>setSCheck.off()}/>}
                </Stack>
                <Stack justifyContent={'space-between'} direction='row'>
                    <Flex>
                        <FileUpload accept={'image/*'} multiple
                            register={register('file_', { validate: validateFiles, onChange: onChangeFile })} />
                    </Flex>
                </Stack>
            </Stack>
            {isLoading
                ? <Text>Loading...</Text>
                : <Box>
                    {data && data.map((v: any, i: number) =>
                        <Link className={clsx(
                            checkImg.length != 0 && checkImg.find(e => e == v.path) && 'checkImage',
                            SCheck && 'selectImage',
                        )}
                            key={i} mr='2'
                            textDecoration="none" _hover={{ textDecoration: 'none' }}
                            onClick={() => handelClickImgae(v.path, v.link)} >
                            <Image
                                objectFit="cover"
                                className='hoverImage'
                                src={v.link}
                                alt={`Image ${v.name}`}
                                width="150px"
                                height="150px"
                                layout='intrinsic' />
                        </Link>)
                    }
                </Box>}
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

export default AdminImages;