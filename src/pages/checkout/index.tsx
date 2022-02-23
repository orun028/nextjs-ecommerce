import { Text, Button, Container, Flex, Heading, HStack, VStack, Stack, Divider, SimpleGrid, GridItem, FormControl, FormLabel, Input, Select, Checkbox } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Layout, BreadcrumbCustom } from '@/components/common';
import { NextPage } from 'next';
import { CSelect, Image } from '@/components/ui';
import { useAppSelector } from '@/lib/redux';
import { numberToPrice } from '@/utils/formatValue'

export async function getStaticProps() {
    const address = await fetch(`https://provinces.open-api.vn/api/?depth=2`)
    const addressVal = await address.json()
    return {
        props: {
            addressVal
        }
    }
}

const Details = ({ address }: { address: any[] }) => {
    const [ city, setCity ] = useState("Thành phố Hồ Chí Minh")
    const getDistrict = () => {
        const val = address.find(e=>e.name==city)
        return val.districts
    }
    return (
        <VStack w="full" h="full" p={2} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="xl" color={'gray.600'}>Địa chỉ của bạn</Heading>
                <Text>Nếu bạn đã có tài khoản, hãy nhấp vào đây để đăng nhập.</Text>
            </VStack>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>Tên</FormLabel>
                        <Input placeholder="Nguyen Van A" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input placeholder="0975 000 000" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Địa chỉ</FormLabel>
                        <Input placeholder="12/13/14/15/26 Nguyen Trai, Phuong 4" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>Quận</FormLabel>
                        <Select>
                            {getDistrict().map((e: any)=><option key={e.code} value={e.name}>{e.name}</option>)}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>Tỉnh thành phố</FormLabel>
                        <Select onChange={e=>setCity(e.target.value)} defaultValue="Thành phố Hồ Chí Minh">
                            {address.map(e=><option key={e.code} value={e.name}>{e.name}</option>)}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Checkbox defaultChecked>Vận chuyển đến địa điểm thanh toán</Checkbox>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button size="lg" w='full' disabled={true}>
                        Đặt hàng
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

const Cart = () => {
    const cart = useAppSelector((state) => state.cart)
    const getTotalCart = () => {
        const value = cart.reduce((total: any, item: { quantity: number; price: number, isSale: any }) => {
            if (item.isSale.status) {
                const { type, value } = item.isSale
                if (type == 'percent') {
                    return total + (item.quantity * (item.price - value * item.price / 100))
                } else {
                    return total + (item.quantity * value)
                }
            } else {
                return total + (item.quantity * item.price)
            }
        }, 0)
        return value;
    };
    const getTotalItemPrice = (e: any) => {
        const { status, type, value } = e.isSale
        if (status) {
            if (type == 'percent') {
                return e.quantity * (e.price - value * e.price / 100)
            }
            return value * e.quantity
        }
        return e.price * e.quantity
    }
    const [shipPrice, setShipPirce] = useState(getTotalCart()!=0 ? 20000 : 0)
    const bgColor = 'gray.50'
    const secondaryTextColor = 'gray.600'
    return (
        <VStack
            w="full"
            h="full"
            p={2}
            spacing={6}
            align="flex-start"
            bg={bgColor}
        >
            <VStack alignItems="flex-start" spacing={3}>
                <Heading size="xl" color={'gray.600'}>Your cart</Heading>
            </VStack>
            <VStack w='full'>
                {cart.map((e:
                    { isSale: any, name: string, sku: string, price: number, quantity: number, image: { item: string } }) => <HStack key={e.name} spacing={6} alignItems='start' w="full">
                        <Image
                            width={'100px'}
                            height={'100px'}
                            layout='intrinsic'
                            src={e.image.item}
                            alt={`Cart item ${e.name}`} />
                        <Stack
                            spacing={0}
                            w="full"
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">
                            <VStack w="full" spacing={0} alignItems="flex-start">
                                <Heading size="sm">{e.name}</Heading>
                                <Text color={secondaryTextColor}>{`x${e.quantity}`} {e.sku.toUpperCase()}</Text>
                            </VStack>
                            <Heading size="sm" textAlign="end">
                                {numberToPrice(getTotalItemPrice(e))}
                            </Heading>
                        </Stack>
                    </HStack>)}
            </VStack>
            <VStack spacing={4} alignItems="stretch" w="full">
                <HStack justifyContent="space-between">
                    <Text color={secondaryTextColor}>Tính tạm</Text>
                    <Heading size="sm">{numberToPrice(getTotalCart())}</Heading>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text color={secondaryTextColor}>Phí vận chuyển</Text>
                    <Heading size="sm">{numberToPrice(shipPrice)}</Heading>
                </HStack>
            </VStack>
            <Divider />
            <HStack justifyContent="space-between" w="full">
                <Text color={secondaryTextColor}>Total</Text>
                <Heading size="lg">{numberToPrice(shipPrice + getTotalCart())}</Heading>
            </HStack>
        </VStack>
    );
};

const CheckoutPage: NextPage = ({ addressVal }: any) => {
    return (
        <Layout>
            <Container maxW='container.xl' py='8'>
                <BreadcrumbCustom getDefaultTextGenerator={() => 'Thanh toán'} />
                <Flex
                    gap='8'
                    direction={{ base: 'column-reverse', md: 'row' }} >
                    <Details address={addressVal} />
                    <Cart />
                </Flex>
            </Container>
        </Layout >
    );
}

export default CheckoutPage;