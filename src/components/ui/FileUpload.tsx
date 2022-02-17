import { useRef } from 'react'
import { Button, Icon, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

type FileUploadProps = {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
}

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void }

  const handleClick = () => inputRef.current?.click()

  return (
    <>
      <Input h={'0'} w='0'
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
      />
      <Button leftIcon={<Icon as={FiFile} />} onClick={handleClick} >Upload</Button>
    </>
  )
}

export default FileUpload