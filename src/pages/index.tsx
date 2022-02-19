import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react';
import React from 'react';
import { Layout, Products } from '@/components/common';
import useSWR from 'swr'
import SlideWithCategory from '@/components/ui/SlideWithCategory';
import ListCategory from '@/components/ui/ListCategory';
import ListPost from '@/components/common/ListPost';

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/product?page=1&limit=10', fetcher)
  const { result, total } = data || {result : [], total: 0}

  if (error) return <div>Failed to load Product</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <Container maxW={'container.xl'} py='8'>
          <SlideWithCategory/>
      </Container>

      {/* <Container maxW={'container.xl'} py='8'>
          <ListCategory/>
      </Container> */}

      <Container maxW={'container.xl'} py='8'>
        <Products title="Sản phẩm nổi bật nhất" layout="popular" data={result} />
      </Container>
      
      <Container maxW={'container.xl'} py='8'>
        <Products title="Sản phẩm mới" layout="popular" data={result} />
      </Container>

      <Container maxW={'container.xl'} py='8'>
        <ListPost title="Mẹo vặt và công nghệ" layout="popular" data={[]}/>
      </Container>

      {/* end */}
    </Layout>
  )
}

export default Home;