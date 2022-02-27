import React from 'react';
import { Box, Text, Link, SimpleGrid, Stack } from '@chakra-ui/react';
import ProductAddToCart from './ProductAddToCart';
import NextLink from 'next/link'

interface ProductsProp {
  title?: String,
  data: Array<Object> | [],
  layout: String,
  rows: number
}

export default function Products({ title, data, layout, rows }: ProductsProp) {

  return (
    <Box maxW="full">
      <Stack direction={'row'} justifyContent='space-between' alignItems={'center'}>

        {layout != 'all' && <Text fontSize={'3xl'} pb={4} fontWeight={'medium'}>
          {title}
        </Text>}
        {layout != 'all' && <NextLink href={'#'}>
          <Link border={'1px'} borderColor='gray.300' p='2' py='1' rounded={'2xl'} fontSize='sm'
            _hover={{ bg: 'gray.300', textDecoration: 'none' }}>
            Xem thêm
          </Link>
        </NextLink>}

      </Stack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: rows }} spacing={6}>
        {data.map((v, i) => <ProductAddToCart value={v} key={i} />)}
      </SimpleGrid>
    </Box>
  );
}
