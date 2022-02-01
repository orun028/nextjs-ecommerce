import React from 'react';
import { Box, chakra, SimpleGrid } from '@chakra-ui/react';

import ProductAddToCart from './ProductAddToCart'

interface ProductsProp {
  title: String,
  data: Array<Object> | [],
  layout: String
}

export default function Products({ title, data, layout }: ProductsProp) {
  return (
    <Box maxW="full" mx={'auto'} py={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>{title || 'What is your title?'} </chakra.h1>
      <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={8}>
        {data.map((v, i) => <ProductAddToCart value={v} key={i} />)}
      </SimpleGrid>
    </Box>
  );
}
