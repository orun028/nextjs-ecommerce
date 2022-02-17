import Layout from '@/components/common/Layout';
import BreadcrumbCustom from '@/components/common/Layout/BreadcrumbCustom';
import { Box, Container, Heading, List, ListItem, Stack, Image, Text, useNumberInput, HStack, Button, Input, Divider, Link, GridItem, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link"
import { useAppSelector, useAppDispatch } from '@/lib/redux';
import { incrementQuantity, decrementQuantity, removeFromCart, } from '@/lib/redux/slice/cart';
import { NextPage } from 'next';

function HookUsage({ value, increment, decrement }: { value: number, increment: React.MouseEventHandler, decrement: React.MouseEventHandler }) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: value,
            min: 1,
            max: 10,
            precision: 0,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ readOnly: true })

    return (
        <HStack maxW='320px'>
            <Button {...dec} size='sm' onClick={decrement}>-</Button>
            <Input {...input} size='sm' maxW={16} />
            <Button {...inc} size='sm' onClick={increment}>+</Button>
        </HStack>
    )
}

const CartPage: NextPage = () => {
    const cart = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const getTotalPrice = () => {
        return cart.reduce(
            (accumulator: number, item: any) => accumulator + item.quantity * item.price,
            0
        );
    };
    return (
        <Layout>{/* <h1>Your Cart is Empty!</h1> */}
            <Container maxW={'container.xl'} py='8'>
                <BreadcrumbCustom getDefaultTextGenerator={() => 'Giỏ hàng'} />
                <Heading as='h3' size='lg'>Giỏ hàng</Heading>
                {cart.length === 0
                    ? (
                        <Stack
                            as={Box}
                            textAlign={'center'}
                            spacing={{ base: 8, md: 14 }}
                            py={{ base: 12, md: 24 }}>
                            <Heading
                                fontWeight={600}
                                fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
                                lineHeight={'110%'}>
                                <Text as={'span'} color={'gray.400'}>
                                    Không có sản phẩm nào trong giỏ hàng của bạn!
                                </Text>
                            </Heading>
                            <Stack
                                direction={'column'}
                                spacing={3}
                                align={'center'}
                                alignSelf={'center'}
                                position={'relative'}>
                                <NextLink href={'/product'}>
                                    <Button
                                        colorScheme={'green'}
                                        bg={'gray.300'}
                                        rounded={'full'}
                                        px={6}
                                        _hover={{
                                            bg: 'green.500',
                                        }}>
                                        Tiếp tục mua sắm
                                    </Button>
                                </NextLink>
                            </Stack>
                        </Stack>
                    )
                    : (
                        <Grid gap='4' templateColumns='repeat(6, 1fr)'>
                            <GridItem as={List} colSpan={{ base: 6, lg: 4 }}>
                                {cart.map((item: any, i: number) => (
                                    <Stack key={i} as={ListItem} direction='row' p='5' pl='0' justifyContent='space-between' alignItems='start'>
                                        <Flex as={Box} gap='3'>
                                            <Image src='' fallbackSrc='https://via.placeholder.com/100' alt={'Cart item '+item.name}/>
                                            <Flex direction='column'>
                                                <Text fontSize='md'>{item.name}</Text>
                                                <Text color={'gray.500'} fontSize='sm'>Dark blue, 36</Text>
                                            </Flex>
                                        </Flex>
                                        <Text>{item.price}₫</Text>
                                        <HookUsage
                                            value={item.quantity}
                                            increment={() => dispatch(incrementQuantity(item._id))}
                                            decrement={() => dispatch(decrementQuantity(item._id))} />
                                        <Flex as={Box} direction='column' alignItems={'end'}>
                                            <Text>{item.quantity * item.price}₫</Text>
                                            <Stack direction='row'>
                                                <Link onClick={() => dispatch(removeFromCart(item._id))}>Delete</Link>
                                                <Divider orientation='vertical' colorScheme='gray' />
                                                <Link>Like</Link>
                                            </Stack>
                                        </Flex>
                                    </Stack>
                                ))}
                            </GridItem>
                            <GridItem colSpan={{ base: 6, md: 6, lg: 2 }}>
                                <Stack direction={{ base: 'column', md: 'row', lg: 'column' }} gap='2'>
                                    <Stack
                                        gap={1}
                                        as={Box}
                                        p='5'
                                        w={'full'}
                                        bg={'#F7FAFC'}
                                        rounded={'md'}
                                        overflow={'hidden'}>
                                        <Stack direction='row' justifyContent='space-between'>
                                            <Heading as='h5' fontSize='md'>Giao tới</Heading>
                                            <Link>Thay đổi</Link>
                                        </Stack>
                                        <Text>Nguyen Thinh</Text>
                                        <Text>0123123123</Text>
                                        <Text>95/52/28 Le Van Luong, Phường Tân Kiểng, Quận 7, Hồ Chí Minh</Text>
                                    </Stack>
                                    <Stack
                                        gap={2}
                                        as={Box}
                                        p='5'
                                        w={'full'}
                                        bg={'#F7FAFC'}
                                        rounded={'md'}
                                        overflow={'hidden'} >
                                        <Flex justifyContent={'space-between'}>
                                            <Text>Tạm tính</Text>
                                            <Text>{getTotalPrice()}₫</Text>
                                        </Flex>
                                        <Flex justifyContent={'space-between'}>
                                            <Text>Giảm giá</Text>
                                            <Text>0₫</Text>
                                        </Flex>
                                        <Divider colorScheme='gray' />
                                        <Flex justifyContent={'space-between'}>
                                            <Text>Tổng cộng</Text>
                                            <Text>0₫</Text>
                                        </Flex>
                                    </Stack>
                                    <NextLink href='/checkout'>
                                        <Button colorScheme={'green'}>Thanh toán</Button>
                                    </NextLink>
                                </Stack>
                            </GridItem>
                        </Grid>
                    )}
            </Container>
        </Layout>
    );
}

export default CartPage;