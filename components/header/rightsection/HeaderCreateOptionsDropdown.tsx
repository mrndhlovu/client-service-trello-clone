import { MouseEvent, useState } from "react"
import styled from "styled-components"

import { FiPlus } from "react-icons/fi"
import { CgTrello } from "react-icons/cg"
import { BsPeople } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"

import { UIDropdown } from "../../shared"
import HeaderButton from "../HeaderButton"
import NewBoardModal from "../../home/NewBoardModal"
import CreateWorkspaceModal from "../CreateWorkspaceModal"
import TopTemplates from "./TopTemplates"

const Container = styled.div`
  p {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    margin: 4px 0 0 0;
    padding: 0;
    text-align: left;
  }

  .action-header {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .content {
    margin-bottom: 10px;
    cursor: pointer;
    padding: 5px;
    width: 100%;

    &:hover {
      background-color: #eee;
    }
  }

  .back-btn {
    position: absolute;
    left: 10px;
    top: 12px;
  }
`

const HeaderCreateOptionsDropdown = () => {
  const [modalIsOpen, setModalIsOpen] = useState<string | undefined>()

  const closeDialogOnSelect = modalIsOpen === "workspace"

  const handleBack = () => setModalIsOpen(undefined)

  const toggleActiveModal = (ev: MouseEvent) =>
    setModalIsOpen(ev?.currentTarget?.id)

  const CREATE_RESOURCE_OPTIONS = [
    {
      title: "Create board",
      id: "create-board",
      description: `A board is made up of cards 
      ordered on lists. Use it to manage projects, 
      track information, or organize anything.`,
      icon: <CgTrello />,
    },
    {
      title: "Start with template",
      id: "template",
      description: `Get started faster with a board template.`,
      icon: <CgTrello />,
    },

    {
      title: "Create Workspace",
      id: "workspace",
      description: `A Workspace is a group of boards and people. 
      Use it to organize your company, 
      side hustle, family, or friends.`,
      icon: <BsPeople />,
    },
  ]

  return (
    <Container>
      <UIDropdown
        heading="Create"
        closeOnSelect={closeDialogOnSelect}
        toggle={
          <span>
            <HeaderButton>
              <FiPlus />
            </HeaderButton>
          </span>
        }
      >
        {modalIsOpen === "template" ? (
          <>
            <IoIosArrowBack
              size={18}
              onClick={handleBack}
              className="back-btn"
            />
            <TopTemplates />
          </>
        ) : (
          CREATE_RESOURCE_OPTIONS.map(option => (
            <button
              key={option.id}
              id={option.id}
              onClick={toggleActiveModal}
              className="content link-btn"
            >
              <div className="action-header">
                {option.icon}

                <span>{option.title}</span>
              </div>
              <div>
                <p>{option.description}</p>
              </div>
            </button>
          ))
        )}
      </UIDropdown>
      {modalIsOpen === "create-board" && (
        <NewBoardModal
          openModal={modalIsOpen === "create-board"}
          toggleModal={toggleActiveModal}
        />
      )}

      {modalIsOpen === "workspace" && (
        <CreateWorkspaceModal
          openModal={modalIsOpen === "workspace"}
          toggleModal={toggleActiveModal}
        />
      )}
    </Container>
  )
}

export default HeaderCreateOptionsDropdown
