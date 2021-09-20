import { Button, Input, ButtonGroup, Textarea } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

interface IProps {
  handleUpdate: (newTitle: string) => void
  originalText: string
  saveButtonText: string
  className: string
  placeholder: string
}

const EditableText = ({
  handleUpdate,
  originalText,
  saveButtonText,
  className,
  placeholder,
}: IProps) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [updatedText, setUpdatedText] = useState<string>("")

  const toggleInput = () => setEditing(prev => !prev)

  const handleEdit = () => {
    if (updatedText && updatedText !== originalText) {
      handleUpdate(updatedText)
    }
    toggleInput()
  }

  const handleChange = (ev: ChangeEvent<HTMLElement>) => {
    setUpdatedText((ev.target as any).value)
  }

  return (
    <>
      {!editing ? (
        <span className="original-text" onClick={handleEdit}>
          {originalText}
        </span>
      ) : (
        <div className={`editable-text ${className || ""}`}>
          <Textarea
            onChange={handleChange}
            size="sm"
            placeholder={placeholder}
            defaultValue={originalText}
          />
          <ButtonGroup className="btn-group">
            <Button onClick={handleEdit} colorScheme="blue" size="sm">
              {saveButtonText}
            </Button>
            <AiOutlineClose cursor="pointer" size={18} onClick={toggleInput} />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}

export default EditableText
