import { Products } from '@/components/common';
import Layout from '@/components/common/Layout';
import BreadcrumbCustom from '@/components/common/Layout/BreadcrumbCustom';
import { Pagination } from '@/components/ui';
import { Center, Checkbox, CheckboxGroup, Container, Grid, GridItem, Heading, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';

export async function getStaticProps() {
  const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product?page=1&limit=10`)
  const productVal = await product.json()
  return {
    props: {
      fallback: {
        '/api/product': productVal
      }
    }
  }
}

function Page() {
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/product?page=${page}&limit=10`)
  const { result, total } = data || { result: [], total: 0 }

  if (error) return <div>Failed to load Product</div>

  return (
    <Layout>
      <Container maxW='container.xl' py='8'>
        <BreadcrumbCustom getDefaultTextGenerator={() => 'Sản phẩm'} />
        <Grid templateColumns='repeat(7, 1fr)' gap={8}>
          <GridItem colSpan={5}>
            {!data ? <p>Loading Please wait...</p> :
              <Products layout="all" data={result} />
            }
            <Center py='6'>
              <Pagination currentPage={page} lastPage={(total <= 10) ? 1 : Math.ceil(total / 10)} handlePageClick={(e: number) => setPage(e)} />
            </Center>
          </GridItem>
          <GridItem colSpan={2} pt='2'>
            <Heading fontSize={'md'} py='2'>Tìm kiếm</Heading>
            <form>
              <FormControl py='3'>
                <Input placeholder='Tên sản phẩm' />
              </FormControl>
              <FormControl py='3'>
                <FormLabel>Danh mục sản phẩm</FormLabel>
                <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
                  <Stack spacing={[1, 5]} direction={'column'}>
                    <Checkbox value='naruto'>Sản phẩm mới</Checkbox>
                    <Checkbox value='sasuke'>Khuyến mãi</Checkbox>
                    <Checkbox value='kakashi'>Phụ kiện</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormControl>
              <FormControl py='3'>
                <FormLabel>Giá sản phẩm</FormLabel>
                <Slider aria-label='slider-ex-2' colorScheme='green' defaultValue={30} width='80%'>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
              <Button py='3' type='submit'>Tìm kiếm</Button>
            </form>
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