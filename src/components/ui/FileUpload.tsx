import { ChangeEventHandler, useRef } from 'react'
import { Button, Icon, Input, Spinner } from '@chakra-ui/react'

import { FiFile } from 'react-icons/fi'

type FileUploadProps = {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  accept?: string
  multiple?: boolean
  loader?: boolean
}

const FileUpload = (props: FileUploadProps) => {
  const { accept, multiple, loader, onChange } = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => inputRef.current?.click()

  return (
    <>
      <Input h={'0'} w='0'
        onChange={onChange}
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={(e) => { inputRef.current = e }} />
      {loader ? <Button leftIcon={<Spinner />} disabled>Upload</Button>
        : <Button leftIcon={<Icon as={FiFile} />} onClick={handleClick} >Upload</Button>}
    </>
  )
}

export default FileUpload