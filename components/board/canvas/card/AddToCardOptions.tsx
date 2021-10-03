import { Button } from "@chakra-ui/button"
import { AiOutlineClockCircle } from "react-icons/ai"
import { BsCheckBox, BsTag } from "react-icons/bs"
import { HiOutlinePaperClip } from "react-icons/hi"
import { IoMdCard } from "react-icons/io"

import { UIDropdown } from "../../../shared"
import { useCardContext } from "../../../../lib/providers"
import AddAttachment from "../cardActions/AddAttachment"
import AddChecklist from "../cardActions/AddChecklist"
import CardLabels from "../cardActions/CardLabels"
import ChangeCover from "../cardActions/ChangeCover"
import AddCardDueDate from "./AddCardDueDate"

const AddToCardOptions = () => {
  const { showCardCover, updateActionsList } = useCardContext()

  const ADD_TO_CARD_OPTIONS = [
    { title: "Labels", id: 0, icon: <BsTag />, menu: <CardLabels /> },
    {
      title: "Dates",
      id: 1,
      icon: <AiOutlineClockCircle />,
      menu: <AddCardDueDate />,
      usePortal: true,
    },
    { title: "Checklist", id: 2, icon: <BsCheckBox />, menu: <AddChecklist /> },
    {
      title: "Attachment",
      heading: "Attach from",
      id: 3,
      icon: <HiOutlinePaperClip />,
      menu: <AddAttachment />,
    },
    {
      title: "Cover",
      id: 4,
      icon: <IoMdCard />,
      menu: <ChangeCover />,
      placementAuto: true,
      hidden: showCardCover,
    },
  ]

  return (
    <div className="sidebar-module">
      <h3>Add to Card</h3>
      <div className="buttons-list">
        {ADD_TO_CARD_OPTIONS.map(
          option =>
            !option?.hidden && (
              <UIDropdown
                placement={option?.placementAuto ? "auto" : undefined}
                usePortal={option.usePortal}
                toggle={
                  <Button
                    key={option.id}
                    leftIcon={option.icon}
                    size="sm"
                    colorScheme="gray"
                    isFullWidth
                  >
                    {option.title}
                  </Button>
                }
                heading={option?.heading || option.title}
              >
                {option.menu}
              </UIDropdown>
            )
        )}
      </div>
    </div>
  )
}

export default AddToCardOptions
