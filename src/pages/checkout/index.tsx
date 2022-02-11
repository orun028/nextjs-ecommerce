import { Text, Image, AspectRatio, Box, Button, Container, Flex, Heading, HStack, useColorMode, useColorModeValue, VStack, Stack, Divider, SimpleGrid, GridItem, FormControl, FormLabel, Input, useBreakpointValue, Select, Checkbox } from '@chakra-ui/react';
import React from 'react';
import { Layout, BreadcrumbCustom } from '@/components/common';
import { NextPage } from 'next';

const Details = () => {
    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    return (
        <VStack w="full" h="full" p={2} spacing={10} alignItems="flex-start">
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">Your details</Heading>
                <Text>If you already have an account, click here to log in.</Text>
            </VStack>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder="John" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Doe" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input placeholder="Blvd. Broken Dreams 21" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="San Francisco" />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={"auto"}>
                    <FormControl>
                        <FormLabel>Country</FormLabel>
                        <Select>
                            <option value="usa">United States of America</option>
                            <option value="uae">United Arab Emirates</option>
                            <option value="nmk">North Macedonia</option>
                            <option value="de">Germany</option>
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Checkbox defaultChecked>Ship to billing address.</Checkbox>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button size="lg" w="full">
                        Place Order
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

const Cart = () => {
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
    return (
        <VStack
            w="full"
            h="full"
            p={2} 
            spacing={6}
            align="flex-start"
            bg={bgColor}
        >
            <VStack alignItems="flex-start" spacing={3}>
                <Heading size="2xl">Your cart</Heading>
                <Text>
                    If the price is too hard on your eyes,{' '}
                    <Button onClick={toggleColorMode} variant="link" colorScheme="black">
                        try changing the theme.
                    </Button>
                </Text>
            </VStack>
            <HStack spacing={6} alignItems="center" w="full">
                <AspectRatio ratio={1} w={24}>
                    <Image src='' fallbackSrc='https://via.placeholder.com/100' alt="Skateboard" />
                </AspectRatio>
                <Stack
                    spacing={0}
                    w="full"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <VStack w="full" spacing={0} alignItems="flex-start">
                        <Heading size="md">Penny board</Heading>
                        <Text color={secondaryTextColor}>PNYCOMP27541</Text>
                    </VStack>
                    <Heading size="sm" textAlign="end">
                        $119.00
                    </Heading>
                </Stack>
            </HStack>
            <VStack spacing={4} alignItems="stretch" w="full">
                <HStack justifyContent="space-between">
                    <Text color={secondaryTextColor}>Subtotal</Text>
                    <Heading size="sm">$119.00</Heading>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text color={secondaryTextColor}>Shipping</Text>
                    <Heading size="sm">$19.99</Heading>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text color={secondaryTextColor}>Taxes (estimated)</Text>
                    <Heading size="sm">$23.80</Heading>
                </HStack>
            </VStack>
            <Divider />
            <HStack justifyContent="space-between" w="full">
                <Text color={secondaryTextColor}>Total</Text>
                <Heading size="lg">$162.79</Heading>
            </HStack>
        </VStack>
    );
};

const index: NextPage = () => {
    return (
        <Layout>
            <Container maxW='container.xl' py='8'>
                <BreadcrumbCustom getDefaultTextGenerator={() => 'Thanh toán'} />
                <Flex
                    /* h={{ base: 'auto', md: '100vh' }}  */
                    gap='8'
                    direction={{ base: 'column-reverse', md: 'row' }} >
                    <Details />
                    <Cart />
                </Flex>
            </Container>
        </Layout>
    );
}
export default index;