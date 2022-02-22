import { Products } from '@/components/common';
import Layout from '@/components/common/Layout';
import BreadcrumbCustom from '@/components/common/Layout/BreadcrumbCustom';
import { Pagination } from '@/components/ui';
import useApi from '@/lib/useApi';
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';

export async function getStaticProps() {
  const product = await fetch(useApi('product?page=1&limit=10'))
  const productVal = await product.json()
  return {
    props: {
      fallback: {
        '/api/product': productVal
      }
    }
  }
}

function Page(){
  const [ page, setPage ] = useState(1)
  const { data, error } = useSWR(`/api/product?page=${page}&limit=10`)
  const { result, total } = data || { result: [], total: 0 }

  if (error) return <div>Failed to load Product</div>

  return (
    <Layout>
      <Container maxW='container.xl' py='8'>
        <BreadcrumbCustom getDefaultTextGenerator={() => 'Sản phẩm'} />
        <Grid>
          <GridItem>
            {!data ? <p>Loading Please wait...</p> :
              <Products layout="all" data={result} />
            }
            <Box py='6'>
              <Pagination currentPage={page} lastPage={10} handlePageClick={e => console.log(e)} />
            </Box>
          </GridItem>
          <GridItem>
            
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}

const ShopPage: NextPage = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Page />
    </SWRConfig>
  )
}

export default ShopPage;