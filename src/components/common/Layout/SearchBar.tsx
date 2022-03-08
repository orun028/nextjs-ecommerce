import { Button, Icon, Input, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const item = ['aaa', 'bbb', 'ca', 'iphone']
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const open = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)

    function fillterWithInput() {
        const check = item.filter(e => e == input)

        if (input.length > 1) {
            return open()
        }
        return close()
    }

    return <>
        <InputGroup>
            <Input value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                    if (e.target.value.length > 1) {
                        fillterWithInput
                    }
                }} placeholder='Search ....' />
            <InputRightElement>
                <Icon as={FiSearch} color='gray.300' />
            </InputRightElement>
        </InputGroup>
        <Popover isLazy
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={close}
            placement='bottom-end'
            closeOnBlur={false}>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
            </PopoverContent>
        </Popover>
    </>
}

export default SearchBar;