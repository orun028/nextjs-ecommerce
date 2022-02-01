import type { GetServerSideProps, NextPage } from 'next'
import Layout from '@/components/common/Layout'
import { Container, Text } from '@chakra-ui/react';
import Products from '@/components/common/Products';
import React from 'react';

type Data = {
  result: Array<Object>,
  total: Number
}

const Home: NextPage<{ data: Data }> = props => {
  const [isLoading, setLoading] = React.useState(true)
  const { result, total } = props.data

  React.useEffect(() => {
    async function getData() {
      if (result && result.length > 0) {
        setLoading(false)
      }
    }
    if (isLoading) { getData() }
  }, [])

  return (
    <Layout>

      <Container maxW={'container.xl'}>
        {isLoading ? <p>Loading Please wait...</p> :
          <Products title="Sản phẩm phổ biến" layout="popular" data={result} />
        }
      </Container>

      {/* end */}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const result = await fetch(`http://localhost:3000/api/product?limit=8`);
    const data = await result.json();

    return { props: { data } };
  } catch {
    return { props: {} };
  }
};

export default Home
