import { Button, MenuItem } from "@chakra-ui/react"
import { isEmpty } from "lodash"
import { AiOutlineEllipsis } from "react-icons/ai"

import { clientRequest } from "../../../api"
import { useBoard, useGlobalState } from "../../../lib/hooks/context"
import { getErrorMessage } from "../../../util"
import { UIDropdown } from "../../shared"
import EditableTitle from "../EditableTitle"
import AddCard from "./AddCard"
import ListCards from "./ListCards"

interface IProps {
  listItem: IListItem
  updateBoardLists: (newListItem: IListItem) => void
}

export interface IListItem {
  [key: string]: any
}

export interface ICardItem {
  [key: string]: any
}

const ListItem = ({ listItem, updateBoardLists }: IProps) => {
  const { notify } = useGlobalState()
  const { board } = useBoard()
  const hasCards = !isEmpty(board?.cards)

  const handleUpdate = async (update: { [key: string]: any }) => {
    await clientRequest
      .updateList(update, { listId: listItem.id, boardId: board.id })
      .then(res => updateBoardLists(res.data))
      .catch(err => notify({ description: getErrorMessage(err.response.data) }))
  }

  const handleUpdateTitle = (title: string) => {
    handleUpdate({ title })
  }

  const handleArchiveList = () => {
    handleUpdate({ archived: true })
  }

  const listActions = [{ title: "Archive list", onClick: handleArchiveList }]

  return (
    <div className="list-wrapper ">
      <div className="list-item">
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
      </div>
    </div>
  )
}

export default ListItem
