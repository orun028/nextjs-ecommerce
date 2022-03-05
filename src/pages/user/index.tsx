import { useSession } from "next-auth/react"
import { Layout } from "@/components/common"
import { Box, useColorModeValue, Avatar, Heading, Stack, Badge, Button, Text, Flex, Container, Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react"

export default function MePage() {
    const { data } = useSession()

    return (
        <Layout>
            <Container maxW={'container.xl'}>
                <Stack>

                </Stack>
                <Stack direction={'column'} spacing='6' py='8'>
                    <Box padding='4' maxW={'320px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'}>
                        <Flex alignItems='center'>
                            {data?.user?.image && <Avatar
                                size={'md'}
                                src={data.user.image}
                                alt={'Avatar Alt'}
                                pos={'relative'}
                                _after={{ content: '""', w: 4, h: 4, bg: 'green.300', border: '2px solid white', rounded: 'md', pos: 'absolute', bottom: -1, right: 0.5, }}
                            />}
                            <Stack spacing='0' ml='2'>
                                {data?.user?.name && <Heading fontSize={'xl'} fontFamily={'body'}>
                                    {data.user.name}
                                </Heading>}
                                <Text fontWeight={600} color={'gray.500'}>
                                    @lindsey_jam3s
                                </Text>
                            </Stack>
                        </Flex>
                        <Box>

                        </Box>
                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                                _hover={{ bg: 'blue.500', }}
                                _focus={{ bg: 'blue.500', }}>
                                Đăng xuất
                            </Button>
                        </Stack>
                    </Box>
                </Stack>

                <Tabs>
                    <TabList>
                        <Tab>One</Tab>
                        <Tab isDisabled>Two</Tab>
                        <Tab>Three</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>1</TabPanel>
                        <TabPanel>2</TabPanel>
                        <TabPanel>3</TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Layout>
    )
}