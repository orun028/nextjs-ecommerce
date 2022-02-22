import { Box, IconButton, List, ListIcon, ListItem, Stack, useBreakpointValue, Text, Grid, GridItem, Icon, Popover, PopoverContent, PopoverTrigger, Link, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { BsChevronRight, BsFillBrightnessAltHighFill, BsList } from "react-icons/bs";
import Slider from 'react-slick';
import Hero from "./Hero";
import NextLink from 'next/link'
const settings = {
    dots: true,
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
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const SlideWithCategory = () => {

    const [slider, setSlider] = useState<Slider | null>(null);

    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '10px' });

    // These are the images used in the slide
    const cards = [
        'https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
        'https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
        'https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    ];
    const CATE_ITEMS: Array<NavItem> = [
        {
            label: 'Giảm nhiều nhất',
            href: '#',
        }, {
            label: 'Phổ biến nhất',
            href: '#',
        }, {
            label: 'Phần thân trên',
            href: '#',
            children: [
                {
                    label: 'Explore Design Work',
                    subLabel: 'Trending Design to inspire you',
                    href: '#',
                },
                {
                    label: 'New & Noteworthy',
                    subLabel: 'Up-and-coming Designers',
                    href: '#',
                },
            ],
        }, {
            label: 'Phần thân dưới',
            href: '#',
            children: [
                {
                    label: 'Explore Design Work',
                    subLabel: 'Trending Design to inspire you',
                    href: '#',
                },
                {
                    label: 'New & Noteworthy',
                    subLabel: 'Up-and-coming Designers',
                    href: '#',
                },
            ],
        }, {
            label: 'Phụ kiện',
            href: '#',
            children: [
                {
                    label: 'Explore Design Work',
                    subLabel: 'Trending Design to inspire you',
                    href: '#',
                },
                {
                    label: 'New & Noteworthy',
                    subLabel: 'Up-and-coming Designers',
                    href: '#',
                },
            ],
        }, {
            label: 'Quà tặng',
            href: '#',
        },
    ];
    return <Grid templateColumns={'repeat(5,1fr)'} gap={2} h={{ base: '600px', md: '400px' }}>
        <GridItem colSpan={{ base: 0, lg: 1 }} display={{ base: 'none', lg: 'block' }}>
            <Stack h={'400'} direction={'column'} /* border='1px' borderColor='gray.300'  */ rounded='md' shadow={'md'} >
                <NextLink href={'/product'}>
                    <Link style={{ textDecoration: 'none' }}>
                        <Stack direction={'row'} alignItems='center' p='3' fontWeight={500} bg='green.500' color='white' rounded='md' shadow={'md'}>
                            <Icon as={BsList} />
                            <Text w={'full'}>  Danh mục sản phẩm </Text>
                        </Stack>
                    </Link>
                </NextLink>
                <List>
                    {CATE_ITEMS.map((navItem) => (
                        <Box key={navItem.label} >
                            <Popover trigger={'hover'} placement={'right-start'}>
                                <PopoverTrigger>
                                    <Link
                                        href={navItem.href ?? '#'}
                                        role={'group'}
                                        display={'block'}
                                        p={3}
                                        rounded={'md'}
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        _hover={{ bg: 'green.50', shadow: 'sm' }}>
                                        <Stack direction={'row'} align={'center'}>
                                            <Box>
                                                <ListItem >
                                                    <ListIcon as={BsFillBrightnessAltHighFill} color='green.500' />
                                                    {navItem.label}
                                                </ListItem>
                                            </Box>
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
                                                <DesktopSubNav key={child.label} {...child} />
                                            ))}
                                        </Stack>
                                    </PopoverContent>
                                )}
                            </Popover>
                        </Box>
                    ))}
                </List>
            </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 5, lg: 4 }}>
            {/* <Grid
                h={{ base: '600px', md: '400px'}}
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(8, 1fr)' gap={2} >
                <GridItem colSpan={{ base: 8, md: 6 }} rowSpan={{ base: 1, md: 2 }}> */}
            <Box
                rounded={'md'}
                position={'relative'}
                height={'400px'}
                width={'full'}
                overflow={'hidden'}>
                {/* CSS files for react-slick */}
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                {/* Left Icon */}
                {/* <IconButton
                            aria-label="left-arrow"
                            bg="blackAlpha"
                            color='whiteAlpha'
                            _hover={{ bg: 'whiteAlpha', color: 'blackAlpha' }}
                            borderRadius="full"
                            position="absolute"
                            left={side}
                            top={top}
                            transform={'translate(0%, -50%)'}
                            zIndex={2}
                            onClick={() => slider?.slickPrev()}>
                            <BiLeftArrowAlt />
                        </IconButton> */}
                {/* Right Icon */}
                {/* <IconButton
                            aria-label="right-arrow"
                            bg="blackAlpha"
                            color='whiteAlpha'
                            _hover={{ bg: 'whiteAlpha', color: 'blackAlpha' }}
                            borderRadius="full"
                            position="absolute"
                            right={side}
                            top={top}
                            transform={'translate(0%, -50%)'}
                            zIndex={2}
                            onClick={() => slider?.slickNext()}>
                            <BiRightArrowAlt />
                        </IconButton> */}
                {/* Slider */}
                <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                    {cards.map((url, index) => (
                        <Box
                            key={index}
                            height={'400px'}
                            position="relative"
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover"
                        /* backgroundImage={`url(${url})`} */
                        >
                            <Hero />
                        </Box>
                    ))}
                </Slider>
            </Box>
            {/* </GridItem>
                <GridItem colSpan={{ base: 4, md: 2}}>
                    <Box bg='gray.300' h={{ base: '200px', md: '100%' }} rounded={'md'}>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 2}}>
                    <Box bg='gray.300' h={{ base: '200px', md: '100%' }} rounded={'md'}>
                    </Box>
                </GridItem>
            </Grid> */}
        </GridItem>
    </Grid>
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
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