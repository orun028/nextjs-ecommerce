import { Layout, BreadcrumbCustom, } from '@/components/common';
import { NLink, IncrementNumber, Image } from '@/components/ui';
import { numberToPrice } from '@/utils/formatValue'
import { Box, Container, Heading, List, ListItem, Stack, Text, Button, Divider, GridItem, Flex, Grid, Link, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '@/lib/redux/slice/cart';
import { NextPage } from 'next';

const CartPage: NextPage = () => {
    const [promo, setPromo] = useState<string>('')
    const cart = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const getTotalPrice = () => cart.reduce((accumulator: number, item: any) => accumulator + item.quantity * item.price, 0);

    return (
        <Layout>
            <Container maxW={'container.xl'} py='8'>
                <BreadcrumbCustom getDefaultTextGenerator={() => 'Giỏ hàng'} />
                {cart.length === 0
                    ? <Stack
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
                            <NLink href={'/product'}>
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
                            </NLink>
                        </Stack>
                    </Stack>
                    : <Grid gap='4' templateColumns='repeat(6, 1fr)'>
                        <GridItem as={List} colSpan={{ base: 6, lg: 4 }}>
                            {cart.map((item: any, i: number) => (
                                <Stack key={i} as={ListItem} direction='row' p='5' pl='0' justifyContent='space-between' alignItems='start'>
                                    <Flex as={Box} gap='3'>
                                        <Image
                                            width={'100px'}
                                            height={'100px'}
                                            layout='intrinsic'
                                            src={item.image.item}
                                            alt={'Cart item ' + item.name} />
                                        <Flex direction='column'>
                                            <NLink href={`/product/${item._id}`}>{item.name}</NLink>
                                            <Text color={'gray.500'} fontSize='sm'>Color, size</Text>
                                            <Text>{numberToPrice(item.price)}</Text>
                                            <IncrementNumber
                                        value={item.quantity}
                                        increment={() => dispatch(incrementQuantity(item._id))}
                                        decrement={() => dispatch(decrementQuantity(item._id))} />
                                        </Flex>
                                    </Flex>
                                   
                                    <Flex as={Box} direction='column' alignItems={'end'}>
                                        <Text>{numberToPrice(item.quantity * item.price)}</Text>
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
                            <Stack direction={{ base: 'column', md: 'row', lg: 'column' }} gap='2' mb='2'>
                                <Stack
                                    gap={1}
                                    as={Box}
                                    p='5'
                                    w={'full'}
                                    bg={'#F7FAFC'}
                                    rounded={'md'}
                                    overflow={'hidden'}>
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Heading as='h5' fontSize='md'>Mã khuyến mãi:</Heading>
                                    </Stack>
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Input id='promoCode' type='text' value={promo} onChange={() => { setPromo(promo) }} />
                                        <Button>Lưu</Button>
                                    </Stack>
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
                                        <Text>{numberToPrice(getTotalPrice())}</Text>
                                    </Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Giảm giá</Text>
                                        <Text>{numberToPrice(0)}</Text>
                                    </Flex>
                                    <Divider colorScheme='gray' />
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Tổng cộng</Text>
                                        <Text>{numberToPrice(0)}</Text>
                                    </Flex>
                                </Stack>
                            </Stack>
                            <Flex
                                flex={1}
                                justify={'end'}
                                align={'center'}
                                position={'relative'}
                                w={'full'}>
                                <NLink href='/checkout'>
                                    <Button colorScheme={'green'}>Thanh toán</Button>
                                </NLink>
                            </Flex>
                        </GridItem>
                    </Grid>}
            </Container>
        </Layout>
    );
}

export default CartPage;