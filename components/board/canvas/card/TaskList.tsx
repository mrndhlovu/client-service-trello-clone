import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import {
  ButtonGroup,
  Checkbox,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react"
import { AiOutlineClockCircle } from "react-icons/ai"
import { VscEllipsis } from "react-icons/vsc"

import { calculateCompleteState } from "../../../../util"
import { clientRequest } from "../../../../api"
import { ITaskItem } from "../cardActions/AddChecklist"
import { UIDropdown } from "../../../shared"
import { useBoard, useCardContext } from "../../../../lib/providers"
import AddChecklistTask from "./AddChecklistTask"
import ChecklistProgress from "./ChecklistProgress"
import EditableText from "../../EditableText"

interface IProps {
  checklistId: string
  complete: boolean
  isNew: boolean
  taskList: ITaskItem[]
  updateHideChecklist: (checklistId: string, newState?: boolean) => void
  updateComplete: (complete: boolean, checklistId: string) => void
}

const TaskList = ({
  checklistId,
  complete,
  isNew,
  taskList = [],
  updateHideChecklist,
  updateComplete,
}: IProps) => {
  const { listId } = useCardContext()
  const { boardId, updateBoardState, board } = useBoard()
  const [tasks, setTasks] = useState<ITaskItem[]>([])

  const handleUpdateTaskTitle = (newTitle: string, taskId: string) => {
    const update = { update: { item: newTitle }, taskId }

    clientRequest
      .updateTask(update)
      .then(res => {
        setTasks(prev => [
          ...prev.map(task =>
            task.id === taskId ? { ...task, item: res.data.task.item } : task
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
            task.id === taskId ? { ...task, state: res.data.task.state } : task
          ),
        ])
        updateComplete(res.data.allTasksComplete, task.checklist)
      })
      .catch(() => null)
  }

  useEffect(() => {
    setTasks(taskList)
  }, [taskList])

  return (
    <>
      <ChecklistProgress completeState={calculateCompleteState(tasks)} />
      <div className="task-list content">
        {!complete &&
          tasks?.map(task => (
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
                    saveButtonText="Save"
                    className="editable-task"
                    key="editable-task"
                    placeholder="Update item"
                  />

                  <div className="task-controls">
                    <ButtonGroup>
                      <UIDropdown
                        heading="options"
                        usePortal
                        toggle={<AiOutlineClockCircle size={15} />}
                      >
                        <div />
                      </UIDropdown>

                      <UIDropdown
                        usePortal
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

        {complete && (
          <p className="checklist-complete-text">
            Everything in this checklist is complete!
          </p>
        )}
      </div>
      <AddChecklistTask
        checklistId={checklistId}
        isNew={isNew}
        setTasks={setTasks}
        updateHideChecklist={updateHideChecklist}
      />
    </>
  )
}

export default TaskList
