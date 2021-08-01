import { useCallback } from "react"
import { useState } from "react"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import styled from "styled-components"

import { OverlayTrigger, Tooltip } from "react-bootstrap"

import { upgradeToolTipText } from "../../util/copy"
import NewBoardModal from "./NewBoardModal"

const CreateBoardTile = styled.li`
  width: 23.5%;
  padding: 0;
  margin: 0 2% 2% 0;
  transform: translate(0);
  position: relative;
  cursor: pointer;
  list-style: none;
  max-width: 190px;
  min-width: 172px;

  .create-board {
    padding: 4px 8px;
    background-color: rgba(9, 30, 66, 0.04);
    box-shadow: none;
    border: none;
    color: #172b4d;
    display: table-cell;
    height: 100px;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    width: inherit;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    border-radius: 3px;
    background-size: cover;
    background-position: 50%;
    line-height: 20px;
    padding: 8px;
    position: relative;
    text-decoration: none;

    p {
      margin: 0;
      span {
        color: #172b4d;
        font-weight: 400;
        text-align: center;
        font-size: 14px;
      }

      .create-board-remaining {
        font-size: 13px;
      }
    }

    svg {
      position: absolute;
      bottom: 8px;
      right: 8px;
    }
  }
`

const StyledTooltip = styled(Tooltip)`
  background-color: #fff;
`

const CreateBoard = () => {
  const [openModal, setOpenModal] = useState()

  const toggleModal = useCallback(() => setOpenModal(prev => !prev), [])

  return (
    <>
      <CreateBoardTile onClick={toggleModal} className="create-board-tile">
        <div className="create-board">
          <p>
            <span className="create-board-title">Create new board</span>
          </p>
          <p>
            <span className="create-board-remaining">{`2 remaining`}</span>
          </p>
          <OverlayTrigger
            placement="top"
            overlay={
              <StyledTooltip id="tooltip-top">
                {upgradeToolTipText(8)}
              </StyledTooltip>
            }
          >
            <AiOutlineQuestionCircle size={15} />
          </OverlayTrigger>
        </div>
      </CreateBoardTile>
      {openModal && (
        <NewBoardModal openModal={openModal} toggleModal={toggleModal} />
      )}
    </>
  )
}

export default CreateBoard
