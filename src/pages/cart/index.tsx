import { Layout } from '@/components/common';
import { NLink, IncrementNumber, Image } from '@/components/ui';
import { numberToPrice } from '@/utils/formatValue'
import { getTotalPrice, getPriceByItem } from '@/utils/cart'
import { Box, Container, Heading, List, ListItem, Stack, Text, Button, Divider, GridItem, Flex, Grid, Link, Input, Checkbox, Icon, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hook/redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '@/lib/redux/slice/cart';
import { NextPage } from 'next';
import { FiDelete, FiTrash2 } from 'react-icons/fi';

const CartEmty = () => {
    return (
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
                <NLink href={'/product'}>
                    <Button
                        colorScheme={'green'} bg={'gray.300'} rounded={'full'} px={6}
                        _hover={{ bg: 'green.500', }}>
                        Tiếp tục mua sắm
                    </Button>
                </NLink>
            </Stack>
        </Stack>
    )
}

const CartPage: NextPage = () => {
    /* const [checkedItems, setCheckedItems] = useState<string[]>([]) */
    const [promo, setPromo] = useState<string>('')
    const [priceSale, setPriceSale] = useState(0)
    const cart = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const AllTotalPrice = getTotalPrice(cart)

    return (
        <Layout>
            <Container maxW={'container.xl'} py='8'>
                {cart.length === 0
                    ? <CartEmty />
                    : <Grid gap='4' templateColumns='repeat(6, 1fr)'>
                        <GridItem as={List} colSpan={{ base: 6, lg: 4 }}>
                            <Stack direction={'column'}>
                                {/* <Stack px='1' py='1' direction='row' justifyContent='space-between' bg={'#F7FAFC'} shadow='sm' rounded='sm'>
                                    <Checkbox isChecked={checkedItems.length == cart.length}
                                        onChange={() => {
                                            if (checkedItems.length == cart.length) return setCheckedItems([])
                                            setCheckedItems(cart.map((item: { name: string }) => item.name))
                                        }}
                                        colorScheme='green' />
                                        <IconButton size={'xs'} aria-label='Del cart' fontSize='16px' icon={<FiTrash2 />} />
                                </Stack> */}
                                {cart.map((item: any, i: number) => (
                                    <Stack key={i} as={ListItem} direction='row' p='2' pl='0' justifyContent='space-between' alignItems='start'>
                                        <Flex gap='3' position={'relative'}>
                                            {/* <Checkbox isChecked={checkedItems.includes(item.name)}
                                                onChange={() => {
                                                    if (checkedItems.includes(item.name)) return setCheckedItems(checkedItems.filter(e => e != item.name))
                                                    setCheckedItems([...checkedItems, item.name])
                                                }}
                                                colorScheme='green' position={'absolute'} top='1' left='1' zIndex='banner' bg={'white'} rounded='md' /> */}
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
                                        <Flex direction='column' alignItems={'end'}>
                                            <Text>{numberToPrice(getPriceByItem(item))}</Text>
                                            <Stack direction='row'>
                                                <Link onClick={() => dispatch(removeFromCart(item._id))}>Delete</Link>
                                                <Divider orientation='vertical' colorScheme='gray' />
                                                <Link>Like</Link>
                                            </Stack>
                                        </Flex>
                                    </Stack>
                                ))}
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, md: 6, lg: 2 }}>
                            <Stack direction={{ base: 'column', md: 'row', lg: 'column' }} gap='2' mb='2'>
                                <Stack gap={1} p='5' w={'full'} bg={'#F7FAFC'} rounded={'md'} >
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Input placeholder='Nhập mã khuyễn mãi của bạn' bg={'blackAlpha.100'} type='text' value={promo} onChange={(e) => {
                                            setPromo(e.target.value)
                                        }} />
                                        <Button onClick={() => { }}>Lưu</Button>
                                    </Stack>
                                </Stack>
                                <Stack gap={2} p='5' w={'full'} bg={'#F7FAFC'} rounded={'md'} >
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Tạm tính</Text>
                                        <Text>{numberToPrice(AllTotalPrice)}</Text>
                                    </Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Giảm giá</Text>
                                        <Text>{numberToPrice(priceSale)}</Text>
                                    </Flex>
                                    <Divider colorScheme='gray' />
                                    <Flex justifyContent={'space-between'}>
                                        <Text>Tổng cộng</Text>
                                        <Text>{numberToPrice(priceSale + AllTotalPrice)}</Text>
                                    </Flex>
                                </Stack>
                            </Stack>
                            <Flex flex={1} justify={'end'} align={'center'} position={'relative'} w={'full'}>
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