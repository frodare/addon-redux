import React, { FC, useCallback, useRef, RefObject } from 'react'
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

interface Props {
  value: object
  onChange: ChangeHandler
}

const equals = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b)

export type ChangeHandler = (value: any) => void

interface UseEditorResult {
  containerRef: RefObject<HTMLDivElement>
  editorRef: RefObject<JSONEditor | undefined>
}

const useEditor = (onChange: ChangeHandler): UseEditorResult => {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<JSONEditor>()

  if ((editorRef.current == null) && (containerRef.current != null)) {
    const options: JSONEditorOptions = {
      mode: 'tree',
      onChangeJSON: onChange
    }
    editorRef.current = new JSONEditor(containerRef.current, options)
  }

  return {
    editorRef,
    containerRef
  }
}

const ObjectEditor: FC<Props> = ({ value, onChange }) => {
  const valueRef = useRef({})

  const onChangeWrapper = useCallback(v => {
    valueRef.current = v
    onChange(v)
  }, [])

  const { editorRef, containerRef } = useEditor(onChangeWrapper)

  if (!equals(valueRef.current, value)) {
    valueRef.current = value
    console.log('updating with', value)
    editorRef.current?.update(value)
  }

  return (
    <div ref={containerRef} className='addon-redux-editor' />
  )
}

export default ObjectEditor
