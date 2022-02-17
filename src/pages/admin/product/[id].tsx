import { NextPage } from "next";
import { Text, Button, Container, FormControl, FormHelperText, FormLabel, Grid, GridItem, Input, Link, Stack, useColorModeValue, Heading, CheckboxGroup, Checkbox, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Divider, Icon, FormErrorMessage, TagLabel, TagCloseButton, Tag, Accordion, AccordionItem, AccordionButton, AccordionPanel, Select, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LayoutAdmin } from "@/components/common";
import useSWR, { useSWRConfig } from 'swr';
import Image from "next/image";
import EditorConvertToJSON from "@/components/ui/Editor";
import { BsDash, BsFillCalendarCheckFill, BsFillCalendarFill, BsFillEyeFill, BsPlus } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { convertToRaw } from "draft-js";

type FormData = {
    status: string;
    name: string;
    price: number;
    isSale: {};
    categorys: any[];
    tags: any[];
    description: any;
    shortDescription: any;
};

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json())
const Action: NextPage = () => {
    const router = useRouter()
    const { mutate } = useSWRConfig()
    const host = process.env.NEXT_PUBLIC_HOST;
    const { id } = router.query
    const { data: product, error: errProduct } = useSWR(id ? `/api/product/${id}` : null, fetcher)
    const { data: category } = useSWR('/api/product/category', fetcher)
    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
    const [load, isLoad] = useState(false)
    const { register, control, setValue, getValues, watch, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ojb, setOjb] = useState({ item1: '', item2: '' })
    function onSubmit(values: any) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
        })
    }

    return <LayoutAdmin>
        <Container maxW={'container.xl'} py='1' bgColor={bgColor}>
            <Stack direction={'row'} mb='4'>
                {!load && <Spinner />}
                <Heading size={'xl'}>Edit product</Heading>
                <Button onClick={() => console.log(product)}>Click</Button>
            </Stack>
            {product && <form onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                    <GridItem colSpan={{ base: 3, md: 2 }}>
                        <Stack gap='4'>
                            <FormControl>
                                <Input {...register('name', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                })}
                                    id='name' type='text' bg='white' />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                                <FormHelperText>
                                    Link:
                                    <Link href={`${host}/product/${product.slug}`}>{` ${host}/product/${product.slug}`}</Link>
                                </FormHelperText>
                            </FormControl>
                             <Stack p={2}
                                spacing={1}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                direction={'column'}
                                rounded='md'>
                                <Heading size={'xs'} mb='1'>SHORT DESCRIPTION</Heading>
                                <EditorConvertToJSON onEditorStateChange={(e: any) => console.log(JSON.stringify(convertToRaw(e.getCurrentContent()), null, 4))} />
                            </Stack>
                            <Stack p={2}
                                spacing={1}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                height='60'
                                direction={'column'}
                                rounded='md'>
                                <Heading size={'xs'} >DATA PRODUCT</Heading>
                                <Tabs isLazy w={'full'} h={'full'} orientation='vertical' variant='line'>
                                    <TabList>
                                        <Tab>Price</Tab>
                                        <Tab>Stock</Tab>
                                        <Tab>Transport</Tab>
                                        <Tab>Properties</Tab>
                                        <Tab>Advanced</Tab>
                                    </TabList>
                                    <Divider orientation='vertical' />
                                    <TabPanels>
                                        <TabPanel py='1'>
                                            <FormControl isRequired>
                                                <FormLabel htmlFor='price' fontSize={'sm'}>Price (₫)</FormLabel>
                                                <Input size="sm" id='price' placeholder='Price product' />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel htmlFor='sale-price' fontSize={'sm'}>Sale price (₫)</FormLabel>
                                                <Input size="sm" id='sale-price' placeholder='Sale price product' />
                                            </FormControl>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>2</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>3</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>4</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>5</p>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Stack>
                            <Stack p={2}
                                spacing={1}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                direction={'column'}
                                rounded='md'>
                                <Heading size={'xs'} mb='1'>DESCRIPTION</Heading>
                                <EditorConvertToJSON onChange={(e: any) => console.log(e)} />
                            </Stack>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <Stack gap={4}>
                            <Stack
                                p={2}
                                spacing={2}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                rounded='md'>
                                <Heading size={'sm'}>INFO</Heading>
                                <Stack w='full' direction={'row'} alignItems='center'>
                                    <Icon as={BsFillEyeFill} />
                                    <Text>Status: </Text>
                                    <Select variant='unstyled' defaultValue={'published'} {...register('status')}>
                                        <option value='published'>Published</option>
                                        <option value='not released'>Not released</option>
                                    </Select>
                                </Stack>
                                <Stack direction={'row'} alignItems='center'>
                                    <Icon as={BsFillCalendarFill} />
                                    <Text>CreatedAt: {new Date(product.createdAt).toLocaleString()}</Text>
                                </Stack>
                                <Stack direction={'row'} alignItems='center'>
                                    <Icon as={BsFillCalendarCheckFill} />
                                    <Text>UpdatedAt: {new Date(product.updatedAt).toLocaleString()}</Text>
                                </Stack>
                                <Stack w={'full'} direction={'row'} alignItems='center' justifyContent={'space-between'}>
                                    <Link>Delete</Link>
                                    <Button type="submit">Update</Button>
                                </Stack>
                            </Stack>
                            <Stack
                                p={2}
                                spacing={2}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                rounded='md'>
                                <Heading size={'sm'}>CATEGORY</Heading>
                                <FormControl>
                                    <Controller
                                        name="categorys"
                                        control={control}
                                        render={({ field: { ref, ...rest } }) => (
                                            <CheckboxGroup {...rest}>
                                                <Stack spacing={2} direction={'column'}>
                                                    {category.result.map((item: any, i: number) => {
                                                        return <Checkbox key={i} value={item.name}>{item.name}</Checkbox>
                                                    })}
                                                </Stack>
                                            </CheckboxGroup>
                                        )}
                                        /* rules={{
                                            required: { value: true, message: "This is required." }
                                        }} */
                                    />
                                </FormControl>
                                <Accordion allowMultiple w='full' border={'none'} borderColor={"transparent"}>
                                    <AccordionItem>
                                        {({ isExpanded }) => (
                                            <>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box flex='1' textAlign='left'>
                                                            Add cagtegory
                                                        </Box>
                                                        {isExpanded ? (
                                                            <Icon as={BsDash} fontSize='12px' />
                                                        ) : (
                                                            <Icon as={BsPlus} fontSize='12px' />
                                                        )}
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <Stack direction={'row'}>
                                                        <Input defaultValue={ojb.item1} onChange={(e) => {
                                                            setOjb(prev => ({ ...prev, item1: e.target.value }))
                                                        }} />
                                                        <Button onClick={() => {
                                                            mutate('/api/product/category', { name: ojb.item1 }, false)
                                                        }}>Add</Button>
                                                    </Stack>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                </Accordion>
                            </Stack>
                            <Stack
                                p={2}
                                spacing={2}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                rounded='md'>
                                <Heading size={'sm'}>TAG PRODUCT</Heading>
                                <Stack direction={'row'}>
                                    <Input value={ojb.item2} onChange={(e) => setOjb(prev => ({ ...prev, item2: e.target.value }))} />
                                    <Button onClick={() => {
                                        if (!watch('tags')) {
                                            setValue('tags', [ojb.item2])
                                        } else {
                                            if (!watch('tags').includes(ojb.item2)) {
                                                setValue('tags', [...getValues('tags'), ojb.item2])
                                            }
                                        }
                                        setOjb(prev=>({...prev, item2: ''}))
                                    }}>Add</Button>
                                </Stack>
                                <Stack direction={'row'}>
                                    {watch('tags') && watch('tags', []).map(e => <Tag
                                        size={'sm'}
                                        key={e}
                                        borderRadius='full'
                                        variant='solid'
                                        colorScheme='green'
                                    >
                                        <TagLabel>{e}</TagLabel>
                                        <TagCloseButton onClick={()=>{
                                            if(watch('tags').length=1){
                                                if(watch('tags').includes(e))
                                                return setValue('tags', [])
                                            }
                                            return setValue('tags', [getValues('tags').filter(value=>value!=e)])
                                        }}/>
                                    </Tag>)}
                                </Stack>
                            </Stack>
                            <Stack
                                p={2}
                                spacing={2}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                rounded='md'>
                                <Heading size={'sm'}>IMAGE PRODUCT</Heading>
                                <Image width={'250px'} height={'250px'} layout='fixed' src='' alt="Image product"/>
                                {product.image.item ? <Link>add photo from gallery</Link>:<Link>Delete image</Link>}
                            </Stack>
                            <Stack
                                p={2}
                                spacing={2}
                                bg={'white'}
                                align="flex-start"
                                shadow={'md'}
                                rounded='md'>
                                <Heading size={'sm'}>ALBUM IMAGE</Heading>
                                {/* <Image/> */}
                                <Link>Add photo to product gallery</Link>
                            </Stack>
                        </Stack>
                    </GridItem>
                </Grid>
            </form>}
        </Container>
    </LayoutAdmin>
}

export default Action;