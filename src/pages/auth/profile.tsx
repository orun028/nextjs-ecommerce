import { Layout } from "@/components/common";
import { Container } from "@chakra-ui/react";
import { NextPage } from "next";
import { withProtected } from '@/hook/route'
import { Text, Button } from '@chakra-ui/react'

const ProfilePage: NextPage = ({ auth }: any) => {
    const { user, logout } = auth;
    return (
        <Layout>
            <Container maxW='container.xl' py='8'>
                <Text>{user?.displayName}</Text>
                <Button onClick={logout}>Đăng xuất</Button>
            </Container>
        </Layout>
    )
}

export default withProtected(ProfilePage);