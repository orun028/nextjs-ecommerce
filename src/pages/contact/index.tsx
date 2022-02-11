import { Layout } from '@/components/common';
import { PagaNotWorking } from '@/components/ui';
import { Container } from '@chakra-ui/react';
import { NextPage } from 'next';

const Contact: NextPage = () => {
    return <Layout>
        <Container maxW={'container.xl'} py={{ base: 20, md: 36 }}>
            <PagaNotWorking />
        </Container>
    </Layout>;
}

export default Contact;
