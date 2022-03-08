import { Box, chakra, Container, Link, SimpleGrid, Stack, Text, VisuallyHidden, Input, IconButton, useColorModeValue, } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import Logo from './Logo'

const SocialButton = ({ children, label, href, }: { children: ReactNode; label: string; href: string; }) => {
  return (
    <chakra.button
      bg={'whiteAlpha.300'}
      rounded={'lg'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithNewsletter() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')} boxShadow='xl'>
      <Container py='2' maxW={'container.xl'} bg='gray.100' borderTop='1px' borderColor={'gray.300'}>
        <Stack direction={{base: 'column',md:'row'}} alignItems={{base: 'inherit', md: 'center'}} >
          <Text w='full' >Hoạt động từ Thứ 2 - 7 Nghỉ CN : Mở cửa 8h - 17h</Text>
          <Stack direction={'row'} spacing={6} alignItems='start'>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaFacebook />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Stack>
      </Container>
      <Container as={Stack} maxW={'container.xl'} pt={6}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue('gray.700', 'white')} />
              <Text fontSize={'sm'} mt='2'>
                NextShop2 nơi bạn tìm kiếm được những phong cách của chính mình. Chúng tôi mang đến các sản phẩm đi theo xu hướng giới trẻ.
              </Text>
              <Text fontSize={'sm'} mt='2'>Tối giản, phong cách, mới mẻ, chất liệu mang lại cảm giác thoải mái cho người sử dụng.</Text>
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Liên kết</ListHeader>
            <Link href={'#'}>Giới thiệu</Link>
            <Link href={'#'}>Tin tức</Link>
            <Link href={'#'}>Liên hệ</Link>
            <Link href={'#'}>Tuyển dụng</Link>
            <Link href={'#'}>Đối tác</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Hổ trợ</ListHeader>
            <Link href={'#'}>Trung tâm hổ trợ</Link>
            <Link href={'#'}>Điều khoản dịch vụ</Link>
            <Link href={'#'}>Chính sách bảo mật</Link>
            <Link href={'#'}>Vận chuyển</Link>
            <Link href={'#'}>Liên kết nhà bán hàng</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Nhận các thông tin ưu đãi</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Nhập email của bạn tại đây'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
        <Text fontSize={'sm'} py='6' mt='6'>
          Copyright © 2022 NextShop2 - Powered by Ruxx28
        </Text>
      </Container>
    </Box>
  );
}