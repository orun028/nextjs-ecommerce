import React from 'react';
import ErrorPage from "next/error";
import { GetServerSideProps, NextPage } from 'next';
import Layout from '@/components/common/Layout';
import { Container, Flex, Heading, SimpleGrid, Stack, Text, Image, useColorModeValue, Box, Button, Badge } from '@chakra-ui/react';
import BreadcrumbCustom from '@/components/common/Layout/BreadcrumbCustom';
import RadioCard from '@/components/ui/RadioCard';
import { BsFillHeartFill } from 'react-icons/bs';
import Rating from '@/components/ui/Rating';
import { addToCart } from '@/lib/redux/slice/cart';
import { useAppDispatch } from '@/lib/redux';

function checkTypeSale({ price, isSale }: { price: number, isSale: { type: string, value: number } }) {
    if (isSale.type === "value") { return isSale.value; }
    if (isSale.type === "percent") {
        return (price - (price * isSale.value / 100))
    }
}

const ProductPage: NextPage<{ data: any }> = props => {
    const dispatch = useAppDispatch()
    if (!props.data) {
        return <ErrorPage statusCode={404} />;
    }
    const { _id, name, price, isSale } = props.data
    return (
        <Layout>
            <Container maxW='container.xl' py='12'>
                <BreadcrumbCustom />
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
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
                        <Flex gap={'4'} py='2'>
                            <Button
                                onClick={() => dispatch(addToCart(props.data))}
                                flex={'1'}
                                colorScheme={'green'}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button rightIcon={<BsFillHeartFill />} colorScheme='pink' variant='outline'>
                                Thích
                            </Button>
                        </Flex>
                    </Stack>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={
                                'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                            }
                            objectFit={'cover'}
                        />
                    </Flex>
                </SimpleGrid>
            </Container>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query } = context;
    try {
        const result = await fetch(`http://localhost:3000/api/product?slug=${query.slug}`);
        const data = await result.json();
        return {
            props: { data }
        };
    } catch {
        res.statusCode = 404;
        return {
            props: {}
        };
    }
};

export default ProductPage;