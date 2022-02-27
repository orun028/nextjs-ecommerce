import { Box } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface RatingProps {
    rating: number;
    numReviews: number;
}

export default function Rating({ rating, numReviews }: RatingProps) {
    return (
        <Box d="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return <BsStarFill
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={i < rating ? '#F7DC6F' : '#FCF3CF'} />;
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }} color={'#F7DC6F'} />;
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} color={'#F7DC6F'} />;
                })}
            <Box ml="2" mt='1' color="gray.600" fontSize="10px">
                ({numReviews})
            </Box>
        </Box>
    );
}