import { Text, Button, Link, Container, Flex, Heading, HStack, VStack, Stack, Divider, SimpleGrid, GridItem, FormControl, FormLabel, Input, Select, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Layout } from '@/components/common';
import { NextPage } from 'next';
import { Image } from '@/components/ui';
import Nextlink from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hook/redux';
import { formatDate, numberToPrice } from '@/utils/formatValue'
import { useForm } from 'react-hook-form';
import { getPriceByItem, getTotalPrice } from '@/utils/cart';
import { resetCart } from '@/lib/redux/slice/cart';
import { useRouter } from 'next/router';

export async function getStaticProps() {
    const address = await fetch(`https://provinces.open-api.vn/api/?depth=2`)
    const addressVal = address.ok ? await address.json() : null
    return { props: { addressVal } }
}

const CheckoutPage: NextPage = ({ addressVal }: any) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [pay, setPay] = useState<any>({ status: true, value: null })
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
            const listProduct: any[] = []
            cart.map((e: any) => listProduct.push({
                _id: e._id,
                name: e.name,
                price: e.price,
                isSale: e.isSale,
                image: e.image.item,
                quantity: e.quantity,
                category: e.category
            }))
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: 'web',
                    product: listProduct,
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
            }).then(async res => {
                if (res.ok) {
                    dispatch(resetCart())
                    onOpen()
                    return setPay({ status: true, value: await res.json() })
                }
                return res
            }).catch(err => {
                console.log('CheckOut', err)
            })
        }
    };
    const closePay = () => {
        setPay({ status: false, value: undefined })
        router.push('/')
        onClose()
    }
    const printPDF = () => {
        alert('Xin lỗi, chức năng này chưa làm!')
    }

    return (
        <Layout>
            <Container maxW='container.xl' py='8'>
                {TotalCart == 0 ? <Flex h='48'> <p>Error cart emty</p> </Flex>
                    : <Flex gap='2' direction={{ base: 'column-reverse', md: 'row' }} >
                        <VStack w="full" h="full" p={2} spacing={6} alignItems="flex-start">
                            <VStack spacing={3} alignItems="flex-start">
                                <Heading size="xl" color={'gray.600'}>Địa chỉ của bạn</Heading>
                                <Text>Nếu bạn đã có tài khoản, hãy nhấp vào đây để
                                    <Nextlink href='/auth'>
                                        <Link>  đăng nhập
                                        </Link>
                                    </Nextlink>.
                                </Text>
                            </VStack>
                            {addressVal == null && <p>Get api address failure</p>}
                            {addressVal != null && <form onSubmit={handleSubmit(onSubmit)}>
                                <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                                    <GridItem colSpan={"auto"}>
                                        <FormControl>
                                            <FormLabel>Tên</FormLabel>
                                            <Input {...register("name")} placeholder="Nguyen Van A" required />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={"auto"}>
                                        <FormControl>
                                            <FormLabel>Số điện thoại</FormLabel>
                                            <Input {...register("phone")} placeholder="0975 000 000" required />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Địa chỉ</FormLabel>
                                            <Input {...register("street")} required placeholder="12/13/14/15/26 Nguyen Trai, Phuong 4" />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={"auto"}>
                                        <FormControl>
                                            <FormLabel>Quận</FormLabel>
                                            <Select {...register("district")} placeholder='Nhập quận' required>
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
                            </form>}
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
                    </Flex>
                }
                {pay.status && pay.value != undefined && <Modal closeOnOverlayClick={false} size={'2xl'} onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody>
                            <HStack justifyContent={'space-between'} py='4'>
                                <Flex direction={'column'}>
                                    <Heading fontSize={'xl'}>HÓA ĐƠN</Heading>
                                    <Text>#1HJ23J2132</Text>
                                </Flex>
                                <Flex direction={'column'} alignItems='end'>
                                    <Text fontWeight={'medium'} mt='2'>NGÀY</Text>
                                    <Text>{formatDate(pay.value.createdAt)}</Text>
                                </Flex>
                            </HStack>
                            <VStack mb='6' alignItems={'start'}>
                                <Flex direction={'column'}>
                                    <Text fontWeight={'medium'}>Người thanh toán</Text>
                                    <Text>{pay.value.userPay.name}</Text>
                                    <Text>{pay.value.userPay.phone}</Text>
                                    <Text>{pay.value.userPay.email}</Text>
                                    <Text>{pay.value.userPay.address}</Text>
                                </Flex>
                                <Flex direction={'column'}>
                                    <Text fontWeight={'medium'}>Phương thức thanh toán</Text>
                                    <Text>{/* {pay.value.payment} */}Trả tiền mặt khi nhận hàng</Text>
                                </Flex>
                            </VStack>
                            <Divider />
                            <VStack>
                                <Table variant='simple' my={'6'} size='sm'>
                                    <Thead>
                                        <Tr>
                                            <Th>Sản phẩm</Th>
                                            <Th isNumeric>Thành tiền</Th>
                                            <Th isNumeric>Số lượng</Th>
                                            <Th isNumeric>Tổng</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pay.value.product.map(
                                            (v: any, i: React.Key) => <Tr key={i}>
                                                <Td>{v.name}</Td>
                                                <Td isNumeric>{numberToPrice(v.price)}</Td>
                                                <Td isNumeric>{v.quantity}</Td>
                                                <Td isNumeric>{numberToPrice(getPriceByItem(v))}</Td>
                                            </Tr>
                                        )}
                                        <Tr>
                                            <Td isNumeric colSpan={3}>Tạm tính</Td>
                                            <Td isNumeric>{numberToPrice(getTotalPrice(pay.value.product))}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td isNumeric colSpan={3}>Vận chuyển</Td>
                                            <Td isNumeric>{numberToPrice(pay.value.shipPrice)}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td isNumeric colSpan={3}>Tổng</Td>
                                            <Td isNumeric>{numberToPrice(getTotalPrice(pay.value.product) + pay.value.shipPrice)}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </VStack>
                            <HStack>

                            </HStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => {
                                printPDF()
                                closePay()
                            }} colorScheme='green' mr='2'>Tải về</Button>
                            <Button onClick={closePay}>Đóng</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>}
            </Container>
        </Layout >
    );
}

export default CheckoutPage;