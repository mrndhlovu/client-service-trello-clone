import { Button } from "@chakra-ui/button"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { FiCheckSquare } from "react-icons/fi"

import { clientRequest } from "../../../../api"
import { IChecklist } from "../cardActions/AddChecklist"
import { useCardContext } from "../../../../lib/providers"
import { usePrevious } from "../../../../lib/hooks"
import AddChecklistTask from "./AddChecklistTask"
import CardModule from "./CardModule"
import EditableText from "../../EditableText"

const CardChecklists = () => {
  const { cardId, card, updateCardState } = useCardContext()

  const [checklists, setChecklists] = useState<IChecklist[]>([])
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
      .then(() => {
        updateCardState({
          ...card,
          checklists: [
            ...card.checklists.filter(
              checklist => checklist.id !== checklistId
            ),
          ],
        })
      })
      .catch(() => {})
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
      })
      .catch(() => {})
  }

  useEffect(() => {
    setChecklists(card?.checklists)
  }, [card?.checklists])

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
                <Button
                  onClick={handleDeleteChecklist}
                  size="sm"
                  colorScheme="gray"
                  id={checklist?.id}
                >
                  Delete
                </Button>
              }
            />
            <AddChecklistTask
              checklistId={checklist?.id}
              taskList={checklist?.tasks}
              isNew={isNew}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CardChecklists
