import { memo, ReactNode, useRef, CSSProperties, useMemo } from "react"
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd"
import { XYCoord } from "dnd-core"

import { useCardContext } from "../../../lib/hooks/context"

export interface DragItemProps {
  id: string
  children: ReactNode
  index: number
}

interface IDndItem {
  index: number
  id: string
  type: string
}

const style: CSSProperties = {}

const typedMemo: <T>(Component: T) => T = memo

const DraggableCard = typedMemo(({ children, id, index }) => {
  const { saveCardChanges, onMoveCard } = useCardContext()
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop(item: IDndItem) {
      saveCardChanges(item)

      return {}
    },
    hover(item: IDndItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onMoveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: () => {
      return { id, index }
    },
    type: "CARD",
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const containerStyle = useMemo(
    () => ({
      ...style,
      cursor: "pointer",
    }),
    []
  )

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{
        ...containerStyle,
      }}
      className={`${isDragging ? "card-drag-placeholder" : "card-item"}`}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  )
})

export default DraggableCard
