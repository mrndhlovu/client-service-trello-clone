import { memo, ReactNode, useRef, CSSProperties, useMemo } from "react"
import {
  DropTargetMonitor,
  useDrag,
  useDrop,
  DragSourceMonitor,
} from "react-dnd"
import { XYCoord } from "dnd-core"

import { DRAG_TYPES } from "../../../util/constants"
import {
  ICardDraggingProps,
  useListCardsContext,
  useListContext,
} from "../../../lib/providers"

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

const style: CSSProperties = {}

const typedMemo: <T>(Component: T) => T = memo

const DraggableCard = typedMemo(
  ({ children, cardId, index, listIndex, listId }) => {
    const { moveCard } = useListCardsContext()
    const { saveCardDndChanges } = useListContext()

    const ref = useRef<HTMLDivElement>(null)

    const [{ isDragging }, drag] = useDrag({
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
        isDragging: !!monitor.isDragging(),
      }),
    })

    const [{ handlerId, isOver }, drop] = useDrop({
      accept: DRAG_TYPES.CARD,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isOver: !!monitor.isOver(),
        }
      },
      drop(item: ICardDndItem) {
        if (item.targetListId === item.sourceListId) {
          const data: ICardDraggingProps = {
            sourceCardId: item.cardId,
            targetCardId: item.targetId,
            sourceListId: item.sourceListId,
            targetListId: item.targetListId,
            isSwitchingList: false,
          }

          saveCardDndChanges(data)
        }

        return {}
      },
      hover(item: ICardDndItem, monitor: DropTargetMonitor) {
        if (!ref.current) return

        // const sourceListIndex = item.sourceListIndex
        // const listHoverIndex = listIndex
        // const isOnCurrentList = sourceListIndex === listHoverIndex

        // if (!isOnCurrentList) return

        const dragIndex = item.index
        const hoverIndex = index

        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const clientOffset = monitor.getClientOffset()

        const hasMovedFromOffset = dragIndex !== hoverIndex

        if (!hasMovedFromOffset) return

        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

        moveCard(dragIndex, hoverIndex)

        item.index = hoverIndex
        item.targetId = cardId
      },
    })

    const containerStyle = useMemo(() => ({ ...style, cursor: "pointer" }), [])

    drag(drop(ref))

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={`${
          isDragging || isOver ? "card-drag-placeholder" : "card-item"
        }`}
        data-handler-id={handlerId}
      >
        {children}
      </div>
    )
  }
)

export default DraggableCard
