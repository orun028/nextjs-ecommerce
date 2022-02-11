import { Sidebar } from '@/components/common';
import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Icon, Input, Link, SimpleGrid, Stack, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ModalCustom } from '@/components/ui';
import FileUpload from '@/components/ui/FileUpload';
import { FiFile } from 'react-icons/fi';
import { useForm } from 'react-hook-form'

type FormValues = {
    file_: FileList
}

export default function index() {
    const [data, setData] = useState<Array<any> | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [imgUrl, setImgUrl] = useState<File[]>([])

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const onSubmit = handleSubmit(async data => {
        onClose()
        let fileListAsArray: File[] = Array.from(data.file_)
        await Promise.all(fileListAsArray.map(file => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                /* imgur.upload({
                    image: String(reader.result).replace(/^data:image\/[a-z]+;base64,/, ""),
                    album: 'boGthBB'
                }) */
            };
        }
        )).then(res => { console.log('res',res) })
        .catch(err=>console.log(err))
    })

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

    const onChangeFile = (value: any) => {
        if (value.length < 1) {
            return 'Files is required'
        }
        let fileListAsArray: File[] = Array.from(value.target.files)
        setImgUrl(fileListAsArray)
    }

    const handelClickImgae = (id: string) => {
        console.log(id)
    }

    useEffect(() => {
        async function get() {
            /* await imgur.getAlbum('boGthBB')
                .then(res => {
                    if (res.success) {
                        setData(res.data.images)
                        setLoading(false)
                    }
                }).catch(err => {
                    setError(err)
                    console.log('Error', err)
                }) */
        }
        if (isLoading) (get())
    }, [])

    if (isLoading) return 'Loading...';
    if (error) return 'Error!';

    return <>
        <Sidebar />
        <Container maxW={'container.xl'} py='6'>
            <Stack justifyContent={'space-between'} direction='row' mb='4'>
                <Flex>
                    <Button>Select images</Button>
                </Flex>
                <Button colorScheme={'blackAlpha'} onClick={() => onOpen()}>New item</Button>
            </Stack>
            <SimpleGrid minChildWidth='120px' spacing='5px'>
                {data != null && data.map((v: any, i: number) =>
                    <Link textDecoration="none" _hover={{ textDecoration: 'none' }} key={i} onClick={() => handelClickImgae(v.id)} >
                        <Image
                            objectFit="contain"
                            className='hoverImage'
                            src={v.link}
                            alt={`Image ${v.id}`}
                            width={v.width}
                            height={v.height} />
                    </Link>)
                }
            </SimpleGrid>
        </Container>
        <ModalCustom title='New image' isOpen={isOpen} onClose={onClose} handelClick={onSubmit}>
            <form onSubmit={onSubmit}>
                <FormControl isInvalid={!!errors.file_} isRequired>
                    <FormLabel>{'File input'}</FormLabel>
                    <FileUpload
                        accept={'image/*'}
                        multiple
                        register={register('file_', { validate: validateFiles, onChange: onChangeFile })}>
                        <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
                    </FileUpload>

                    <FormErrorMessage>
                        {errors.file_ && errors?.file_.message}
                    </FormErrorMessage>
                </FormControl>

            </form>
            <Box py='6'>
                {(imgUrl && imgUrl.length != 0)
                    ? <SimpleGrid minChildWidth='120px' spacing='5px'>
                        {imgUrl.map((v: any, i) => <img key={i} src={URL.createObjectURL(v)} />)}
                    </SimpleGrid>
                    : <p>Choose before Pressing the Upload button</p>}
            </Box>
        </ModalCustom>
    </>;
}