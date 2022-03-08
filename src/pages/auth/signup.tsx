import { Flex, Box, Input, Stack, Button, Heading, Text, FormControl, FormLabel, FormHelperText, useToast, } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Loading, NLink } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const AddUserPage: NextPage = () => {
    const router = useRouter()
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        setLoad(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: 'default',
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone
            })
        })
        if(res.ok){
            toast({
                title: 'Tạo tài khoản thành công',
                description: "Bạn đã đăng nhập và được chuyển đên trang chính",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            router.push('/auth')
        }
        setLoad(false)
    }
    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace('/');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);

    if (isLoading) {
        return <Loading/>;
    }

    return <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'2xl'}>Tạo tài khoản của bạn</Heading>
                <Text fontSize={'md'} color={'gray.600'}>
                    Nếu đã có rồi? <NLink href={'/auth'} chackraLink={{ color: 'blue.700', fontWeight: 'medium' }}>Đăng nhập</NLink>
                </Text>
            </Stack>
            <Box px={8}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4} width='320px'>
                        <FormControl id="name" isRequired isInvalid={errors.name}>
                            <FormLabel>Họ và tên</FormLabel>
                            <Input type="text" bg='blackAlpha.100' placeholder='jonh doe' {...register("name", { minLength: 6, maxLength: 18 })} />
                        </FormControl>
                        <FormControl id="email" isRequired isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" bg='blackAlpha.100' placeholder='jonh@gmail.com' {...register("email", { maxLength: 20 })} autoComplete='false'/>
                        </FormControl>
                        <FormControl id="password" isRequired isInvalid={errors.password}>
                            <FormLabel>Mật khẩu</FormLabel>
                            <Input type="password" bg='blackAlpha.100' placeholder='****' {...register("password", { minLength: 8, maxLength: 20 })} />
                            <FormHelperText>Mật khẩu bao gồm 8 chữ và số</FormHelperText>
                        </FormControl>
                        <FormControl id="phone" isRequired isInvalid={errors.phone}>
                            <FormLabel>Điện thoại</FormLabel>
                            <Input type="number" bg='blackAlpha.100' placeholder='0975111222' {...register("phone", { minLength: 10 })} />
                        </FormControl>
                    </Stack>
                    <Button
                        mt='4'
                        w='full'
                        isLoading={load}
                        color='white'
                        type='submit'
                        bg={'green.400'}
                        _hover={{ bg: 'green.500' }}>
                        Đăng ký
                    </Button>
                </form>
            </Box>
            <Box px={8} >
                <Text textAlign={'center'} fontSize={'sm'} color={'gray.600'}>
                    Quay lại <NLink href={'/'} chackraLink={{ color: 'blue.700', fontWeight: 'medium' }}>Trang chủ</NLink>
                </Text>
            </Box>
        </Stack>
    </Flex>
}

export default AddUserPage;