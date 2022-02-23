import React from 'react';
import { NextPage } from 'next';
import { Container, Flex, Heading, Stack, Text, Box, Button, Badge, GridItem, Grid } from '@chakra-ui/react';
import { Layout, BreadcrumbCustom } from '@/components/common';
import { RadioCard, Rating, Image } from '@/components/ui';
import { addToCart } from '@/lib/redux/slice/cart';
import { useAppDispatch } from '@/lib/redux';

function checkTypeSale({ price, isSale }: { price: number, isSale: { type: string, value: number } }) {
    if (isSale.type === "value") { return isSale.value; }
    if (isSale.type === "percent") {
        return (price - (price * isSale.value / 100))
    }
}

const ProductPage: NextPage = ({ product }: any) => {
    const dispatch = useAppDispatch()
    const { _id, name, price, isSale, image } = product
    return (
        <Layout>
            <Container maxW='container.xl' py='12'>
                <BreadcrumbCustom />
                <Grid templateColumns='repeat(7, 1fr)' spacing={8} py='4' px={{ base: 2, md: 10 }} gap='8'>
                    <GridItem colSpan={{base: 7, md: 3}}>
                        <Image
                            width={'400px'}
                            height={'400px'}
                            layout='intrinsic'
                            alt={'feature image'}
                            src={image.item}
                            objectFit={'cover'}
                        />
                    </GridItem>
                    <GridItem colSpan={{base: 7, md: 4}}>
                        <Stack spacing={4}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={'medium'}
                                fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}>{name}</Heading>
                            {isSale && <Flex justifyContent="start" gap='10px' alignItems='end' mt='5px'>
                                {isSale.status
                                    ? <Badge variant='solid' px='2' py='1' colorScheme='green'>
                                        Giảm {isSale.type == 'percent' ? (isSale.value + "%") : String(isSale.value).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                                        {isSale.type == "value" ? <Box as="span" color={'gray.600'} fontSize="lg">₫ </Box> : ''}
                                    </Badge> : ''}
                                <Box fontSize="18px" fontWeight='semibold' color={'gray.800'}>
                                    {String(isSale.status ? checkTypeSale({ price, isSale }) : price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                                    <Box as="span" color={'gray.600'} fontSize="lg">₫ </Box>
                                </Box>
                                {isSale.status ? <Text fontWeight='semibold' textDecoration={'line-through'} color={'gray.300'}>
                                    {String(price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                                    <Box as="span">₫</Box>
                                </Text> : ''}
                            </Flex>}
                            <Rating rating={4.7} numReviews={10} />
                            {/* short description */}
                            <Text color={'gray.500'} fontSize={'lg'}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                nonumy eirmod tempor invidunt ut labore
                            </Text>
                            <Box>
                                <Text fontWeight={'medium'} py='2'>Loại sản phẩm: </Text>
                                <RadioCard options={['1', '2', '3']} />
                            </Box>
                            <Flex gap={'4'} py='2' width={{base: 'full', md: '70%'}}>
                                <Button
                                    onClick={() => dispatch(addToCart(product))}
                                    flex={'1'}
                                    colorScheme={'green'}>
                                    Thêm vào giỏ hàng
                                </Button>
                                
                            </Flex>
                        </Stack>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    );
}

export async function getStaticPaths() {

    const res = await fetch('http://localhost:3000/api/product')
    const products = await res.json()

    const paths = products.result.map((product: any) => ({
        params: { id: product._id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
    const res = await fetch(`http://localhost:3000/api/product/${params.id}`)
    const product = await res.json()

    return { props: { product } }
}

export default ProductPage;