import { ChangeEvent, useEffect, useState, MouseEvent } from "react"
import router from "next/router"
import Link from "next/link"
import { FiCheck, FiX } from "react-icons/fi"
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Input,
} from "@chakra-ui/react"

import { clientRequest } from "../../api"
import { NEW_BOARD_BG_OPTIONS, ROUTES } from "../../util/constants"
import { useGlobalState } from "../../lib/providers"
import NewBoardStyles, { BoardBgOption, StyledModal } from "./NewBoardStyles"

interface IBgOptions {
  key: number
  image?: string
  color?: string
}

interface IProps {
  toggleModal: (ev?: MouseEvent) => void
  openModal: boolean
  workspaceId?: string
}

const NewBoardModal = ({ toggleModal, openModal, workspaceId }: IProps) => {
  const { notify } = useGlobalState()
  const [activeBgOption, setActiveBgOption] = useState<IBgOptions>(
    NEW_BOARD_BG_OPTIONS[0]
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")

  const handleCreateBoard = async () => {
    if (!title) {
      return notify({ description: "Board requires a title" })
    }
    setLoading(true)

    await clientRequest
      .createNewBoard({
        title,
        activeBg: activeBgOption?.image ? "image" : "color",
        prefs: {
          image: activeBgOption?.image,
          color: activeBgOption?.color || "#838c91",
        },
        workspaceId,
      })
      .then(res => {
        router.push(`/${ROUTES.board}/${res?.data?.id}`)
      })
      .catch(err => {})
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value)
  }

  const handleSelectedColor = (newOption: any) => setActiveBgOption(newOption)

  useEffect(() => {
    return () => {
      toggleModal()
    }
  }, [toggleModal])

  return (
    <StyledModal onClose={toggleModal} isOpen={openModal}>
      <ModalOverlay className="new-board-overlay" />
      <ModalContent className="create-modal-content">
        <ModalBody>
          <NewBoardStyles
            image={activeBgOption.image}
            color={activeBgOption.color}
            className="board-bg-wrapper d-flex justify-content-between"
          >
            <div className="input-wrapper">
              <Input
                value={title}
                onChange={handleChange}
                autoFocus
                placeholder="Add board title"
                name="title"
                required
              />

              <div className="icon-wrapper">
                <FiX size={18} cursor="pointer" onClick={toggleModal} />
              </div>
            </div>
            <div className="board-bg-options flex-grow-1">
              <ul className="board-bg-colors gap">
                {NEW_BOARD_BG_OPTIONS.map(option => (
                  <li key={option.key}>
                    <Link href="/">
                      <a
                        id={option.image || option.color}
                        onClick={() => handleSelectedColor(option)}
                      >
                        <BoardBgOption
                          image={option.image}
                          color={option.color}
                        >
                          {activeBgOption.key === option.key && <FiCheck />}
                        </BoardBgOption>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </NewBoardStyles>
        </ModalBody>

        <ModalFooter className="new-board-modal-footer" justifyContent="end">
          <Button
            id="create-board"
            onClick={handleCreateBoard}
            disabled={loading}
            isLoading={loading}
            size="sm"
            colorScheme={!title ? "gray" : "blue"}
          >
            Create board
          </Button>
        </ModalFooter>
      </ModalContent>
    </StyledModal>
  )
}

export default NewBoardModal
