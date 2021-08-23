import { Button, MenuItem } from "@chakra-ui/react"
import { isEmpty } from "lodash"
import { CSSProperties, useCallback, useMemo } from "react"
import { useDrag, DragSourceMonitor, useDrop } from "react-dnd"
import { AiOutlineEllipsis } from "react-icons/ai"

import { clientRequest } from "../../../api"
import { useBoard, useListContext } from "../../../lib/hooks/context"
import { UIDropdown } from "../../shared"
import DraggableList from "../dnd/DraggableList"
import EditableTitle from "../EditableTitle"
import AddCard from "./AddCard"
import ListCards from "./ListCards"

interface IProps {
  listItem: IListItem
  listIndex: number
}

export interface IListItem {
  [key: string]: any
}

export interface ICardItem {
  [key: string]: any
  cardIndex: number
}

const ListItem = ({ listItem, listIndex }: IProps) => {
  const { board } = useBoard()
  const { handleUpdateList, onMoveList } = useListContext()
  const hasCards = !isEmpty(board?.cards)

  const handleUpdateTitle = (title: string) => {
    handleUpdateList(listItem.id, { title })
  }

  const handleArchiveList = () => {
    handleUpdateList(listItem.id, { archived: true })
  }

  const listActions = [{ title: "Archive list", onClick: handleArchiveList }]

  return (
    <div className="list-wrapper">
      <DraggableList id={listItem.id} onMoveItem={onMoveList} index={listIndex}>
        <div className="editable-header">
          <EditableTitle
            handleUpdate={handleUpdateTitle}
            title={listItem.title}
          />

          <UIDropdown
            heading="List actions"
            toggle={
              <Button size="xs">
                <AiOutlineEllipsis size={18} />
              </Button>
            }
          >
            {listActions.map((action, index) => (
              <MenuItem key={index} onClick={action.onClick}>
                {action.title}
              </MenuItem>
            ))}
          </UIDropdown>
        </div>
        {hasCards && <ListCards listId={listItem.id} />}
        <AddCard listId={listItem.id} />
      </DraggableList>
    </div>
  )
}

export default ListItem
