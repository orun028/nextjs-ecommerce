import { Pagination } from '@/components/ui';
import { Checkbox, Container, Table, Tbody, Td, Th, Thead, Tr, Image, Box, Flex, Text, Stack, Link, Divider, Center, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/common';
import NextLink from 'next/link'

const index: NextPage = () => {
    const [data, setData] = useState([])
    const [limit, setLimit] = useState({ page: 1, total: 0 })
    const [isLoading, setLoading] = useState(true)

    const [checkedItems, setCheckedItems] = React.useState([false])

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    useEffect(() => {
        async function getData() {
            await fetch(`http://localhost:3000/api/product?page=${limit.page}&limit=10`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data.result)
                    setLimit({ ...limit, total: data.total })
                    setLoading(false)
                })
        }
        if (isLoading) {
            getData()
        }
    }, [])

    if (isLoading) { <p>Loading Please wait...</p> }

    function checkTypeSale(v: any) {
        if (v.isSale.type === "value") { return v.isSale.value; }
        if (v.isSale.type === "percent") {
            return (v.price - (v.price * v.isSale.value / 100))
        }
    }

    return <>
        <Sidebar />
        <Container maxW={'container.xl'} py='6'>
            <Stack justifyContent={'space-between'} direction='row'>
                <Flex></Flex>
                <Button colorScheme={'blackAlpha'}>New item</Button>
            </Stack>
            <Table variant='simple' my={'6'} size='sm'>
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
                    {data.map(
                        (v: {
                            _id: string,
                            image: any,
                            name: string,
                            price: number,
                            isSale: { status: boolean, type: string, value: string },
                            quantity: number,
                            createdAt: any
                        }, i) => <Tr key={i}>
                                <Td>
                                    <Checkbox colorScheme={'blackAlpha'}
                                        isChecked={checkedItems[0]}
                                        onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])} />
                                </Td>
                                <Td><Image src={v.image.item} fallbackSrc='https://via.placeholder.com/50' /></Td>
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
                                            <Link>Delete</Link>
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
                                <Td isNumeric>{new Date(v.createdAt).toLocaleDateString("en-US")}</Td>
                            </Tr>
                    )}
                </Tbody>
            </Table>
            <Flex justifyContent={'space-between'} >
                <Text>Total: {limit.total}</Text>
                <Pagination
                    currentPage={limit.page}
                    lastPage={(limit.total <= 10) ? 1 : Math.ceil(limit.total / 10)}
                    handlePageClick={(e) => console.log(e)} />
            </Flex>
        </Container>
    </>;
}

export default index;