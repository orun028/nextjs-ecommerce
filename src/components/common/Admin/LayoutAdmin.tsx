import React, { ReactNode } from 'react';
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure, BoxProps, FlexProps, Stack, Menu, MenuButton, MenuList, MenuItem, Button, MenuGroup, MenuDivider, MenuItemOption, MenuOptionGroup, DrawerOverlay, Spacer, } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { BsChevronExpand } from 'react-icons/bs';
import Image from 'next/image'
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import clsx from 'clsx';
interface LinkGroupItem {
    name: string;
    type: string;
    icon?: IconType;
    link?: string;
}

interface LinkItemProps {
    name: string;
    type: string;
    icon?: IconType;
    link?: string;
    align?: string;
    children?: LinkGroupItem[]
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', type: 'item', icon: FiHome, link: '/admin' },
    {
        name: 'YOUR TAB', type: 'group', children: [
            { name: 'Images', type: 'item', icon: FiTrendingUp, link: '/admin/images' },
            { name: 'Product', type: 'item', icon: FiCompass, link: '/admin/product' },
        ]
    },
    { name: 'Settings', type: 'item', icon: FiSettings, link: '#', align: 'end' },
];


export default function SimpleSidebar({ children }: { children: ReactNode }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={'gray.50'}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}


const SidebarContent = ({ ...rest }) => {
    const router = useRouter()
    return (
        <Box
            bg={'blackAlpha.900'}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx='2' justifyContent="space-between">
                <Menu>
                    <MenuButton w='full' h={'50px'} as={Button} rightIcon={<BsChevronExpand />}>
                        <Stack w='full' direction={'row'} justifyContent='flex-start'>
                            <Image src='/image/Screenshot_20190310-110316_dotpict.jpg'
                                width={'35px'}
                                height={'35px'}
                                layout='fixed'
                                className='border-radius' alt='Image user' />
                            <Stack justifyContent={'center'} alignItems={'flex-start'} spacing={'-0.5'}>
                                <Text fontSize={'md'}> Admin UI </Text>
                                <Text fontSize='xx-small' color='darkgray'>ID 1231254</Text>
                            </Stack>
                        </Stack>

                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup title='ruxx28@next-shop2.io' defaultValue='1' type='radio'>
                            <MenuItemOption value='1'>Default theme</MenuItemOption>
                            <MenuItemOption value='2'>Dark theme</MenuItemOption>
                        </MenuOptionGroup>
                        <MenuDivider />
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Add an account</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => console.log(router.pathname)}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            {LinkItems.map((i) => {
                if (i.type == 'group' && i.children && i.children.length > 0) {
                    let ea: JSX.Element[] = [(<Text key={i.name} mx='2' mt='4' color={'darkgray'} fontSize='sm' fontWeight='medium' letterSpacing={'widest'}>{i.name}</Text>)]
                    i.children.map(e =>
                        ea.push(<NavItem key={e.name} icon={e.icon} link={e.link} className={clsx(router.pathname == e.link ? 'sidebar-linkAdmin-active' : '')}>
                            {e.name}
                        </NavItem>
                        )
                    )
                    return ea;
                }
                if (i.align == 'end') {
                    let ew: JSX.Element[] = [(<Spacer key={i.name+'flex-end'} />)]
                    ew.push(<NavItem key={i.name} icon={i.icon} link={i.link} className={clsx(router.pathname == i.link ? 'sidebar-linkAdmin-active' : '')}>
                        {i.name}
                    </NavItem>)
                    return ew;
                }

                return <NavItem key={i.name} icon={i.icon} link={i.link} className={clsx(router.pathname == i.link ? 'sidebar-linkAdmin-active' : '')}>
                    {i.name}
                </NavItem>
            }
            )}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    link?: string;
    icon?: IconType;
    children: ReactText;
}
const NavItem = ({ link, icon, children, ...rest }: NavItemProps) => {
    return (
        <NextLink href={link ? link : '#'}>
            <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    align="center"
                    p="2"
                    my="2"
                    mx="2"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    color={'darkgray'}
                    _hover={{
                        bg: 'whiteAlpha.200',
                        color: 'white'
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="2"
                            fontSize="16"
                            color={'darkgray'}
                            _groupHover={{
                                color: 'white',
                            }}
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Link>
        </NextLink>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>

            <Stack w='full' justifyContent={'space-between'} direction='row'>
                <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <IconButton
                    variant="outline"
                    onClick={onOpen}
                    aria-label="open menu"
                    icon={<FiMenu />}
                />
            </Stack>
        </Flex>
    );
};