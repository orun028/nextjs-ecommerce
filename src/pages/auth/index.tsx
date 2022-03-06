import { Flex, Box, Input, Checkbox, Stack, Link, Button, Heading, Text, Icon, useToast, FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSession, signIn } from "next-auth/react";
import { NLink } from '@/components/ui';
import { useForm } from 'react-hook-form';

const AuthPage: NextPage = () => {
    const [load, setLoad] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const toast = useToast()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        const { email, password } = data;
        if (email && password) {
            setLoad(true)
            await signIn('credentials', { email, password }).catch(error => {
                console.log(error)
            })
            setLoad(false)
        }
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
        return <p>Loading...</p>;
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'2xl'}>Đăng nhập vào tài khoản của bạn</Heading>
                    <Text fontSize={'md'} color={'gray.600'}>
                        Không có tài khoản? <NLink href={'/auth/signup'} >Đăng kí</NLink>
                    </Text>
                </Stack>
                <Box px={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired isInvalid={errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" bg='blackAlpha.100' placeholder='jonh@gmail.com' {...register("email", { maxLength: 20 })} />
                            </FormControl>
                            <FormControl id="password" isRequired isInvalid={errors.password}>
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input type="password" bg='blackAlpha.100' placeholder='****' {...register("password", { minLength: 8, maxLength: 20 })} />
                                <FormHelperText>Mật khẩu bao gồm 8 chữ và số</FormHelperText>
                            </FormControl>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Lưu đăng nhập</Checkbox>
                                <Link color={'blue.400'}>Quên mật khẩu?</Link>
                            </Stack>
                            <Button
                                isLoading={load}
                                color='white'
                                type='submit'
                                bg={'green.400'}
                                _hover={{ bg: 'green.500' }}>
                                Đăng nhập với email
                            </Button>
                        </Stack>
                    </form>
                </Box>
                <Box px={8}>
                    <Stack spacing={4}>
                        <Button onClick={() => signIn('google')} variant={'outline'} _hover={{ bg: 'gray.300', }}>
                            <Icon as={IconGoogle} w='5' h='5' mr='2' />
                            Đăng nhập với Google
                        </Button>
                        <Button onClick={() => signIn('facebook')} variant={'outline'} _hover={{ bg: 'gray.300', }}>
                            <Icon as={IconFaceBook} w='6' h='6' mr='2' />
                            Đăng nhập với Facebook
                        </Button>
                    </Stack>
                </Box>
                <Box px={8} >
                    <Text textAlign={'center'} fontSize={'sm'} color={'gray.600'}>
                        Quay lại <NLink href={'/'} chackraLink={{ color: 'blue.700', fontWeight: 'medium' }}>Trang chủ</NLink>
                    </Text>
                </Box>
            </Stack>
        </Flex>
    );
}

const IconGoogle = (props: any) => {
    return (<Box {...props}>
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"></path><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"></path><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"></path><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"></path></g>
        </svg>
    </Box>)
}

const IconFaceBook = (props: any) => {
    return (<Box {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 48 48"
            style={{ fill: '#000000' }}><path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path></svg>
    </Box>)
}

export default AuthPage;