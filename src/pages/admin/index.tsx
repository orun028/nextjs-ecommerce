import { Container } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { Sidebar } from '@/components/common';

const index: NextPage = () => {
    return <Container maxW={'container.xl'} py={'8'}>
        <Sidebar />
    </Container>;
}

export default index;
