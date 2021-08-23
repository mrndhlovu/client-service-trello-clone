import { isEmpty } from "lodash"

import { useBoard } from "../../../lib/hooks/context"
import AddList from "./AddList"
import BoardCanvasStyles from "./BoardCanvasStyles"
import ListItem, { ICardItem, IListItem } from "./ListItem"

const BoardCanvas = () => {
  const { board, setActiveBoard } = useBoard()
  const boardLists = board?.lists
  const hasBoardList = !isEmpty(boardLists)

  const updateBoardLists = (updatedListItem: IListItem) => {
    const newList = boardLists.map((list: IListItem) =>
      list.id === updatedListItem.id ? updatedListItem : list
    )

    setActiveBoard({ ...board, lists: newList })
  }

  return (
    <BoardCanvasStyles>
      <div className="content">
        {boardLists?.map(
          (listItem: IListItem) =>
            !listItem.archived && (
              <ListItem
                key={listItem.id}
                updateBoardLists={updateBoardLists}
                listItem={listItem}
              />
            )
        )}
        <AddList isFirst={hasBoardList} />
      </div>
    </BoardCanvasStyles>
  )
}

export default BoardCanvas
