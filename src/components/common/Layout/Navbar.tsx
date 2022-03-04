import { Image, Container, Box, Flex, Text, IconButton, Stack, Collapse, Icon, Link, Popover, PopoverTrigger, PopoverContent, Badge, PopoverBody, PopoverFooter, useDisclosure, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsList, BsX, BsChevronDown, BsChevronUp, BsPersonCircle } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { useAppSelector } from '@/hook/redux';
import { numberToPrice } from '@/utils/format';
import { getTotalPrice } from '@/utils/cart';
import { NLink } from '@/components/ui';
import { Logo, SearchBar } from '@/components/common'
import { useRouter } from 'next/router';
import { signOut, useSession } from "next-auth/react"
import clsx from 'clsx';

export default function WithSubnavigation() {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const { isOpen, onToggle } = useDisclosure();
    const cart = useAppSelector(state => state.cart)
    const getItemsCount = () => {
        return cart.reduce((accumulator: number, item: { quantity: number; }) => accumulator + item.quantity, 0);
    };
    const TotalCart = numberToPrice(getTotalPrice(cart))

    return (
        <Box borderBottom={1} borderStyle={'solid'} borderColor={'gray.200'} bg={'white'} shadow='sm'>
            <Container
                as={Flex}
                maxW={'container.xl'}
                color={'gray.600'}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}>
                <NLink href={'/'}> <Logo w='16.66666666666667%' /> </NLink>
                <Flex flex={{ base: 1 }} justify={{ base: 'start' }}>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <SearchBar />
                    </Flex>
                </Flex>

                <Stack
                    direction={'row'}
                    spacing={6} alignItems='center'>
                    <DesktopNav />
                    <NLink href='/cart'>
                        <Stack as={Box} direction={'row'} spacing={2} position='relative' shadow='md' rounded='md' p='2'>
                            <Text fontSize='13px' fontWeight='medium'>{TotalCart}</Text>
                            <Icon as={FiShoppingBag} w={'5'} h={'5'} />
                            <Badge
                                px='1.5' py='1px'
                                rounded='full'
                                position="absolute"
                                top={0.5}
                                right={-1}
                                variant='solid'
                                colorScheme='green'
                                fontSize='9px'>
                                {getItemsCount()}
                            </Badge>
                        </Stack>
                    </NLink>
                    <Stack direction={'row'} spacing={6} alignItems='center' display={{ base: 'none', md: 'flex' }}>

                        <Stack spacing={'1'} direction={'row'}>
                            {!session && (
                                <NLink href={'/auth'} chackraLink={{ textDecoration: 'underline' }}>
                                    Đăng nhập
                                </NLink>
                            )}
                            {session?.user && (
                                <>
                                    {session.user.image && (
                                        <Menu isLazy size={'sm'}>
                                            <MenuButton>
                                                <Image
                                                    borderRadius='md'
                                                    shadow='md'
                                                    src={session.user.image}
                                                    alt={`Img ${session.user.name}`}
                                                    boxSize='40px'
                                                    objectFit='cover' />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem>
                                                <NLink href='/user'>Trang cá nhân</NLink>
                                                </MenuItem>
                                                <MenuItem onClick={(e) => {
                                                    e.preventDefault()
                                                    signOut()
                                                }}>Đăng xuất</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    )}
                                </>
                            )}
                        </Stack>
                    </Stack>

                </Stack>
                <Flex
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen
                                ? <Icon as={BsX} w={10} h={10} />
                                : <Icon as={BsList} w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'} />
                </Flex>
            </Container>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const router = useRouter()
    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => {
                const classN = clsx(router.pathname == navItem.href && 'desktopNav-active')
                return (
                    <Box key={navItem.label}>
                        <Popover trigger={'hover'} placement={'bottom-start'}>
                            <PopoverTrigger>
                                <Box role='button'>
                                    <NLink href={navItem.href ?? '#'}
                                        chackraLink={{
                                            className: classN,
                                            padding: '2',
                                            fontSize: 'sm',
                                            fontWeight: '500',
                                            color: 'gray.600',
                                            _hover: { color: 'gray.800' }
                                        }}>
                                        {navItem.label}
                                    </NLink>
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
                )
            })}
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