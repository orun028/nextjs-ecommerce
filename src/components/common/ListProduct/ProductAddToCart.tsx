import Rating from '@/components/ui/Rating';
import { Flex, Box, Badge, useColorModeValue, Text, AspectRatio, Link } from '@chakra-ui/react';
import NextLink from "next/link"
import Image from 'next/image'

function checkTypeSale({ price, isSale }: { price: number, isSale: { type: string, value: number } }) {
    if (isSale.type === "value") { return isSale.value; }
    if (isSale.type === "percent") {
        return (price - (price * isSale.value / 100))
    }
}

function ProductAddToCart({ value }: { value: any }) {
    const { isSale, name, price, slug, _id, image } = value
    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            rounded="sm"
            shadow="sm"
            position="relative">
            {isSale.status && (
                <Badge zIndex={'banner'} variant='solid' px='2' py='1' colorScheme='green' position="absolute" top={3} left={3}>
                    Sale!
                </Badge>
            )}
                <NextLink
                    href='/product/[id]'
                    as={`/product/${encodeURIComponent(_id)}`}>
                    <Link>
                        <Image 
                        objectFit="cover"
                        className='hoverImage'
                        src={image.item} 
                        alt={`Picture of ${name}`}
                        width="300px"
                        height="300px"
                        layout='intrinsic'
                         />
                    </Link>
                </NextLink>
            <Box pt='3' pb='2'>
                <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <NextLink
                        href='/product/[id]'
                        as={`/product/${encodeURIComponent(_id)}`}
                    >
                        <Text as={Link} noOfLines={[1, 2, 3]}>{name}</Text>
                    </NextLink>
                </Flex>
                <Flex justifyContent="start" gap='10px' alignItems='end' mt='5px'>
                    <Box fontSize="18px" fontWeight='semibold' color={useColorModeValue('gray.800', 'white')}>
                        {String(isSale.status ? checkTypeSale({ price, isSale }) : price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        <Box as="span" color={'gray.600'} fontSize="lg">₫ </Box>
                    </Box>
                    {isSale.status ? <Text fontWeight='semibold' textDecoration={'line-through'} color={'gray.300'}>
                        {String(price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        <Box as="span">₫</Box>
                    </Text> : ''}
                </Flex>
                <Rating rating={4.2} numReviews={34} />
                {/* <Button>Thêm vào giở hàng</Button> */}
            </Box>
        </Box>

    );
}

export default ProductAddToCart;