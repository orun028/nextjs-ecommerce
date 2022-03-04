import Rating from '@/components/ui/Rating';
import { Flex, Box, Badge, useColorModeValue, Text, AspectRatio, Link } from '@chakra-ui/react';
import NextLink from "next/link"
import Image from 'next/image'
import { numberToPrice } from '@/utils/format'

function checkTypeSale({ price, isSale }: { price: number, isSale: { type: string, value: number } }) {
    if (isSale.type === "value") return isSale.value;
    if (isSale.type === "percent") return (price - (price * isSale.value / 100));
    return 0;
}

function ProductAddToCart({ value }: { value: any }) {
    const { isSale, name, price, _id, image, slug } = value
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
            <NextLink href='/product/[slug]' as={`/product/${encodeURIComponent(slug)}`}>
                <Link>
                    <Image
                        objectFit="cover"
                        className='hoverImage'
                        src={image.item}
                        alt={`Picture of ${name}`}
                        width="300px"
                        height="300px"
                        layout='intrinsic' />
                </Link>
            </NextLink>
            <Box pt='3' pb='2'>
                <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <NextLink href='/product/[slug]' as={`/product/${encodeURIComponent(slug)}`} >
                        <Text as={Link} noOfLines={[1, 2, 3]}>{name}</Text>
                    </NextLink>
                </Flex>
                <Flex justifyContent="start" gap='10px' alignItems='end' mt='5px'>
                    <Box fontSize="16px" fontWeight='semibold' color={'gray.800'}>
                        {numberToPrice(isSale.status 
                            ? checkTypeSale({ price, isSale }) 
                            : price)}
                    </Box>
                    {isSale.status
                        && <Text fontSize='14px' fontWeight='semibold' textDecoration={'line-through'} color={'gray.300'}>
                            {numberToPrice(price)}
                        </Text>}
                </Flex>
                <Rating rating={4.2} numReviews={34} />
            </Box>
        </Box>

    );
}

export default ProductAddToCart;