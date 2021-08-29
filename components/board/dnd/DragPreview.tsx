import { forwardRef } from "react"
import { CSSProperties } from "react"

const styles: CSSProperties = {
  display: "inline-block",
  transform: "rotate(+7deg)",
  WebkitTransform: "rotate(+7deg)",
  width: "272px",
}

const DragPreview = ({ isDragging }, ref) => {
  return <div ref={ref} style={isDragging ? styles : {}} />
}

export default forwardRef(DragPreview)
