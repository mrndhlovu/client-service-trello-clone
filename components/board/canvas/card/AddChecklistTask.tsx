import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"

import { AiOutlineClose } from "react-icons/ai"
import { Button, ButtonGroup, Input } from "@chakra-ui/react"

import { clientRequest } from "../../../../api"
import { ITaskItem } from "../cardActions/AddChecklist"

interface IProps {
  isNew: boolean
  setTasks: Dispatch<SetStateAction<ITaskItem[]>>
  checklistId: string
  updateHideChecklist: (checklistId: string, newState?: boolean) => void
}

const AddChecklistTask = ({
  checklistId,
  setTasks,
  isNew,
  updateHideChecklist,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement | undefined>()

  const [item, setItem] = useState<string>("")
  const [showInput, setShowInput] = useState<boolean>(false)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setItem(ev.target.value)
  }

  const handleAddItem = () => {
    if (!item) return
    clientRequest
      .createTask({ item, checklistId })
      .then(res => {
        updateHideChecklist(checklistId, false)
        setTasks(prev => [...prev, res.data])
      })
      .catch(() => {})
      .finally(() => {
        setItem("")
      })
  }

  const toggleInput = () => {
    setShowInput(prev => !prev)
  }

  useEffect(() => {
    if (!isNew && !inputRef.current) return
    setShowInput(isNew)
  }, [])

  return (
    <div className="module-content add-item content">
      {showInput ? (
        <>
          <Input
            onChange={handleChange}
            size="sm"
            placeholder="Add an item"
            ref={inputRef}
            value={item}
          />
          <ButtonGroup className="btn-group">
            <Button onClick={handleAddItem} colorScheme="blue" size="sm">
              Add
            </Button>
            <AiOutlineClose cursor="pointer" size={18} onClick={toggleInput} />
          </ButtonGroup>
        </>
      ) : (
        <Button onClick={toggleInput} colorScheme="gray" size="sm">
          Add item
        </Button>
      )}
    </div>
  )
}

export default AddChecklistTask
