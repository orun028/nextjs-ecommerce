import { Grid, GridItem, useBreakpointValue, Text, LinkOverlay, Heading, LinkBox, Spacer } from "@chakra-ui/react";
import Image from "./Image";

const ListCategory = () => {
    const listImgae = [
        'https://res.cloudinary.com/dpgvup3wu/image/upload/v1646667494/layout/lajd9yay15ppspst2gxa.jpg',
        'https://res.cloudinary.com/dpgvup3wu/image/upload/v1646667487/layout/r4losr3ptmalnyxx5geh.jpg',
        'https://res.cloudinary.com/dpgvup3wu/image/upload/v1646667487/layout/tyyx9lycl12qgsvyt3ey.jpg',
        'https://res.cloudinary.com/dpgvup3wu/image/upload/v1646667487/layout/ciafjxwc18kj0gt1fzef.jpg',
        'https://res.cloudinary.com/dpgvup3wu/image/upload/v1646667494/layout/clnwvaqkux6cwobnxilo.jpg'
    ]
    const colorText = 'gray.200'

    const widthImage = useBreakpointValue({ base: 200, md: 400, lg: 400 })
    const heightImage = useBreakpointValue({ base: 100, md: 200, lg: 260 })
    const col1 = { base: 12, sm: 6, md: 6, lg: 4 }
    const col2 = { base: 12, sm: 6, md: 6, lg: 4 }
    return (
        <Grid templateColumns={'repeat(12,1fr)'} templateRows={'repeat(2,1fr)'} gap='8'>
            <GridItem minHeight={{ lg: '200px' }} colSpan={col1} >
                <LinkBox as='article' bg={'gray.300'} rounded='md' position={'relative'}>
                    <Heading
                        fontSize={'3xl'}
                        fontWeight='medium'
                        position={'absolute'}
                        zIndex='banner'
                        color={colorText}
                        py='25%'
                        width='full'
                        textAlign={'center'} >
                        <LinkOverlay href='#'>Nón du lịch</LinkOverlay>
                    </Heading>
                    <Image
                        alt="Bg Category 1"
                        src={listImgae[0]}
                        width={widthImage}
                        height={heightImage}
                        layout='responsive'
                        className="border-radius" />
                </LinkBox>
            </GridItem>
            <GridItem minHeight={{ lg: '200px' }} colSpan={col1} >
                <LinkBox as='article' bg={'gray.300'} rounded='md' position={'relative'}>
                    <Heading
                        fontSize={'3xl'}
                        fontWeight='medium'
                        position={'absolute'}
                        zIndex='banner'
                        color={colorText}
                        py='25%'
                        width='full'
                        textAlign={'center'} >
                        <LinkOverlay href='#'>Áo phong</LinkOverlay>
                    </Heading>
                    <Image
                        alt="Bg Category 2"
                        src={listImgae[1]}
                        width={widthImage}
                        height={heightImage}
                        layout='responsive'
                        className="border-radius" />
                </LinkBox>
            </GridItem>
            <GridItem minHeight={{ lg: '200px' }} colSpan={col1} >
                <LinkBox as='article' bg={'gray.300'} rounded='md' position={'relative'}>
                    <Heading
                        fontSize={'3xl'}
                        fontWeight='medium'
                        position={'absolute'}
                        zIndex='banner'
                        color={colorText}
                        py='25%'
                        width='full'
                        textAlign={'center'} >
                        <LinkOverlay href='#'>Quần jean</LinkOverlay>
                    </Heading>
                    <Image
                        alt="Bg Category 3"
                        src={listImgae[2]}
                        width={widthImage}
                        height={heightImage}
                        layout='responsive'
                        className="border-radius" />
                </LinkBox>
            </GridItem>
            <Spacer display={{ base: 'none', lg: 'inherit' }} />
            <Spacer display={{ base: 'none', lg: 'inherit' }} />
            <GridItem minHeight={{ lg: '200px' }} colSpan={col2} >
                <LinkBox as='article' bg={'gray.300'} rounded='md' position={'relative'}>
                    <Heading
                        fontSize={'3xl'}
                        fontWeight='medium'
                        position={'absolute'}
                        zIndex='banner'
                        color={colorText}
                        py='25%'
                        width='full'
                        textAlign={'center'} >
                        <LinkOverlay href='#'>Giày thể thao</LinkOverlay>
                    </Heading>
                    <Image
                        alt="Bg Category 4"
                        src={listImgae[3]}
                        width={widthImage}
                        height={heightImage}
                        layout='responsive'
                        className="border-radius" />
                </LinkBox>
            </GridItem>
            <Spacer display={{ base: 'none', sm: 'inherit', lg: 'none' }} />
            <Spacer display={{ base: 'none', sm: 'inherit', lg: 'none' }} />
            <Spacer display={{ base: 'none', sm: 'inherit', lg: 'none' }} />
            <GridItem minHeight={{ lg: '200px' }} colSpan={col2} >
                <LinkBox as='article' bg={'gray.300'} rounded='md' position={'relative'}>
                    <Heading
                        fontSize={'3xl'}
                        fontWeight='medium'
                        position={'absolute'}
                        zIndex='banner'
                        color={colorText}
                        py='25%'
                        width='full'
                        textAlign={'center'} >
                        <LinkOverlay href='#'>Phụ kiện</LinkOverlay>
                    </Heading>
                    <Image
                        alt="Bg Category 5"
                        src={listImgae[4]}
                        width={widthImage}
                        height={heightImage}
                        layout='responsive'
                        className="border-radius" />
                </LinkBox>
            </GridItem>
        </Grid>
    )
}

export default ListCategory;