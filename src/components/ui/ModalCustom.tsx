import React, { MouseEventHandler, ReactNode } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button } from '@chakra-ui/react'

const ModalCustom = ({ children, title, handelClick, onClose, isOpen }:
    {
        children: ReactNode,
        title?: string, 
        handelClick:MouseEventHandler,
        onClose: () => void, 
        isOpen: boolean
    }) => {
    return <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalCloseButton />
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <Button onClick={handelClick} colorScheme='blue' mr={3}>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>;
}

export default ModalCustom;