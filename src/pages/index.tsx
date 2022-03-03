import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react';
import { Layout, ListProduct } from '@/components/common';
import SlideWithCategory from '@/components/ui/SlideWithCategory';

export async function getStaticProps() {
  const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product?page=1&limit=10`)
  const productVal = product.ok ? await product.json() : null
  return { props: { productVal } }
}

const HomePage: NextPage = ({ productVal }: any) => {
  const { result } = productVal || { result: []}

  return (
    <Layout>
      <Container maxW={'container.xl'} py='8'>
        <SlideWithCategory />
      </Container>

      <Container maxW={'container.xl'} py='8'>
        {!productVal && productVal != null ? <div>Loading...</div>
          : <ListProduct title="Sản phẩm mới" layout="popular" data={result} rows={5} />}
        {productVal == null && <p>Failed to load Products</p>}
      </Container>

    </Layout>
  )
}

export default HomePage;