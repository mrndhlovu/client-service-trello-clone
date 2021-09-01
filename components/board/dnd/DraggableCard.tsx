import { memo, ReactNode, useRef, useMemo } from "react"
import {
  DropTargetMonitor,
  useDrag,
  useDrop,
  DragSourceMonitor,
} from "react-dnd"
import { XYCoord } from "dnd-core"

import { DRAG_TYPES } from "../../../util/constants"
import { ICardDraggingProps, useListContext } from "../../../lib/providers"

export interface DragItemProps {
  id: string
  children: ReactNode
  index: number
}

export interface ICardDndItem {
  cardId: string

  index: number
  hoverIndex: number
  targetId: string

  hoverListIndex?: number
  sourceListIndex: number

  sourceListId?: string
  targetListId?: string
}

const typedMemo: <T>(Component: T) => T = memo

const DraggableCard = typedMemo(
  ({ children, cardId, index, listIndex, listId }) => {
    const { saveCardDndChanges, moveCard } = useListContext()

    const ref = useRef<HTMLDivElement>(null)

    const [{ isDragging }, drag, preview] = useDrag({
      item: () => {
        return {
          sourceListIndex: listIndex,
          cardId: cardId,
          index: index,
          targetId: cardId,
          hoverIndex: index,
          sourceListId: listId,
          targetListId: listId,
        }
      },
      type: DRAG_TYPES.CARD,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: (monitor.getItem() as ICardDndItem)?.cardId === cardId,
      }),
    })

    const [{ handlerId }, drop] = useDrop({
      accept: DRAG_TYPES.CARD,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },

      drop(item: ICardDndItem) {
        if (item.targetListId === item.sourceListId) {
          const data: ICardDraggingProps = {
            sourceCardId: item.cardId,
            targetCardId: item.targetId,
            sourceListId: item.sourceListId,
          }

          saveCardDndChanges(data)
        }

        return {}
      },
      hover(item: ICardDndItem, monitor: DropTargetMonitor) {
        if (!ref.current) return

        const dragIndex = item.index
        const hoverIndex = index
        const hoverCardId = cardId

        const hoverBoundingRect = ref.current.getBoundingClientRect()
        const clientOffset = monitor.getClientOffset()

        const isOnSourceCard = dragIndex === hoverIndex

        if (isOnSourceCard) return

        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

        moveCard(item.cardId, hoverCardId)

        item.index = hoverIndex
        item.targetId = hoverCardId
      },
    })

    const containerStyle = useMemo(
      () => ({
        cursor: "pointer",
      }),
      []
    )

    drag(drop(ref))

    return (
      <div
        ref={ref}
        className={`${isDragging ? "card-drag-placeholder" : "card-item"}`}
        data-handler-id={handlerId}
      >
        {children}
      </div>
    )
  }
)

export default DraggableCard
