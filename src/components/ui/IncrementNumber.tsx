import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react"

interface Props {
    value: number,
    increment: React.MouseEventHandler,
    decrement: React.MouseEventHandler
}

const HookUsage = ({ value, increment, decrement }: Props) => {
    const size = 'sm'
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: value,
            min: 1,
            max: 10,
            precision: 0,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ readOnly: true })

    return (
        <HStack maxW='320px'>
            <Button {...dec} size={size} onClick={decrement}>-</Button>
            <Input {...input} size={size} maxW={16} />
            <Button {...inc} size={size} onClick={increment}>+</Button>
        </HStack>
    )
}

export default HookUsage; 