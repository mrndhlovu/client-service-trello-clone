import { Button, MenuItem } from "@chakra-ui/react"
import { AiOutlineEllipsis } from "react-icons/ai"

import {
  ListCardsContextProvider,
  useListContext,
} from "../../../lib/providers"
import { UIDropdown } from "../../shared"
import AddCard from "./AddCard"
import DraggableList from "../dnd/DraggableList"
import EditableTitle from "../EditableTitle"
import ForeignCardDropZone from "../dnd/ForeignCardDropZone"
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
  const { handleUpdateList } = useListContext()

  const handleUpdateTitle = (title: string) => {
    handleUpdateList(listItem.id, { title })
  }

  const handleArchiveList = () => {
    handleUpdateList(listItem.id, { archived: true })
  }

  const listActions = [{ title: "Archive list", onClick: handleArchiveList }]

  return (
    <div className="list-wrapper">
      <ForeignCardDropZone listId={listItem.id} listIndex={listIndex}>
        <DraggableList listId={listItem.id} listIndex={listIndex}>
          <ListCardsContextProvider listId={listItem.id} listIndex={listIndex}>
            <div className="editable-header">
              <EditableTitle
                handleUpdate={handleUpdateTitle}
                title={`${listItem.title} ${listItem?.id}`}
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
            <ListCards listId={listItem.id} listIndex={listIndex} />
            <AddCard />
          </ListCardsContextProvider>
        </DraggableList>
      </ForeignCardDropZone>
    </div>
  )
}

export default ListItem
