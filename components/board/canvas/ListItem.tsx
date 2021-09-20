import {
  ListCardsContextProvider,
  useListCardsContext,
  useListContext,
} from "../../../lib/providers"
import AddCard from "./AddCard"
import DraggableList from "../dnd/DraggableList"
import EditableTitle from "../EditableTitle"
import ForeignCardDropZone from "../dnd/ForeignCardDropZone"
import ListActions from "./listActions/ListActions"
import ListCards from "./ListCards"
import { IChecklist } from "./card/AddChecklist"

interface IProps {
  listItem: IListItem
  listIndex: number
}

export interface IListItem {
  cards?: ICardItem[]
  [key: string]: any
}

export interface ICardItem {
  coverUrl?: {
    image: string
    edgeColor: string
    active: boolean
  }
  checklists: IChecklist[]
  [key: string]: any
}

const ListItem = () => {
  const { saveListChanges } = useListContext()
  const { list, listId, listIndex } = useListCardsContext()

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
