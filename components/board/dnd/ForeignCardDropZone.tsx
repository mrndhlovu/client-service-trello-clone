import { useRef } from "react"
import { useDrop } from "react-dnd"

import { DRAG_TYPES } from "../../../util/constants"
import { ICardDndItem } from "./DraggableCard"
import {
  ICardDraggingProps,
  useBoard,
  useListContext,
} from "../../../lib/providers"

const ForeignCardDropZone = ({ children, listId, listIndex }) => {
  const { switchCardList } = useBoard()
  const { saveCardDndChanges } = useListContext()

  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: DRAG_TYPES.CARD,
    drop(item: ICardDndItem) {
      if (item.targetListId !== item.sourceListId) {
        const data: ICardDraggingProps = {
          sourceCardId: item.cardId,
          targetCardId: item.targetId,
          sourceListId: item.sourceListId,
          targetListId: item.targetListId,
          isSwitchingList: true,
        }
        saveCardDndChanges(data)
      }

      return {}
    },
    hover(item: ICardDndItem) {
      const sourceListIndex = item.sourceListIndex
      const listHoverIndex = listIndex
      const isOnCurrentList = sourceListIndex === listHoverIndex

      if (isOnCurrentList) return

      item.targetListId = listId

      switchCardList(item.index, item.sourceListId, listId)

      console.log("====================================")
      console.log(
        item.hoverIndex,
        item.index,
        item.sourceListId,
        listId,
        item.targetListId
      )
      console.log("====================================")

      item.sourceListIndex = listIndex
    },
  })

  drop(ref)

  return (
    <div className="foreign-card-dnd-zone" ref={ref}>
      {children}
    </div>
  )
}

export default ForeignCardDropZone
