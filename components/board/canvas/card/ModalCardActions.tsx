import { Button } from "@chakra-ui/button"
import { MouseEvent } from "react"
import { HiOutlineArrowRight } from "react-icons/hi"
import { VscArchive } from "react-icons/vsc"

import { UIDropdown } from "../../../shared"
import { useCardContext } from "../../../../lib/providers"
import MoveCardOption from "../moveDialog/MoveCardSettings"

const ModalCardActions = ({ close }: { close: () => void }) => {
  const { cardId, listId, updateCardState, card, saveCardChanges } =
    useCardContext()

  const handleArchiveCard = (ev: MouseEvent) => {
    ev.preventDefault()
    updateCardState({ ...card, archived: true })
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
