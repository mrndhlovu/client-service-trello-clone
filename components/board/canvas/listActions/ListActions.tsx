import { Menu, MenuItem } from "@chakra-ui/menu"
import { MouseEvent, useState } from "react"
import { Button } from "@chakra-ui/button"
import { AiOutlineEllipsis } from "react-icons/ai"
import { IoIosArrowBack } from "react-icons/io"

import { LIST_ACTIONS } from "../../../../util/constants"
import { UIDropdown } from "../../../shared"
import { useListItemContext, useListsContext } from "../../../../lib/providers"
import ListActionStyles from "./ListActionStyles"
import MoveList from "../moveDialog/MoveListSettings"

enum ActionKeys {
  MOVE = "move",
  MENU = "menu",
  ARCHIVE = "archive",
}

interface IListActions {
  key: string
  title: string
  main?: boolean
}

const ListActions = () => {
  const { saveListChanges } = useListsContext()
  const { listId } = useListItemContext()

  const [activeMenu, setActiveMenu] = useState<IListActions>(LIST_ACTIONS.menu)

  const handleArchiveList = () => {
    saveListChanges(listId, { archived: true })
  }

  const handleClose = () => {
    setActiveMenu(LIST_ACTIONS.menu)
  }

  const handleClick = (ev: MouseEvent<HTMLButtonElement>) => {
    console.log(ev.currentTarget.id)

    setActiveMenu(LIST_ACTIONS[ev.currentTarget.id])
  }

  return (
    <UIDropdown
      heading={activeMenu?.title}
      className="list-actions-menu-button"
      toggle={<AiOutlineEllipsis size={20} />}
    >
      <Menu closeOnSelect={false}>
        <ListActionStyles>
          {activeMenu?.key !== ActionKeys.MENU && (
            <button className="back-btn" id="menu" onClick={handleClick}>
              <IoIosArrowBack size={15} />
            </button>
          )}
          {activeMenu?.key === ActionKeys.MENU &&
            Object.keys(LIST_ACTIONS).map(
              (key, index) =>
                !LIST_ACTIONS?.[key]?.main && (
                  <span
                    onClick={handleClick}
                    id={LIST_ACTIONS?.[key].key}
                    key={LIST_ACTIONS?.[key].key}
                  >
                    <MenuItem>{LIST_ACTIONS?.[key]?.title}</MenuItem>
                  </span>
                )
            )}
          {activeMenu?.key === ActionKeys.MOVE && (
            <MoveList onClose={handleClose} />
          )}
          {activeMenu?.key === ActionKeys.ARCHIVE && (
            <Button
              justifyContent="center"
              isFullWidth
              size="sm"
              colorScheme="red"
              onClick={handleArchiveList}
              className="archive-btn"
            >
              Yes archive list
            </Button>
          )}
        </ListActionStyles>
      </Menu>
    </UIDropdown>
  )
}

export default ListActions
