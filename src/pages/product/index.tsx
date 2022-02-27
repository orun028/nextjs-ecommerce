import { Fillter, ListProduct, Layout, BreadcrumbCustom } from '@/components/common';
import { Pagination } from '@/components/ui';
import { Center, Container, Grid, GridItem } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

export async function getStaticProps() {
  const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product?page=1&limit=8`)
  const productVal = await product.json()
  return { props: { productVal } }
}

const ShopPage: NextPage = ({ productVal }: any) => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(undefined)
  const { data, error } = useSWR(`/api/product?page=${page}&limit=8`,
    (url: RequestInfo) => fetch(url).then((res) => res.json()),
    { fallbackData: productVal, refreshInterval: 60 * 60 * 24 })
  const { result, total } = data || { result: [], total: 0 }
  const lastPage = (total <= 10) ? 1 : Math.ceil(total / 10)

  return (
    <Layout>
      <Container maxW='container.xl' py='8'>
        <BreadcrumbCustom getDefaultTextGenerator={() => 'Sản phẩm'} />
        {error ? <div>Failed to load Product</div>
          : <Grid templateColumns='repeat(7, 1fr)' gap={8}>
            <GridItem colSpan={5}>
              {!data ? <p>Loading Please wait...</p> :
                <ListProduct layout="all" data={result} rows={4} />
              }
              <Center py='6'>
                <Pagination currentPage={page} lastPage={lastPage} handlePageClick={(e: number) => setPage(e)} />
              </Center>
            </GridItem>
            <GridItem colSpan={2} pt='2'>
              <Fillter />
            </GridItem>
          </Grid>}
      </Container>
    </Layout>
  );
}

export default ShopPage;