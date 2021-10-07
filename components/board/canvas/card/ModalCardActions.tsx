import { Button } from "@chakra-ui/button"
import { MouseEvent } from "react"
import { HiOutlineArrowRight, HiOutlineTemplate } from "react-icons/hi"
import { MdContentCopy } from "react-icons/md"
import { VscArchive } from "react-icons/vsc"

import { UIDropdown } from "../../../shared"
import { useCardContext, useListItemContext } from "../../../../lib/providers"
import MoveCardOption from "../moveDialog/MoveCardSettings"

const ModalCardActions = () => {
  const { saveCardChanges } = useListItemContext()
  const { cardId, listId } = useCardContext()

  const handleArchiveCard = (ev: MouseEvent) => {
    ev.preventDefault()
    saveCardChanges(cardId, listId, { archived: true })
    close()
  }

  const ADD_TO_CARD_OPTIONS = [
    {
      title: "Move",
      id: 0,
      icon: <HiOutlineArrowRight />,
      menu: <MoveCardOption />,
    },

    // { title: "Copy", id: 1, icon: <MdContentCopy />, menu: <div /> },
    // {
    //   title: "Make template",
    //   id: 2,
    //   icon: <HiOutlineTemplate />,
    //   menu: <div />,
    // },
    {
      title: "Archive",
      id: 3,
      icon: <VscArchive />,
      menu: (
        <Button
          colorScheme="red"
          size="md"
          isFullWidth
          onClick={handleArchiveCard}
        >
          Archive
        </Button>
      ),
    },
  ]

  return (
    <div className="sidebar-module">
      <h3>Action</h3>
      <div className="buttons-list">
        {ADD_TO_CARD_OPTIONS.map(option => (
          <UIDropdown
            toggle={
              <Button
                key={option.id}
                leftIcon={option.icon}
                size="sm"
                colorScheme="gray"
                isFullWidth
                alignItems="center"
              >
                {option.title}
              </Button>
            }
            heading={option.title}
          >
            {option.menu}
          </UIDropdown>
        ))}
      </div>
    </div>
  )
}

export default ModalCardActions
