import { IChecklist } from "./cardActions/AddChecklist"
import { useListItemContext, useListsContext } from "../../../lib/providers"
import AddCard from "./AddCard"
import DraggableList from "../dnd/DraggableList"
import EditableTitle from "../EditableTitle"
import ForeignCardDropZone from "../dnd/ForeignCardDropZone"
import ListActions from "./listActions/ListActions"
import ListCards from "./ListCards"

export interface IListItem {
  cards?: ICardItem[]
  title?: string
  boardId?: string
  archived?: boolean
  id?: string
}

interface ICoverImage {
  image?: string
  edgeColor?: string
  active?: boolean
  url?: string
  width?: string
  height?: string
}

export interface ICardItem {
  imageCover?: ICoverImage
  coverUrl?: ICoverImage
  checklists?: IChecklist[]
  activities?: string[]
  archived?: boolean
  assignees?: string[]
  attachments?: string[]
  boardId?: string
  cardId?: string
  comments?: string[]
  colorCover?: string
  description?: string
  labels?: string[]
  listId?: string
  owners?: string[]
  shortDesc?: string
  title?: string
  due?: string
  dueComplete?: boolean
  dueReminder?: number
  id?: string
}

const ListItem = () => {
  const { saveListChanges } = useListsContext()
  const { list, listId, listIndex } = useListItemContext()

  const handleUpdateTitle = (title: string) => {
    saveListChanges(listId, { title })
  }

  return (
    <div className="list-wrapper">
      <ForeignCardDropZone listId={listId} listIndex={listIndex}>
        <DraggableList listId={listId} listIndex={listIndex}>
          <div className="editable-header">
            <EditableTitle
              handleUpdate={handleUpdateTitle}
              title={list.title}
            />
            <ListActions />
          </div>
          <ListCards />
          <AddCard />
        </DraggableList>
      </ForeignCardDropZone>
    </div>
  )
}

export default ListItem
