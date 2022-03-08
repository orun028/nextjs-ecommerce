import { Box, IconButton, Stack, useBreakpointValue, Text, Grid, GridItem, Icon, Popover, PopoverContent, PopoverTrigger, Link, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronRight, BsList } from "react-icons/bs";
import Slider from 'react-slick';
import NextLink from 'next/link'
import { FiAward, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaFire, FaRedhat, FaKiwiBird, FaGlasses, FaGift } from "react-icons/fa";
import { RiTShirt2Line } from "react-icons/ri";
import Image from "./Image";


const settings = {
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};
interface NavItem {
    label: string;
    ico?: any;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const SlideWithCategory = () => {

    const [slider, setSlider] = useState<Slider | null>(null);

    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '50%', md: '50%' });
    const side = useBreakpointValue({ base: '1%', md: '10px' });
    const widthImage = useBreakpointValue({ base: 900, md: 850, lg: 950});
    const heightImage = useBreakpointValue({ base: 460, md: 450, lg: 650 });

    // These are the images used in the slide
    const cards = [
        `https://res.cloudinary.com/dpgvup3wu/image/upload/v1646633642/layout/td47nnuikufggjnynnhj.png`,
        `https://res.cloudinary.com/dpgvup3wu/image/upload/v1646633642/layout/dxk8httsxtfillkhg3rx.png`
    ];
    const CATE_ITEMS: Array<NavItem> = [
        {
            label: 'Giảm nhiều nhất',
            ico: <FaFire />,
            href: '#',
        }, {
            label: 'Phổ biến nhất',
            ico: <FiAward />,
            href: '#',
        }, {
            label: 'Nón, mũ len',
            ico: <FaRedhat />,
            href: '#',
        }, {
            label: 'Áo phông, sơ mi',
            ico: <RiTShirt2Line />,
            href: '#',
            children: [
                {
                    label: 'Hoodie',
                    subLabel: 'Vải mát không rụng lông',
                    href: '#',
                },
                {
                    label: 'Áo thun họa tiết',
                    subLabel: '100% cotton mềm mượt mát',
                    href: '#',
                },
            ],
        }, {
            label: 'Quần kaki, jean',
            href: '#',
            ico: <FaKiwiBird />,
        }, {
            label: 'Giày, dép',
            ico: <FaGift />,
            href: '#',
        }, {
            label: 'Phụ kiện',
            href: '#',
            ico: <FaGlasses />
        }
    ];
    return <Grid templateColumns={'repeat(7,1fr)'} gap={6} h={{ base: 'full', md: '400px', lg: '450px' }}>
        <GridItem colSpan={{ base: 0, lg: 2 }} display={{ base: 'none', lg: 'block' }}>
            <Stack h={'450px'} direction={'column'} >
                <Text textAlign={'start'} px='6' py='3' bg='gray.100' rounded='md' shadow={'md'} fontWeight='medium'>
                    Liên hệ: 0123 123 123
                </Text>
                <Stack h='full' direction={'column'} shadow={'md'} rounded='md' >
                    <NextLink href={'/product'}>
                        <Link style={{ textDecoration: 'none' }}>
                            <Stack direction={'row'} alignItems='center' px='6' py='3' fontWeight={500} bg='green.500' color='white' rounded='md' shadow={'md'}>
                                <Icon as={BsList} />
                                <Text w={'full'}>  Danh mục sản phẩm </Text>
                            </Stack>
                        </Link>
                    </NextLink>
                    <Box >
                        {CATE_ITEMS.map((navItem) => (
                            <Box key={navItem.label} >
                                <Popover trigger={'hover'} placement={'right-start'}>
                                    <PopoverTrigger>
                                        <Link
                                            href={navItem.href ?? '#'}
                                            role={'group'}
                                            display={'block'}
                                            px='6' py='3'
                                            rounded={'md'}
                                            fontSize={'sm'}
                                            fontWeight={500}
                                            _hover={{ bg: 'green.50', shadow: 'sm' }}>
                                            <Stack direction={'row'} align={'center'}>
                                                <Stack direction={'row'} align={'center'}>
                                                    {navItem.ico}
                                                    <Text>{navItem.label}</Text>
                                                </Stack>
                                                {navItem.children && <Flex
                                                    transition={'all .3s ease'}
                                                    transform={'translateX(-10px)'}
                                                    opacity={0}
                                                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                                                    justify={'flex-end'}
                                                    align={'center'}
                                                    flex={1}>
                                                    <Icon color={'green.400'} w={5} h={5} as={BsChevronRight} />
                                                </Flex>}
                                            </Stack>
                                        </Link>
                                    </PopoverTrigger>

                                    {navItem.children && (
                                        <PopoverContent
                                            border={0}
                                            boxShadow={'xl'}
                                            bg={'white'}
                                            p={4}
                                            rounded={'sm'}
                                            minW={'sm'}>
                                            <Stack>
                                                {navItem.children.map((child) => (
                                                    <CategorySubNav key={child.label} {...child} />
                                                ))}
                                            </Stack>
                                        </PopoverContent>
                                    )}
                                </Popover>
                            </Box>
                        ))}
                    </Box>
                </Stack>
            </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 7, lg: 5 }}>
            <Box
                rounded={'md'}
                position={'relative'}
                height={{ base: 'full', md: '400px', lg: '450px' }}
                width={'full'}
                overflow={'hidden'}>
                {/* CSS files for react-slick */}
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                
                <IconButton
                    color={'gray.300'}
                    aria-label="left-arrow"
                    variant="ghost"
                    position="absolute"
                    left={side}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickPrev()}>
                    <FiChevronLeft size="40px" />
                </IconButton>{/* Left Icon */}
                <IconButton
                    color={'gray.300'}
                    aria-label="right-arrow"
                    variant="ghost"
                    position="absolute"
                    right={side}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickNext()}>
                    <FiChevronRight size="40px" />
                </IconButton>{/* Right Icon */}
                <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                    {cards.map((url, index) => (
                        <Box
                            key={index}
                            height={'full'}
                            position="relative"
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover" >
                            <Image src={url} layout='responsive' width={widthImage} height={heightImage} alt={`Image slide ${index}`}/>
                        </Box>
                    ))}
                </Slider> {/* Slider */}
            </Box>
        </GridItem>
    </Grid>
}

const CategorySubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: 'green.50' }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'green.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'green.400'} w={5} h={5} as={BsChevronRight} />
                </Flex>
            </Stack>
        </Link>
    );
};

export default SlideWithCategory;