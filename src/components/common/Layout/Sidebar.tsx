import { Flex, Stack, Text, Container, Box } from "@chakra-ui/react";
import NextLink from 'next/link'

const Sidebar = () => {
    return <Box shadow={'md'}>
        <Container maxW={'container.xl'}>
            <Stack justifyContent={'space-between'} direction='row' py='4'>
                <Flex gap={'6'}>
                    <NextLink href='/admin'>Home</NextLink>
                    <NextLink href='/admin/product'>Product</NextLink>
                    <NextLink href='/admin/category'>Category</NextLink>
                    <NextLink href='/admin/images'>Images</NextLink>
                </Flex>
                <Flex>
                    <Text>Acccount</Text>
                </Flex>
            </Stack>
        </Container>
    </Box>
}

export default Sidebar;