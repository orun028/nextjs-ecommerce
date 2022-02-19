import { useRef } from 'react'
import { Button, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Spinner } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

type FileUploadProps = {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  loader?: boolean
}

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, loader } = props
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
      />{loader ? <Button leftIcon={<Spinner />} disabled>Upload</Button>
        : <Button leftIcon={<Icon as={FiFile} />} onClick={handleClick} >Upload</Button>}
    </>
  )
}

export default FileUpload