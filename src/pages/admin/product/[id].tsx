import { NextPage } from "next";
import { Button, Container, FormControl, FormHelperText, FormLabel, Grid, GridItem, Input, SimpleGrid, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/common";
import {connect} from "react-redux";
import Editor from "@/components/ui/Editor";


const Action: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState<any>()
    const [isLoading, setLoading] = useState(true)

    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ])

    useEffect(() => {
        if (!router.isReady) return;
        async function getData() {
            await fetch(`http://localhost:3000/api/product/${id}`)
                .then((res) => res.json())
                .then((v) => {
                    setData(v)
                    setLoading(false)
                })
        }
        if (isLoading) { getData() }
    }, [router.isReady])

    if (isLoading) { <p>Loading Please wait...</p> }

    function handleSubmit(value: any) { value.preventDefault() }

    return <>
        <Sidebar />
        <Container maxW={'container.xl'} py='6'>
            {!isLoading && <form onSubmit={handleSubmit}>
                <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel htmlFor='email'>Name</FormLabel>
                            <Input id='email' type='email' defaultValue={data.name} />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                        <Editor /* value={value} *//>
                    </GridItem>
                    <GridItem colSpan={1}>

                    </GridItem>
                </Grid>
            </form>}
        </Container>
    </>
}

export default connect(state => state)(Action);