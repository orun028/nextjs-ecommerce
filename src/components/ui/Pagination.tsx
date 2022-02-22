import { Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { BsChevronLeft, BsChevronRight, BsThreeDots } from "react-icons/bs";

interface Props {
    currentPage: number,
    lastPage: number,
    handlePageClick: any
}

const Pagination = ({ currentPage, lastPage, handlePageClick }: Props) => {
    const render = [];

    if (currentPage - 1 >= 0 && lastPage != 1) {
        const prevPage = currentPage - 1;
        render.push(
            <IconButton
                disabled={prevPage == 0}
                icon={<BsChevronLeft />}
                value={prevPage}
                onClick={() => { handlePageClick(prevPage) }}
                key={`prev-page-${prevPage}`} aria-label={""} />
        );
    }

    let startIdx;
    let endIdx;
    if (currentPage - 1 >= 0) {
        startIdx = currentPage - 1;
        endIdx = startIdx + 3;
    } else {
        startIdx = 0;
        endIdx = 3;
    }
    if (currentPage + 3 >= lastPage) {
        startIdx = lastPage - 3;
        endIdx = lastPage;
    }

    for (let idx = startIdx; idx < endIdx; idx++) {
        const offset = idx + 1;
        if (offset >= 1) {
            render.push(
                <Button key={`page-${offset}`} onClick={() => handlePageClick(offset)} value={offset}>
                    {offset}
                </Button>
            );
        }
    }

    if (endIdx < lastPage) {
        const offset = lastPage - 1;
        render.push(
            <React.Fragment key={`last-page-${lastPage}`}>
                <Icon as={BsThreeDots} color="gray" />
                <Button onClick={() => handlePageClick(offset)} value={offset}>
                    {lastPage}
                </Button>
            </React.Fragment>
        );
    }

    if (currentPage + 1 < lastPage) {
        const nextPage = currentPage + 1;
        render.push(
            <IconButton
                icon={<BsChevronRight />}
                value={nextPage}
                onClick={() => handlePageClick(nextPage)}
                key={`next-page-${nextPage}`} aria-label={""} />
        );
    }
    return <Flex gap={2} alignItems='center'>{render}</Flex>;

}

export default Pagination;