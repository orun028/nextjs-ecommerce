import { LayoutAdmin } from '@/components/common';
import { Container } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';

const DashboardPage: NextPage = () => {
    return (<LayoutAdmin>
        <Container maxW={'container.xl'} py={'8'}>
            123123
        </Container>
    </LayoutAdmin>
    );
}

export default DashboardPage;
