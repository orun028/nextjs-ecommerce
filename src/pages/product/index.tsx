import { Fillter, ListProduct, Layout } from '@/components/common';
import { Loading, Pagination } from '@/components/ui';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Container, Grid, GridItem } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

export async function getStaticProps() {
  const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product?page=1&limit=8`)
  const productVal = product.ok ? await product.json() : null
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
      <Container maxW='container.xl' py='8' minH={'400px'}>
        {error ? <p>Failed to load Product</p>
          : <Box>
            <Accordion allowToggle display={{ base: 'inherit', md: 'none' }} mb='4' >
              <AccordionItem borderRadius='md' shadow='md'>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Tìm kiếm
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Fillter layout='row' />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Grid templateColumns='repeat(7, 1fr)' gap={8}>
              <GridItem colSpan={{ base: 7, md: 5 }}>
                {!data ? <Loading/> :
                  <ListProduct layout="all" data={result} rows={4} />
                }
                <Center py='6'>
                  <Pagination currentPage={page} lastPage={lastPage} handlePageClick={(e: number) => setPage(e)} />
                </Center>
              </GridItem>
              <GridItem colSpan={{ base: 0, md: 2 }}>
                <Fillter layout='row' title='Tìm kiếm'/>
              </GridItem>
            </Grid>
          </Box>}
      </Container>
    </Layout>
  );
}

export default ShopPage;