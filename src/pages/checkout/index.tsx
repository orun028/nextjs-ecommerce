import { Text, Button, Container, Flex, Heading, HStack, VStack, Stack, Divider, SimpleGrid, GridItem, FormControl, FormLabel, Input, Select, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Layout, BreadcrumbCustom } from '@/components/common';
import { NextPage } from 'next';
import { Image, Invoice } from '@/components/ui';
import { useAppSelector } from '@/lib/redux';
import { numberToPrice } from '@/utils/formatValue'
import { useForm } from 'react-hook-form';
import { getPriceByItem, getTotalPrice } from '@/utils/cart';

export async function getStaticProps() {
    const address = await fetch(`https://provinces.open-api.vn/api/?depth=2`)
    const addressVal = await address.json()
    return { props: { addressVal } }
}

const MessageCheckOut = ({ data, isOpen, onClose }: any) => {
    return (<Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Invoice />
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>)
}

const CheckoutPage: NextPage = ({ addressVal }: any) => {
    const [pay, setPay] = useState({})
    const [shipPrice, setShipPirce] = useState(0)
    const bgColor = 'gray.50'
    const secondaryTextColor = 'gray.600'
    const cart = useAppSelector((state) => state.cart)
    const [city, setCity] = useState("Thành phố Hồ Chí Minh")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const TotalCart = getTotalPrice(cart)
    const getDistrict = () => {
        const val = addressVal.find((e: any) => e.name == city)
        return val.districts
    }

    const onSubmit = async (data: any) => {
        if (cart) {
            const newOrder = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: 'web',
                    product: cart,
                    userPay: {
                        type: 'guest',
                        name: data.name,
                        phone: data.phone,
                        address: data.street + ', ' + data.district + ', ' + data.city
                    },
                    shipPrice: shipPrice,
                    payment: 'home',
                    total: 0
                })
            })
            const res = await newOrder.json()
            if(res) setPay(res)
        }
    };

    return (
        <Layout>
            <Container maxW='container.xl' py='8'>
                <BreadcrumbCustom getDefaultTextGenerator={() => 'Thanh toán'} />
                {TotalCart==0 ? <Flex h='48'> <p>Error cart emty</p> </Flex>
                    : <Flex gap='2' direction={{ base: 'column-reverse', md: 'row' }} >
                        <VStack w="full" h="full" p={2} spacing={6} alignItems="flex-start">
                            <VStack spacing={3} alignItems="flex-start">
                                <Heading size="xl" color={'gray.600'}>Địa chỉ của bạn</Heading>
                                <Text>Nếu bạn đã có tài khoản, hãy nhấp vào đây để đăng nhập.</Text>
                            </VStack>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                                    <GridItem colSpan={"auto"}>
                                        <FormControl>
                                            <FormLabel>Tên</FormLabel>
                                            <Input {...register("name")} placeholder="Nguyen Van A" />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={"auto"}>
                                        <FormControl>
                                            <FormLabel>Số điện thoại</FormLabel>
                                            <Input {...register("phone")} placeholder="0975 000 000" />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Địa chỉ</FormLabel>
                                            <Input {...register("street")} placeholder="12/13/14/15/26 Nguyen Trai, Phuong 4" />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={"auto"}>
                                        <FormControl>
                                            <FormLabel>Quận</FormLabel>
                                            <Select {...register("district")}>
                                                {getDistrict().map((e: any) => <option key={e.code} value={e.name}>{e.name}</option>)}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={"auto"}>
                                        <FormControl>
                                            <FormLabel>Tỉnh thành phố</FormLabel>
                                            <Select {...register("city")}
                                                onChange={e => setCity(e.target.value)}
                                                defaultValue="Thành phố Hồ Chí Minh">
                                                {addressVal.map((e: any) => <option key={e.code} value={e.name}>{e.name}</option>)}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Button size="lg" w='full' type='submit' colorScheme={'green'}>
                                            Đặt hàng
                                        </Button>
                                    </GridItem>
                                </SimpleGrid>
                            </form>
                        </VStack>
                        <VStack w="full" h="full" p={2} spacing={6} align="flex-start" bg={bgColor} rounded='md' shadow={'md'}>
                            <VStack alignItems="flex-start" spacing={3}>
                                <Heading size="xl" color={'gray.600'}>Your cart</Heading>
                            </VStack>
                            <VStack w='full'>
                                {cart.map((e:
                                    { isSale: any, name: string, sku: string, price: number, quantity: number, image: { item: string } }) => <HStack key={e.name} spacing={6} alignItems='start' w="full">
                                        <Image width={'100px'} height={'100px'} layout='intrinsic' src={e.image.item} alt={`Cart item ${e.name}`} />
                                        <Stack w="full" direction="row" justifyContent="space-between">
                                            <VStack w="full" spacing={0} alignItems="flex-start">
                                                <Heading size="sm">{e.name}</Heading>
                                                <Text color={secondaryTextColor}>
                                                    {`x${e.quantity}`} {e.sku.toUpperCase()}
                                                </Text>
                                            </VStack>
                                            <Heading size="sm" textAlign="end">
                                                {numberToPrice(getPriceByItem(e))}
                                            </Heading>
                                        </Stack>
                                    </HStack>)}
                            </VStack>
                            <VStack spacing={4} alignItems="stretch" w="full">
                                <HStack justifyContent="space-between">
                                    <Text color={secondaryTextColor}>Tính tạm</Text>
                                    <Heading size="sm">{numberToPrice(TotalCart)}</Heading>
                                </HStack>
                                <HStack justifyContent="space-between">
                                    <Text color={secondaryTextColor}>Phí vận chuyển</Text>
                                    <Heading size="sm">{numberToPrice(shipPrice)}</Heading>
                                </HStack>
                            </VStack>
                            <Divider />
                            <HStack justifyContent="space-between" w="full" justifyItems={'center'} mt='0'>
                                <Text color={secondaryTextColor} fontSize='lg' fontWeight='medium'>Total</Text>
                                <Heading size="md">{numberToPrice(shipPrice + TotalCart)}</Heading>
                            </HStack>
                        </VStack>
                    </Flex>}
                <MessageCheckOut data={pay} isOpen={isOpen} onClose={onClose} />
            </Container>
        </Layout >
    );
}

export default CheckoutPage;