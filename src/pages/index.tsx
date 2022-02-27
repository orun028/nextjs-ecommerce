import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react';
import { Layout, ListProduct } from '@/components/common';
import SlideWithCategory from '@/components/ui/SlideWithCategory';

export async function getStaticProps() {
  const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product?page=1&limit=10`)
  const productVal = await product.json()
  return { props: { productVal } }
}

const HomePage: NextPage = ({ productVal }: any) => {
  const { result, total } = productVal || { result: [], total: 0 }

  return (
    <Layout>
      <Container maxW={'container.xl'} py='8'>
        <SlideWithCategory />
      </Container>

      <Container maxW={'container.xl'} py='8'>
        {!productVal ? <div>Loading...</div>
          : <ListProduct title="Sản phẩm mới" layout="popular" data={result} rows={5} />}
      </Container>

    </Layout>
  )
}

export default HomePage;