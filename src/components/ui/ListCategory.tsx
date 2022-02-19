import { Grid, GridItem } from "@chakra-ui/react";

const ListCategory = () => {
    return (
        <Grid templateColumns={'repeat(4,1fr)'} templateRows={'repeat(2,1fr)'} gap='2'>
            <GridItem height={'200px'} bg={'gray.300'} colSpan={{base: 2, md: 1}} rounded='md'>

            </GridItem>
            <GridItem height={'200px'} bg={'gray.300'} colSpan={{base: 2, md: 1}} rounded='md'>

            </GridItem>
            <GridItem height={'200px'} bg={'gray.300'} colSpan={{base: 2, md: 1}} rounded='md'>

            </GridItem>
            <GridItem height={'200px'} bg={'gray.300'} colSpan={{base: 2, md: 1}} rounded='md'>

            </GridItem>
        </Grid>
    )
}

export default ListCategory;