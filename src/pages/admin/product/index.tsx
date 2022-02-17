import { ModalCustom, Pagination } from '@/components/ui';
import { Checkbox, Container, Table, Tbody, Td, Th, Thead, Tr, Image, Box, Flex, Text, Stack, Link, Divider, Center, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { LayoutAdmin } from '@/components/common';
import NextLink from 'next/link'
import useSWR from 'swr';

type MProduct = {
    _id: string,
    image: string,
    name: string,
    price: number,
    isSale: { status: boolean, type: string, value: string },
    quantity: number,
    createdAt: Date
}

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())
const ProductPage: NextPage = () => {
    const [page, setPage] = useState(1)
    const { data, error } = useSWR(`/api/product`, fetcher)/* ?page=${page} */
    const { result, total } = data || { result: [], total: 0 }

    const [checkedItems, setCheckedItems] = useState([false])
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    function checkTypeSale(v: any) {
        if (v.isSale.type === "value") { return v.isSale.value; }
        if (v.isSale.type === "percent") {
            return (v.price - (v.price * v.isSale.value / 100))
        }
    }
    const actionDelete = () => {
        var result = confirm("Want to delete?");
        if (result) {
            //Logic to delete the item
        }
    }

    if (error) return <div>Failed to load Product</div>
    return <LayoutAdmin>
        <Container maxW={'container.xl'} py='6'>
            <Stack justifyContent={'space-between'} direction='row'>
                <Flex></Flex>
                <Button colorScheme={'blackAlpha'}>New item</Button>
            </Stack>
            {!data ? <Text>Loading...</Text> : <><Table variant='simple' my={'6'} size='sm'>
                <Thead>
                    <Tr>
                        <Th>
                            <Checkbox
                                colorScheme={'blackAlpha'}
                                isChecked={allChecked}
                                isIndeterminate={isIndeterminate}
                                onChange={(e) => setCheckedItems([e.target.checked])} />
                        </Th>
                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Stock</Th>
                        <Th>Price</Th>
                        <Th isNumeric>CreatedAt</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {result.map(
                        (v: MProduct, i: React.Key) => <Tr key={i}>
                            <Td>
                                <Checkbox colorScheme={'blackAlpha'}
                                    isChecked={checkedItems[0]}
                                    onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])} />
                            </Td>
                            <Td><Image src={''} fallbackSrc='https://via.placeholder.com/50' alt={'Image product'+v.name}/></Td>
                            <Td>
                                <Stack as={Box} direction='column' justifyContent={'space-between'}>
                                    <Text fontSize={'md'}>{v.name}</Text>
                                    <Flex color={'gray.300'}>
                                        <NextLink href={{
                                            pathname: '/admin/product/[id]',
                                            query: { id: v._id },
                                        }}>
                                            <Link>Edit</Link>
                                        </NextLink>
                                        <Center height='10px' mx='2'>
                                            <Divider orientation='vertical' />
                                        </Center>
                                        <Link onClick={actionDelete}>Delete</Link>
                                    </Flex>
                                </Stack>
                            </Td>
                            <Td color={v.quantity > 10 ? 'green.300' : 'red.300'}>{v.quantity}</Td>
                            <Td>
                                <Stack as={Box} direction='column'>
                                    <Text textDecoration={`${v.isSale.status ? 'line-through' : ''}`} >{v.price}</Text>
                                    {v.isSale.status ? <Text>{String(checkTypeSale(v)).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</Text> : ''}
                                </Stack>
                            </Td>
                            <Td isNumeric>{new Date(v.createdAt).toLocaleString("en-US")}</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
                <Flex justifyContent={'space-between'} >
                    <Text>Total: {total}</Text>
                    <Pagination
                        currentPage={page}
                        lastPage={(total <= 10) ? 1 : Math.ceil(total / 10)}
                        handlePageClick={(e) => console.log(e)} />
                </Flex></>}
        </Container>
    </LayoutAdmin>;
}

export default ProductPage;