import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

import { ListContextProvider, useListContext } from "../../../lib/providers"
import AddList from "./AddList"
import BoardCanvasStyles from "./BoardCanvasStyles"
import ListItem, { IListItem } from "./ListItem"

const BoardCanvas = () => {
  const { lists, hasBoardList } = useListContext()

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardCanvasStyles>
        <div className="content">
          {lists?.map(
            (listItem: IListItem, index: number) =>
              !listItem.archived && (
                <ListItem
                  key={listItem.id}
                  listIndex={index}
                  listItem={listItem}
                />
              )
          )}
          <AddList isFirst={hasBoardList} />
        </div>
      </BoardCanvasStyles>
    </DndProvider>
  )
}

export default BoardCanvas
