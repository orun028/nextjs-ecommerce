import { Container, Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Link, Popover, PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure, Badge, PopoverBody, PopoverFooter, Image, ButtonGroup } from '@chakra-ui/react';
import { BsList, BsX, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import NextLink from "next/link"

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            bg={useColorModeValue('white', 'gray.800')}
            shadow='sm'>
            <Container
                as={Flex}
                maxW={'container.xl'}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}>

                <Flex flex={{ base: 1 }} justify={{ base: 'start' }}>
                    <Text
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        Logo
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    direction={'row'}
                    spacing={6}>
                    <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}> Sign In </Button>
                    <Popover trigger='hover'>
                        <PopoverTrigger>
                            <Box role='button'>
                                <NextLink href='/cart'>
                                    <Link>
                                        <Stack as={Box} direction={'row'} spacing={2} position='relative'>
                                            <Icon as={FiShoppingBag} w={'5'} h={'5'} />
                                            <Badge
                                                px='1.5' py='1px'
                                                rounded='full'
                                                position="absolute"
                                                top={-1.5}
                                                left={1}
                                                variant='solid'
                                                colorScheme='green'
                                                fontSize='9px'>
                                                1
                                            </Badge>
                                            <Text fontSize='13px' fontWeight='medium'>180,000₫</Text>
                                        </Stack>
                                    </Link>
                                </NextLink>
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent w={'310px'} bg='#29333C' color='white' borderColor='transparent'>
                            <PopoverBody>
                                <Flex align={'center'} gap='2' py='2' borderBottom='1px' borderColor='gray.600'>
                                    <Image
                                        loading='lazy'
                                        alt='Item cart'
                                        boxSize='100px'
                                        objectFit='scale-down'
                                        src='https://yourlimit2-9ede08.ingress-baronn.easywp.com/wp-content/uploads/2021/12/shop-item-1_optimized.webp' />
                                    <Stack flex='1' direction='column'>
                                        <NextLink href='#' passHref>
                                            <Text as={Link} fontSize='md' fontWeight='medium'>Wayfarer Classic</Text>
                                        </NextLink>
                                        <Text fontSize='sm'>1 x 180,000₫</Text>
                                    </Stack>
                                    <Box>
                                        <Icon
                                            _hover={{ color: "teal.500" }}
                                            as={BsX}
                                            w={5}
                                            h={5}
                                            onClick={() => { }}
                                            aria-label={'Remove item cart'} />
                                    </Box>
                                </Flex>
                            </PopoverBody>
                            <PopoverFooter borderColor={'transparent'}>
                                <Stack direction='column' gap='8px'>
                                    <Flex fontWeight={'bold'} justify={'space-between'} align={'center'} >
                                        <Text>Tính tạm:</Text>
                                        <Text>180,000₫</Text>
                                    </Flex>
                                    <ButtonGroup d='flex' justifyContent='space-between'>
                                        <Button colorScheme='green'>Xem giỏ hàng</Button>
                                        <Button variant='outline'>Thanh toán</Button>
                                    </ButtonGroup>
                                </Stack>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </Stack>
                <Flex
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <Icon as={BsX} w={10} h={10} /> : <Icon as={BsList} w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
            </Container>


            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
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
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
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
                    <Icon color={'pink.400'} w={5} h={5} as={BsChevronUp} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={BsChevronDown}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Trang chủ',
        href: '/',
    },
    {
        label: 'Sản phẩm',
        href: '/san-pham',
        children: [
            {
                label: 'Áo phông',
                subLabel: 'Trending Design to inspire you',
                href: '#',
            },
            {
                label: 'Phụ kiện',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    },
    {
        label: 'Bài viết',
        href: 'bai-viet',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'Liên hệ',
        href: 'lien-he',
    }
];