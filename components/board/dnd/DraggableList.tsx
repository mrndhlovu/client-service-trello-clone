import { memo, ReactNode, useRef, CSSProperties, useMemo } from "react"
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd"
import { XYCoord } from "dnd-core"

import { useListContext } from "../../../lib/hooks/context"

export interface DragItemProps {
  id: string
  onMoveItem?: (hoverId: string, id: string) => void
  children: ReactNode
  index: number
}

export interface IDndItem {
  index: number
  sourceIndex?: number
  id: string
  type: string
}

const style: CSSProperties = {}

const typedMemo: <T>(Component: T) => T = memo

const DraggableList = typedMemo(({ children, id, index, onMoveItem }) => {
  const { saveChanges } = useListContext()
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    item: () => {
      return { id, index }
    },
    type: "LIST",
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ handlerId }, drop] = useDrop({
    accept: "LIST",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isActive: monitor.canDrop() && monitor.isOver(),
      }
    },
    drop(item: IDndItem) {
      saveChanges(item)

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

      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.right

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }

      onMoveItem(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
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
      className={`${isDragging ? "drag-placeholder" : "list-item"}`}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  )
})

export default DraggableList
