import { Button } from "@chakra-ui/button"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { FiCheckSquare } from "react-icons/fi"

import { clientRequest } from "../../../../api"
import { IChecklist } from "../card/AddChecklist"
import { useCardContext } from "../../../../lib/providers"
import { usePrevious } from "../../../../lib/hooks"
import AddChecklistTask from "./AddChecklistTask"
import CardModule from "../card/CardModule"

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
              icon={<FiCheckSquare size={22} />}
              className="checklist-header"
              title={checklist?.title}
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
