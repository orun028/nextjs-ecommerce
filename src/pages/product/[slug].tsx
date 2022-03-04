import { useState } from 'react';
import { NextPage } from 'next';
import { Container, Flex, Heading, Stack, Text, Box, Button, Badge, GridItem, Grid } from '@chakra-ui/react';
import { Layout } from '@/components/common';
import { RadioCard, Rating, Image } from '@/components/ui';
import { addToCart } from '@/lib/redux/slice/cart';
import { useAppDispatch } from '@/hook/redux';
import { numberToPrice } from '@/utils/format';

function checkTypeSale({ price, isSale }: { price: number, isSale: { type: string, value: number } }) {
    if (isSale.type === "value") return isSale.value;
    if (isSale.type === "percent") return (price - (price * isSale.value / 100));
    return 0;
}

const ProductPage: NextPage = ({ product }: any) => {
    const [type, setType] = useState()
    const dispatch = useAppDispatch()
    const { _id, name, price, isSale, image } = product

    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }
    return (
        <Layout>
            <Container maxW='container.xl' py='12' minH={'400px'}>
                {product == null && <p>Failed to load Product</p>}
                {product != null && <Grid templateColumns='repeat(7, 1fr)' spacing={8} py='4' px={{ base: 2, md: 10 }} gap='8'>
                    <GridItem colSpan={{ base: 7, md: 3 }}>
                        <Image
                            width={'400px'}
                            height={'400px'}
                            layout='intrinsic'
                            alt={'feature image'}
                            src={image.item}
                            objectFit={'cover'}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 7, md: 4 }}>
                        <Stack spacing={4}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={'medium'}
                                fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}>{name}</Heading>
                            {isSale && <Flex justifyContent="start" gap='10px' alignItems='end' mt='5px'>
                                {isSale.status
                                    && <Badge variant='solid' px='2' py='1' colorScheme='green'>
                                        Giảm {isSale.type == 'percent'
                                            ? (isSale.value + "%")
                                            : numberToPrice(isSale.value)
                                        }
                                        {isSale.type == "value"
                                            && <Box as="span" color={'gray.600'} fontSize="lg">₫ </Box>}
                                    </Badge>}
                                <Box fontSize="18px" fontWeight='semibold' color={'gray.800'}>
                                    {numberToPrice(isSale.status ? checkTypeSale({ price, isSale }) : price)}
                                </Box>
                                {isSale.status
                                    && <Text fontWeight='semibold' textDecoration={'line-through'} color={'gray.300'}>
                                        {numberToPrice(price)}
                                    </Text>}
                            </Flex>}
                            <Rating rating={4.7} numReviews={10} />
                            {/* short description */}
                            <Text color={'gray.500'} fontSize={'lg'}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                nonumy eirmod tempor invidunt ut labore
                            </Text>
                            <Box>
                                <Text fontWeight={'medium'} py='2'>Loại sản phẩm: </Text>
                                <RadioCard options={['md', 'xl', '2xl']} onChange={e => console.log(e)} />
                            </Box>
                            <Flex gap={'4'} py='2' width={{ base: 'full', md: '70%' }}>
                                <Button onClick={handleAddToCart} flex={'1'} colorScheme={'green'}> Thêm vào giỏ hàng </Button>
                            </Flex>
                        </Stack>
                    </GridItem>
                </Grid>}
            </Container>
        </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`)
    if(!(res.ok)) return { paths: [] ,fallback: false };
    const products = await res.json()
    const paths = products.result.map((product: any) => ({ params: { slug: product.slug }, }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product?slug=${params.slug}`)
    const product = res.ok ?  await res.json() : null
    return { props: { product } }
}

export default ProductPage;