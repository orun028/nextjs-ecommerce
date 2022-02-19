import { Container, Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Link, Popover, PopoverTrigger, PopoverContent, useColorModeValue, Badge, PopoverBody, PopoverFooter, Image, ButtonGroup, useDisclosure, calc } from '@chakra-ui/react';
import { BsList, BsX, BsChevronDown, BsChevronUp, BsPhone, BsPeople, BsPersonCircle } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import NextLink from "next/link"
import { useAppSelector } from '@/lib/redux/hook';
import Logo from './Logo'
import SearchBar from './SearchBar';

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const cart = useAppSelector(state => state.cart)
    const getItemsCount = () => {
        return cart.reduce((accumulator: any, item: { quantity: any; }) => accumulator + item.quantity, 0);
    };

    return (
        <Box
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={'gray.200'}
            bg={'white'}
            shadow='sm'>
            <Container
                as={Flex}
                maxW={'container.xl'}
                color={'gray.600'}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}>
                <NextLink href={'/'}>
                    <Link>
                    <Logo w='16.66666666666667%' />
                    </Link>
                </NextLink>
                <Flex flex={{ base: 1 }} justify={{ base: 'start' }}>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <SearchBar />

                    </Flex>
                </Flex>

                <Stack
                    direction={'row'}
                    spacing={6} alignItems='center'>
                    <Stack direction={'row'} spacing={6} alignItems='center' display={{ base: 'none', md: 'flex' }}>
                        <Stack spacing={'1'} direction={'row'} display={{ base: 'none', lg: 'flex' }}>
                            <Icon as={BsPhone} fontSize='xl' />
                            <Text fontSize={'sm'}> 0123 123 132 </Text>
                        </Stack>
                        <Stack spacing={'1'} direction={'row'}>
                            <Icon as={BsPersonCircle} fontSize='xl' />
                            <Link as={'a'} fontSize={'sm'} fontWeight={400}> Tài khoản </Link>
                        </Stack>
                    </Stack>


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
                                    {getItemsCount()}
                                </Badge>
                                <Text fontSize='13px' fontWeight='medium'>180,000₫</Text>
                            </Stack>
                        </Link>
                    </NextLink>
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
    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box role='button'>
                                <NextLink href={navItem.href ?? '#'}>
                                    <Link
                                        p={2}
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        color={'gray.600'}
                                        _hover={{
                                            textDecoration: 'none',
                                            color: 'gray.800',
                                        }}>
                                        {navItem.label}
                                    </Link>
                                </NextLink>
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={'white'}
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
            _hover={{ bg: 'pink.50' }}>
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
            bg={'white'}
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
                    color={'gray.600'}>
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
                    borderColor={'gray.200'}
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
        href: '/product',
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
        href: 'post',
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
    }
];