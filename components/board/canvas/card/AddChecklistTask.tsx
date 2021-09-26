import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"

import {
  Progress,
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react"
import { AiOutlineClockCircle, AiOutlineClose } from "react-icons/ai"
import { VscEllipsis } from "react-icons/vsc"

import { calculateCompleteState } from "../../../../util"
import { clientRequest } from "../../../../api"
import { ITaskItem } from "../cardActions/AddChecklist"
import { UIDropdown } from "../../../shared"
import { useBoard, useCardContext } from "../../../../lib/providers"
import AddTaskStyles from "./StyleAddTask"
import EditableText from "../../EditableText"

const AddChecklistTask = ({ checklistId, taskList, isNew }) => {
  const inputRef = useRef<HTMLInputElement | undefined>()
  const { listId } = useCardContext()
  const { boardId, updateBoardState, board } = useBoard()

  const [item, setItem] = useState<string>("")
  const [tasks, setTasks] = useState<ITaskItem[]>([])
  const [showInput, setShowInput] = useState<boolean>(false)
  const completeState = calculateCompleteState(tasks)

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
      .finally(() => {
        setItem("")
      })
  }

  const handleUpdateTaskTitle = (newTitle: string, taskId: string) => {
    const update = { update: { item: newTitle }, taskId }

    clientRequest
      .updateTask(update)
      .then(res => {
        setTasks(prev => [
          ...prev.map(task =>
            task.id === taskId ? { ...task, item: res.data.item } : task
          ),
        ])
      })
      .catch(() => {})
  }

  const handleDeleteTask = (ev: MouseEvent<HTMLButtonElement>) => {
    const taskId = ev.currentTarget.value

    clientRequest
      .deleteTask({ checklistId, taskId })
      .then(() => {
        setTasks(prev => [...prev.filter(task => task.id !== taskId)])
      })
      .catch(() => {})
  }

  const handleConvertToCard = (ev: MouseEvent<HTMLButtonElement>) => {
    const taskId = ev.currentTarget.value

    clientRequest
      .convertTaskToCard({ listId, boardId, taskId, checklistId })
      .then(res => {
        setTasks(prev => [...prev.filter(task => task.id !== taskId)])
        updateBoardState({ ...board, cards: [...board.cards, res.data] })
      })
      .catch(() => {})
  }

  const handleCheck = (ev: ChangeEvent<HTMLInputElement>) => {
    const taskId = ev.target.id
    const task = tasks.find(item => item.id === taskId)
    const update = {
      update: { state: task.state === "complete" ? "todo" : "complete" },
      taskId,
    }

    clientRequest
      .updateTask(update)
      .then(res => {
        setTasks(prev => [
          ...prev.map(task =>
            task.id === taskId ? { ...task, state: res.data.state } : task
          ),
        ])
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

  return (
    <AddTaskStyles className="checklist-add-task">
      <div className="progress">
        {<small>{completeState}%</small>}
        <Progress
          max={100}
          colorScheme="whatsapp"
          size="sm"
          value={completeState}
          className="progress-range"
        />
      </div>
      <div className="task-list content">
        {tasks?.map(task => (
          <div key={task?.id}>
            <div className="draggable-task">
              <div className="checkbox">
                <Checkbox
                  onChange={handleCheck}
                  defaultChecked={task.state === "complete"}
                  id={task.id}
                />
              </div>
              <div className="task-text">
                <EditableText
                  originalText={task?.item}
                  handleUpdate={(newTitle: string) =>
                    handleUpdateTaskTitle(newTitle, task.id)
                  }
                  saveButtonText="Add"
                  className="editable-task"
                  key="editable-task"
                  placeholder="Update item"
                />

                <div className="controls">
                  <ButtonGroup>
                    <UIDropdown
                      heading="options"
                      toggle={<AiOutlineClockCircle size={15} />}
                    >
                      <div />
                    </UIDropdown>

                    <UIDropdown
                      heading="Item actions"
                      toggle={<VscEllipsis id={task.id} size={15} />}
                    >
                      <MenuItemOption
                        onClick={handleConvertToCard}
                        value={task.id}
                        className="menu-option"
                      >
                        Convert to card
                      </MenuItemOption>
                      <MenuOptionGroup>
                        <MenuItemOption
                          onClick={handleDeleteTask}
                          value={task.id}
                          className="menu-option"
                        >
                          Delete
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </UIDropdown>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
