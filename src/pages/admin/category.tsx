import { Container, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/common';

const Category: NextPage = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            await fetch(`http://localhost:3000/api/product?page=${page}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setData(data.result)
                    setLoading(false)
                })
        }
        if (isLoading) {
            getData()
        }
    }, [])

    return <Container maxW={'container.xl'} py={'8'}>
        <Sidebar />
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                </Tr>
            </Tbody>
        </Table>
    </Container>;
}

export default Category;