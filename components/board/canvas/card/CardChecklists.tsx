import { Button, ButtonGroup } from "@chakra-ui/button"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { FiCheckSquare } from "react-icons/fi"

import { clientRequest } from "../../../../api"
import { useCardContext } from "../../../../lib/providers"
import { usePrevious } from "../../../../lib/hooks"
import CardModule from "./CardModule"
import EditableText from "../../EditableText"
import StyleChecklistTasks from "./StyleChecklistTasks"
import TaskList from "./TaskList"

const CardChecklists = () => {
  const { checklists, cardId, card, updateCardState, setChecklists } =
    useCardContext()

  const previous = usePrevious({
    listSize: checklists?.length,
  })
  const hasRenderedListRef = useRef<boolean>()

  const isNew =
    checklists.length !== previous?.listSize &&
    checklists.length > previous?.listSize &&
    hasRenderedListRef.current

  const handleDeleteChecklist = (ev: MouseEvent) => {
    const checklistId = ev.currentTarget.id

    clientRequest
      .deleteChecklist({ checklistId, cardId })
      .then(() =>
        setChecklists(prev => [
          ...prev.filter(checklist => checklist.id !== checklistId),
        ])
      )
      .catch(() => {})
  }

  const updateComplete = (newCompleteState: boolean, id: string) => {
    console.log(id)

    setChecklists(prev => [
      ...prev.map(checklist =>
        checklist.id === id
          ? { ...checklist, complete: newCompleteState }
          : checklist
      ),
    ])
  }

  const updateHideChecklist = (ev: MouseEvent | string, newState?: boolean) => {
    const checklistId = (ev as MouseEvent)?.currentTarget?.id || (ev as string)

    const item = checklists.find(checklist => checklist.id === checklistId)
    const update = {
      update: {
        hideComplete: newState !== undefined ? newState : !item?.hideComplete,
      },
      checklistId,
    }

    clientRequest
      .updateChecklist(update)
      .then(res => {
        setChecklists(prev => [
          ...prev.map(checklist =>
            checklist.id === checklistId
              ? { ...checklist, hideComplete: res.data.hideComplete }
              : checklist
          ),
        ])
      })
      .catch(() => null)
  }

  const handleUpdateTitle = (newTitle: string, checklistId: string) => {
    const update = { update: { title: newTitle }, checklistId }

    clientRequest
      .updateChecklist(update)
      .then(res => {
        setChecklists(prev => [
          ...prev.map(checklist =>
            checklist.id === checklistId
              ? { ...checklist, title: res.data.title }
              : checklist
          ),
        ])
        updateCardState({ ...card, checklists: { ...card.checklists } })
      })
      .catch(() => {})
  }

  useEffect(() => {
    const getData = () => {
      clientRequest
        .getCardChecklists(cardId)
        .then(res => {
          setChecklists(res.data)
          hasRenderedListRef.current = true
        })
        .catch(() => {})
    }
    getData()
  }, [])

  return (
    <div className="checklist module">
      {checklists?.map(checklist => {
        return (
          <div key={checklist?.id} className="">
            <CardModule
              icon={<FiCheckSquare size={16} />}
              className="checklist-header"
              title={
                <EditableText
                  handleUpdate={(newTitle: string) =>
                    handleUpdateTitle(newTitle, checklist.id)
                  }
                  originalText={checklist?.title}
                  saveButtonText="Save"
                  placeholder="Update title"
                  className="checklist-title"
                  key="checklist-title"
                />
              }
              option={
                <ButtonGroup>
                  {checklist.complete && (
                    <Button
                      onClick={updateHideChecklist}
                      size="sm"
                      colorScheme="gray"
                      id={checklist?.id}
                    >
                      {checklist.hideComplete
                        ? "Show checked items"
                        : "Hide checked items"}
                    </Button>
                  )}
                  <Button
                    onClick={handleDeleteChecklist}
                    size="sm"
                    colorScheme="gray"
                    id={checklist?.id}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              }
            />
            <StyleChecklistTasks className="card-module checklist-add-task">
              <TaskList
                checklistId={checklist?.id}
                taskList={checklist.tasks}
                isNew={isNew}
                updateComplete={updateComplete}
                updateHideChecklist={updateHideChecklist}
                complete={checklist.complete && checklist?.hideComplete}
              />
            </StyleChecklistTasks>
          </div>
        )
      })}
    </div>
  )
}

export default CardChecklists
