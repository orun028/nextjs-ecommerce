import { useSession } from "next-auth/react"
import { Layout } from "@/components/common"
import { Box, useColorModeValue, Avatar, Heading, Stack, Badge, Button, Text, Link } from "@chakra-ui/react"

export default function MePage() {
    const { data } = useSession()

    return (
        <Layout>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Layout>
    )
}