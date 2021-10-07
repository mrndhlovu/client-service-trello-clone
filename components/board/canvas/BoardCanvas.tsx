import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

import {
  ListItemContextProvider,
  useBoard,
  useListsContext,
} from "../../../lib/providers"
import AddList from "./AddList"
import BoardCanvasStyles from "./StyleBoardCanvas"
import ListItem from "./ListItem"

const BoardCanvas = () => {
  const { hasBoardList } = useListsContext()
  const { board } = useBoard()

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardCanvasStyles>
        <div className="content">
          {board?.lists?.map(
            (listItem, index) =>
              !listItem.archived && (
                <ListItemContextProvider
                  list={listItem}
                  listId={listItem.id}
                  listIndex={index}
                  key={listItem.id}
                >
                  <ListItem />
                </ListItemContextProvider>
              )
          )}
          <AddList
            isFirst={hasBoardList}
            newListPosition={board?.lists.length}
          />
        </div>
      </BoardCanvasStyles>
    </DndProvider>
  )
}

export default BoardCanvas
