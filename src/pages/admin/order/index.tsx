import { Pagination } from '@/components/ui';
import { Checkbox, Container, Table, Tbody, Td, Th, Thead, Tr, Box, Flex, Text, Stack, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { LayoutAdmin } from '@/components/common';
import useSWR from 'swr';
import { formatDate } from '@/utils/format';

const OrderPage: NextPage = () => {
    const [page, setPage] = useState(1)
    const { data, error } = useSWR(`/api/order?page=${page}&limit=10`, (url: RequestInfo) => fetch(url).then((res) => res.json()))
    const { result, total } = data || { result: [], total: 0 }

    const [checkedItems, setCheckedItems] = useState([])

    const actionDelete = () => {
        var result = confirm("Want to delete?");
        if (result) {
            //Logic to delete the item
        }
    }

    if (error) return <div>Failed to load Product</div>
    return <LayoutAdmin>
        <Container maxW={'container.xl'}>
            <Stack justifyContent={'space-between'} direction='row' bg={'white'} p='2' mb='4' shadow={'md'} rounded='md'>
                <Flex></Flex>
                <Button colorScheme={'blackAlpha'}>New item</Button>
            </Stack>

            {!data ? <Text>Loading...</Text>
                : <Box bg={'white'} p='2' shadow={'md'} rounded='md'>
                    <Table variant='simple' my={'6'} size='sm'>
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox/>
                                </Th>
                                <Th>Đơn hàng</Th>
                                <Th isNumeric>Ngày</Th>
                                <Th isNumeric>Tình trạng</Th>
                                <Th isNumeric>Tổng</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {result && result.map(
                                (v: any, i: React.Key) => <Tr key={i}>
                                    <Td><Checkbox/></Td>
                                    <Td>{v.userPay.name}</Td>
                                    <Td isNumeric>{formatDate(v.createdAt)}</Td>
                                    <Td isNumeric>{v.state}</Td>
                                    <Td isNumeric>{v.total}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                    <Flex justifyContent={'space-between'} >
                        <Text>Data all: {total}</Text>
                        <Pagination
                            currentPage={page}
                            lastPage={(total <= 10) ? 1 : Math.ceil(total / 10)}
                            handlePageClick={(e: any) => {
                                setPage(e)
                            }} />
                    </Flex>
                </Box>
            }
        </Container>
    </LayoutAdmin>;
}

export default OrderPage;