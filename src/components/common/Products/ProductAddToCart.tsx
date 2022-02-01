import { Flex, Circle, Box, Image, Badge, useColorModeValue, Text, Button, AspectRatio } from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

const data = {
    isNew: true,
    imageURL:
        'https://yourlimit2-9ede08.ingress-baronn.easywp.com/wp-content/uploads/2021/12/shop-item-1_optimized.webp',
    name: 'Wayfarer Classic',
    price: 45000,
    sale: {
        price: 1000,
        date: '22/11/2013'
    },
    rating: 4.2,
    numReviews: 34,
};

interface RatingProps {
    rating: number;
    numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
    return (
        <Box d="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={i < rating ? '#F7DC6F' : '#FCF3CF'}
                            />
                        );
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }}  />;
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} color={'#F7DC6F'} />;
                })}
            <Box as="span" ml="2" mt='8px' color="gray.600" fontSize="sm">
                {numReviews} đánh giá
            </Box>
        </Box>
    );
}

function ProductAddToCart({value}:{value:any}) {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            rounded="sm"
            shadow="sm"
            position="relative">
            {data.isNew && (
                <Badge variant='solid' px='2' py='1' colorScheme='green' position="absolute" top={3} left={3}>
                    Sale!
                </Badge>
            )}

            <AspectRatio ratio={3 / 4}>
                <Image src={data.imageURL} alt={`Picture of ${data.name}`} rounded="sm" />
            </AspectRatio>
            <Box pt='3' pb='2'>

                <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box
                        fontSize="lg"
                        as="h4"
                        isTruncated>
                        {data.name}
                    </Box>
                </Flex>

                <Flex justifyContent="start" gap='10px' alignItems='end' mt='5px'>

                    <Box fontSize="18px" fontWeight='semibold' color={useColorModeValue('gray.800', 'white')}>
                        {String(true ? data.sale.price : data.price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        <Box as="span" color={'gray.600'} fontSize="lg">₫ </Box>
                    </Box>
                    {true ? <Text fontWeight='semibold' textDecoration={'line-through'} color={'gray.300'}>
                        {String(data.price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}
                        <Box as="span">₫</Box>
                    </Text> : ''}
                </Flex>

                <Rating rating={data.rating} numReviews={data.numReviews}/>
                <Button>Thêm vào giở hàng</Button>
            </Box>
        </Box>

    );
}

export default ProductAddToCart;