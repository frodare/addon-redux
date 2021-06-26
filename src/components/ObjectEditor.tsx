import React, { FC, useCallback, useRef } from 'react'
import { JsonEditor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

interface Props {
  value: object
  onChange: ChangeHandler
}

const equals = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b)

export type ChangeHandler = (value: any) => void

interface EditorRef {
  jsonEditor: {
    set: (value: object) => void
  }
}

const ObjectEditor: FC<Props> = ({ value, onChange }) => {
  const ref = useRef<EditorRef | undefined>()
  const valueRef = useRef({})

  if (ref.current !== undefined) {
    if (!equals(valueRef.current, value)) {
      valueRef.current = value
      ref.current.jsonEditor.set(value)
    }
  }

  const onChangeWrapper = useCallback(v => {
    valueRef.current = v
    onChange(v)
  }, [])

  return (
    <div className='addon-redux-editor'>
      <JsonEditor
        ref={ref}
        onChange={onChangeWrapper}
      />
    </div>
  )
}

export default ObjectEditor
