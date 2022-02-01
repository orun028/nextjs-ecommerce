import { Container, Flex } from '@chakra-ui/react';
import React from 'react';
import Details from './details';
import Cart from './cart';

export default function index() {
  return (
      <Container>
          <Flex>
              <Details/>
              <Cart/>
          </Flex>
      </Container>
  );
}
