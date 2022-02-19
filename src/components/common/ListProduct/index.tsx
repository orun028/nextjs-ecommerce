import React from 'react';
import { Box, Text, Link, SimpleGrid, Stack } from '@chakra-ui/react';

import ProductAddToCart from './ProductAddToCart'

interface ProductsProp {
  title: String,
  data: Array<Object> | [],
  layout: String
}

export default function Products({ title, data, layout }: ProductsProp) {
  return (
    <Box maxW="full">
      <Stack direction={'row'} justifyContent='space-between' alignItems={'center'}>
        <Text fontSize={'3xl'} pb={4} fontWeight={'medium'}>
          {title || 'What is your title?'}
        </Text>
        <Link border={'1px'}
          borderColor='gray.300'
          p='2' py='1'
          rounded={'2xl'}
          fontSize='sm'
          _hover={{ bg: 'gray.300', textDecoration: 'none' }}>
          Xem thêm</Link>
      </Stack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 5 }} spacing={6}>
        {data.map((v, i) => <ProductAddToCart value={v} key={i} />)}
      </SimpleGrid>
    </Box>
  );
}
