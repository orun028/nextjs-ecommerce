import type { NextPage } from 'next'
import { Container, Heading, Icon, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Layout, ListProduct } from '@/components/common';
import { ListCategory, Loading, MailSubscribe, PreviewService, SlideWithCategory } from '@/components/ui';
import { FaAngleDown } from 'react-icons/fa';

export async function getStaticProps() {
  const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product?page=1&limit=10`)
  const productVal = product.ok ? await product.json() : null
  return { props: { productVal } }
}

const HomePage: NextPage = ({ productVal }: any) => {
  const { result } = productVal || { result: [] }

  return (
    <Layout>
      <Container maxW={'container.xl'} py='8' px={{ base: 0, lg: 4, xl: 12 }}>
        <SlideWithCategory />
        <LinkBox as='article' textAlign='center' py='6'  >
          <Icon as={FaAngleDown} fontSize='4xl' color='blackAlpha.700'/>
          <Text >
            <LinkOverlay href='#productListId' color='blue.700' fontWeight='medium'>Tìm đến sản phẩm</LinkOverlay>
          </Text>
        </LinkBox>
      </Container>

      <Container maxW={'container.xl'} py='8' px={{ base: 0, lg: 4, xl: 12 }}>
        <Heading textAlign='center' py='6' color='blackAlpha.700'>Danh mục sản phẩm</Heading>
        <ListCategory />
      </Container>

      <Container id='productListId' maxW={'container.xl'} py='8' px={{ base: 0, lg: 4, xl: 12 }}>
      <Heading textAlign='center' py='6' color='blackAlpha.700'>Sản phẩm mới</Heading>
        {!productVal && productVal != null ? <Loading/>
          : <ListProduct layout="popular" data={result} rows={5} />}
        {productVal == null && <p>Failed to load Products</p>}
      </Container>

      <Container maxW={'container.xl'} py='8' px={{ base: 0, lg: 4, xl: 12 }}>
        <PreviewService />
      </Container>

    </Layout>
  )
}

export default HomePage;