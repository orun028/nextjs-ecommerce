import Layout from '@/components/common/Layout';
import BreadcrumbCustom from '@/components/common/Layout/BreadcrumbCustom';
import { Box, Container, Heading, List, ListItem, Stack, Image, Text, useNumberInput, HStack, Button, Input, Divider, Link, GridItem, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link"

function HookUsage() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: 10,
            precision: 0,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ readOnly: true })

    return (
        <HStack maxW='320px'>
            <Button {...dec} size='sm'>-</Button>
            <Input {...input} size='sm' maxW={16} />
            <Button {...inc} size='sm'>+</Button>
        </HStack>
    )
}

export default function index() {
    return (
        <Layout>
            <Container maxW={'container.xl'} py='6'>
                <BreadcrumbCustom getDefaultTextGenerator={() => 'Giỏ hàng'} />
                <Heading as='h3' size='lg'>Giỏ hàng</Heading>
                <Grid gap='4' templateColumns='repeat(6, 1fr)'>
                    <GridItem as={List} colSpan={{ base: 6, lg: 4 }}>
                        <Stack as={ListItem} direction='row' p='5' pl='0' justifyContent='space-between' alignItems='start'>
                            <Flex as={Box} gap='3'>
                                <Image src='' fallbackSrc='https://via.placeholder.com/100' />
                                <Flex direction='column'>
                                    <Text fontSize='md'>Jackson Shorts with Bow</Text>
                                    <Text color={'gray.500'} fontSize='sm'>Dark blue, 36</Text>
                                </Flex>
                            </Flex>
                            <Text>180,000₫</Text>
                            <HookUsage />
                            <Flex as={Box} direction='column' alignItems={'end'}>
                                <Text>180,000₫</Text>
                                <Stack direction='row'>
                                    <Link>Delete</Link>
                                    <Divider orientation='vertical' colorScheme='gray' />
                                    <Link>Like</Link>
                                </Stack>
                            </Flex>
                        </Stack>
                        <Divider />
                    </GridItem>
                    <GridItem colSpan={{ base: 6, md: 6, lg: 2 }}>
                        <Stack direction={{ base: 'column', md: 'row', lg: 'column' }} gap='2'>
                            <Stack
                                gap={1}
                                as={Box}
                                p='5'
                                w={'full'}
                                bg={'#F7FAFC'}
                                rounded={'md'}
                                overflow={'hidden'}>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Heading as='h5' fontSize='md'>Giao tới</Heading>
                                    <Link>Thay đổi</Link>
                                </Stack>
                                <Text>Nguyen Thinh</Text>
                                <Text>0123123123</Text>
                                <Text>95/52/28 Le Van Luong, Phường Tân Kiểng, Quận 7, Hồ Chí Minh</Text>
                            </Stack>
                            <Stack
                                gap={2}
                                as={Box}
                                p='5'
                                w={'full'}
                                bg={'#F7FAFC'}
                                rounded={'md'}
                                overflow={'hidden'} >
                                <Flex justifyContent={'space-between'}>
                                    <Text>Tạm tính</Text>
                                    <Text>0₫</Text>
                                </Flex>
                                <Flex justifyContent={'space-between'}>
                                    <Text>Giảm giá</Text>
                                    <Text>0₫</Text>
                                </Flex>
                                <Divider colorScheme='gray' />
                                <Flex justifyContent={'space-between'}>
                                    <Text>Tổng cộng</Text>
                                    <Text>0₫</Text>
                                </Flex>
                            </Stack>
                            <NextLink href='/checkout'>
                                <Button colorScheme={'green'}>Thanh toán</Button>
                            </NextLink>
                        </Stack>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    );
}
