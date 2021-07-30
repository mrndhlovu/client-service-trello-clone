import Link from "next/link"
import { useState } from "react"
import styled from "styled-components"

import NewBoardModal from "./NewBoardModal"

const CreateBoardTile = styled.li`
  list-style: none;
  width: 32%;
  max-width: 190px;
  min-width: 172px;
  margin: 0 2% 2% 0;
  overflow: hidden;

  .create-board {
    background-color: rgba(9, 30, 66, 0.04);
    box-shadow: none;
    border: none;
    color: #172b4d;
    display: table-cell;
    height: 80px;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    width: inherit;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;

    .create-board-title {
    }
  }

  .create-board-modal {
  }
`

const CreateBoard = () => {
  const [openModal, setOpenModal] = useState()

  const toggleModal = () => setOpenModal(prev => !prev)

  return (
    <CreateBoardTile className="create-board-tile">
      <Link href="/">
        <a onClick={toggleModal}>
          <div className="create-board">
            <p>
              <span className="create-board-title">Create new board</span>
            </p>
            <p>
              <span className="create-board-title">{`2 remaining`}</span>
            </p>
          </div>
        </a>
      </Link>
      {openModal && (
        <NewBoardModal openModal={openModal} toggleModal={toggleModal} />
      )}
    </CreateBoardTile>
  )
}

export default CreateBoard
