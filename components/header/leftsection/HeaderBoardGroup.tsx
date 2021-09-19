import Link from "next/link"
import { MouseEvent } from "react"
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai"
import { FiStar } from "react-icons/fi"

import { IBoard, useBoard, useGlobalState } from "../../../lib/providers"
import { BoardItem } from "./HeaderBoardStyles"

interface IProps {
  boards: IBoard[]
  heading?: string
  category: "starred" | "workspaces" | "recent"
  icon?: "star" | "clock"
}

const HeaderBoardGroup = ({ boards, heading, icon, category }: IProps) => {
  const { handleStarBoard } = useGlobalState()

  const canShowBoardGroup =
    boards?.length > 0 || category === "workspaces" || category === "recent"

  const getIcon = () => {
    switch (icon) {
      case "star":
        return <AiOutlineStar size={15} />

      case "clock":
        return <AiOutlineClockCircle size={15} />

      default:
        return null
    }
  }

  const handleClick = (ev: MouseEvent) => {
    ev.stopPropagation()

    const board = boards.find(board => board.id === ev.currentTarget.id)
    handleStarBoard(board)
  }

  return canShowBoardGroup ? (
    <div className="group">
      <div className="group-header">
        <div className="group-header-icon">{getIcon()}</div>
        <h5 className="group-text">{heading}</h5>
      </div>
      {boards.map((board, index) => {
        const imageCover = board.activeBg === "image" ? board?.prefs.image : ""
        const colorCover = board?.prefs?.color
        const isStarred = Boolean(board?.prefs?.starred === "true")

        return (
          <BoardItem
            starred={isStarred}
            colorCover={colorCover}
            imageCover={imageCover}
            key={index}
          >
            <Link href={`/board/${board.id}`}>
              <a className="board-item">
                <div className="board-item-img" />
                <div className="board-item-title">
                  <div>{board.title}</div>
                </div>
              </a>
            </Link>
            <div className="star">
              <FiStar id={board.id} onClick={handleClick} />
            </div>
          </BoardItem>
        )
      })}
    </div>
  ) : null
}

export default HeaderBoardGroup
