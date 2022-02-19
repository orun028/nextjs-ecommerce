import { Box, Grid, GridItem, Link, Stack, Text } from "@chakra-ui/react";

interface Props {
    title: string, layout: string, data: any[]
}

const ListPost = ({ title, layout, data }: Props) => {
    return (<Box maxW="full" >
        <Stack direction={'row'} justifyContent='space-between' alignItems={'center'}>
            <Text fontSize={'3xl'} pb={4} fontWeight={'medium'}>
                {title || 'What is your title?'}
            </Text>
            <Link border={'1px'}
                borderColor='gray.300'
                p='2' py='1'
                rounded={'2xl'}
                fontSize='sm'
                _hover={{ bg: 'gray.300', textDecoration: 'none' }}>
                Xem thêm</Link>
        </Stack>
        <Grid templateColumns={'repeat(3,1fr)'} gap={4}>
            {[1,2,3].map(e=>{
                return <GridItem key={e} h={'250px'} bg='gray.300' rounded={'md'}></GridItem>
            })}
        </Grid>
    </Box>
    )
}

export default ListPost;