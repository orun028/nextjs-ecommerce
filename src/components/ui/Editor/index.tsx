import React from 'react';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

const EditorComponent = ({ ...res }) =>
  <Editor
    {...res}
    wrapperClassName='wrapperEditor'
    editorClassName='contenEditor' />

export default EditorComponent;