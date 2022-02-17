import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react';
import React from 'react';
import { Hero, Layout, Products } from '@/components/common';
import useSWR from 'swr'

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/product?page=1&limit=8', fetcher)
  const { result, total } = data || {result : [], total: 0}

  if (error) return <div>Failed to load Product</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <Container maxW={'container.xl'} py='8'>
        {/* <Hero/> */}
      </Container>

      <Container maxW={'container.xl'} py='8'>
        <Products title="Sản phẩm phổ biến" layout="popular" data={result} />
      </Container>

      {/* end */}
    </Layout>
  )
}

export default Home;