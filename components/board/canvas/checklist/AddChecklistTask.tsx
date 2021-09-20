import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Progress, Button, ButtonGroup, Checkbox } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"

import { AiOutlineClockCircle, AiOutlineClose } from "react-icons/ai"
import { VscEllipsis } from "react-icons/vsc"

import { clientRequest } from "../../../../api"
import { ITaskItem } from "../card/AddChecklist"
import AddTaskStyles from "./AddTaskStyles"

const AddChecklistTask = ({ checklistId, taskList, isNew }) => {
  const inputRef = useRef<HTMLInputElement | undefined>()

  const [item, setItem] = useState<string>("")
  const [tasks, setTasks] = useState<ITaskItem[]>([])
  const [showInput, setShowInput] = useState<boolean>(false)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setItem(ev.target.value)
  }

  const handleAddItem = () => {
    if (!item) return
    clientRequest
      .createTask({ item, checklistId })
      .then(res => {
        setTasks(prev => [...prev, res.data])
      })
      .catch(() => {})
  }

  const toggleInput = () => {
    setShowInput(prev => !prev)
  }

  useEffect(() => {
    setTasks(taskList)
  }, [taskList])

  useEffect(() => {
    if (!isNew && !inputRef.current) return
    setShowInput(isNew)
  }, [])

  useEffect(() => {
    if (showInput) {
      inputRef.current.focus()
    }
  }, [showInput])

  return (
    <AddTaskStyles className="module-content checklist-add-task">
      <div className="progress">
        <Progress colorScheme="whatsapp" size="sm" value={80} />
      </div>
      <div className="task-list content">
        {tasks?.map(task => (
          <div key={task?.id}>
            <div className="draggable-task">
              <div className="checkbox">
                <Checkbox checked={task.status === "done"} />
              </div>
              <div className="task-text">{task?.item}</div>
              <div className="controls">
                <ButtonGroup>
                  <Button size="xs">
                    <AiOutlineClockCircle size={12} />
                  </Button>
                  <Button size="xs">
                    <VscEllipsis size={12} />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="add-item content">
        {showInput ? (
          <>
            <Input
              onChange={handleChange}
              size="sm"
              placeholder="Add an item"
              ref={inputRef}
            />
            <ButtonGroup className="btn-group">
              <Button onClick={handleAddItem} colorScheme="blue" size="sm">
                Add
              </Button>
              <AiOutlineClose
                cursor="pointer"
                size={18}
                onClick={toggleInput}
              />
            </ButtonGroup>
          </>
        ) : (
          <Button onClick={toggleInput} colorScheme="gray" size="sm">
            Add item
          </Button>
        )}
      </div>
    </AddTaskStyles>
  )
}

export default AddChecklistTask
