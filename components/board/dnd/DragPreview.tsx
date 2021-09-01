import { forwardRef } from "react"
import { CSSProperties } from "react"

const styles: CSSProperties = {
  transform: "rotate(-3deg)",
  borderRadius: "3px",
}

const DragPreview = ({ isDragging, children }, ref) => {
  return (
    <div className="drag-preview" ref={ref} style={isDragging ? styles : {}}>
      {children}
    </div>
  )
}

export default forwardRef(DragPreview)
