import React from 'react';
import { Box, calc, Center, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { BsFillInfoCircleFill } from 'react-icons/bs';

export default function PagaNotWorking() {
    return <Box textAlign="center" py={10} px={6}>
        <Icon as={BsFillInfoCircleFill} boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
            Trang chưa được hoàn thiện
        </Heading>
        <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua.
        </Text>
    </Box>;
}
