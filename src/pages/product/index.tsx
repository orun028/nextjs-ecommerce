import { Products } from '@/components/common';
import Layout from '@/components/common/Layout';
import BreadcrumbCustom from '@/components/common/Layout/BreadcrumbCustom';
import { Pagination } from '@/components/ui';
import { Container } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

const ShopPage: NextPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      await fetch(`http://localhost:3000/api/product?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setData(data.result)
          setLoading(false)
        })
    }
    if (isLoading) {
      getData()
    }
  })

  return (
    <Layout>
      <Container maxW='container.xl' py='8'>
        <BreadcrumbCustom getDefaultTextGenerator={() => 'Sản phẩm'} />
        {isLoading ? <p>Loading Please wait...</p> :
          <Products title="Sản phẩm phổ biến" layout="popular" data={data} />
        }
        <div>
          <Pagination currentPage={page} lastPage={10} handlePageClick={e => console.log(e)} />
        </div>
      </Container>
    </Layout>
  );
}

export default ShopPage;