import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react';
import { Layout, Products } from '@/components/common';
import SlideWithCategory from '@/components/ui/SlideWithCategory';
import useApi from '@/lib/useApi';

export async function getStaticProps() {
  const product = await fetch(useApi('product?page=1&limit=10'))
  const productVal = await product.json()
  return {
    props: {
      productVal
    }
  }
}

const HomePage: NextPage = ({ productVal }: any) => {
  const { result, total } = productVal || { result: [], total: 0 }

  if (!productVal) return <div>Loading...</div>

  return (
    <Layout>
      <Container maxW={'container.xl'} py='8'>
        <SlideWithCategory />
      </Container>

      {/* <Container maxW={'container.xl'} py='8'>
          <ListCategory/>
      </Container> */}

      {/* <Container maxW={'container.xl'} py='8'>
        <Products title="Sản phẩm nổi bật nhất" layout="popular" data={result} />
      </Container> */}

      <Container maxW={'container.xl'} py='8'>
        <Products title="Sản phẩm mới" layout="popular" data={result} />
      </Container>

      {/* <Container maxW={'container.xl'} py='8'>
        <ListPost title="Mẹo vặt và công nghệ" layout="popular" data={[]} />
      </Container> */}
    </Layout>
  )
}

export default HomePage;