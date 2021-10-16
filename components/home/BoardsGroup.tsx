import { MouseEvent } from "react"
import { useRouter } from "next/router"
import styled, { css } from "styled-components"

import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai"

import CreateBoard from "./CreateBoard"
import { IBoard, useGlobalState } from "../../lib/providers"
import { Button, ButtonGroup } from "@chakra-ui/button"
import { ROUTES, WORKSPACE_TAB_OPTIONS } from "../../util/constants"
import { NextLink } from "../shared"

interface ITileProps {
  imageCover?: string
  colorCover?: string
}

interface IProps {
  heading?: string
  icon?: "star" | "clock"
  boards: IBoard[]
  category?: "starred" | "workspaces" | "recent"
  workspaceId?: string
  iconColor?: string
  isDefault?: boolean
  disableHeader?: boolean
}

const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;
`

export const TitleIcon = styled.div<{
  iconColor: string
}>`
  width: 30px;
  height: 30px;
  background: ${props => props.iconColor};
  padding: 10px;
  position: relative;
  border-radius: 3px;
  padding-top: 11px;

  span {
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    ${props => props.theme.styles.absoluteCenter};
  }
`

export const Tile = styled.li<ITileProps>`
  list-style: none;
  width: 23.5%;
  max-width: 195px;
  min-width: 172px;
  margin: 0 2% 2% 0;
  overflow: hidden;
  width: 100%;

  .home-boards-tile-details {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 2px;
    height: 100px;
    width: 100%;
    padding: 6px 8px;

    ${props =>
      props?.imageCover
        ? css<ITileProps>`
            background-size: cover;
            background-color: ${props => props?.colorCover};
            background-image: url("${props => props?.imageCover}");
            background-position: center center;
            transition: opacity 85ms;
            background-repeat: no-repeat;
            transition: opacity 85ms;
          `
        : css<ITileProps>`
            background-size: initial;
            background-position: left center;
            background-color: ${props => props?.colorCover};
          `};

    .home-boards-tile-detail {
      ${props =>
        props.theme.mixins.flex(undefined, "space-between", "flex-end")};
      font-size: 12px;
      color: #fff;
      width: 100%;

      h6 {
        font-size: 13px;
        font-weight: 400;
        color: #fff;
        margin: 0;
      }
    }

    .home-boards-tile-title {
      overflow: hidden;
      text-overflow: ellipsis;
      ${props => props.theme.mixins.lineClamp(2)};
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }

    .home-tile-star {
      visibility: hidden;
      color: #fff;
      z-index: 10;

      &:hover {
        transform: scale(1.2);
        animation-duration: 300ms;

        .home-boards-tile-details {
          pointer-events: none;
        }
      }
    }

    &:hover {
      opacity: 0.8;

      .home-tile-star {
        visibility: visible;
        animation: ${props => props.theme.keyframes.slideInStar};
        animation-duration: 300ms;
      }
    }

    .home-tile-star.active {
      visibility: visible;
      color: ${props => props.theme.colors.amazon};
    }
  }

  a {
    height: 100%;
    z-index: 0;
  }

  @media ${props => props.theme.device.mobileLg} {
    margin: 0 10px 10px 0;
  }

  @media ${props => props.theme.device.mobileXs} {
    margin: 0 8px 10px 0;
    min-width: 100%;
  }
`

const BoardsGroup = ({
  heading,
  icon,
  boards,
  category,
  workspaceId,
  iconColor,
  isDefault,
  disableHeader = false,
}: IProps) => {
  const router = useRouter()
  const { handleStarBoard } = useGlobalState()

  const canShowBoardGroup =
    boards?.length > 0 || category === "workspaces" || category === "recent"

  const handleStarClick = (ev: MouseEvent) => {
    ev.stopPropagation()
    ev.preventDefault()

    const board = boards.find(board => board.id === ev.currentTarget.id)
    handleStarBoard(board)
  }

  const getIcon = () => {
    switch (icon) {
      case "star":
        return <AiOutlineStar size={22} />

      case "clock":
        return <AiOutlineClockCircle size={22} />

      default:
        return (
          <TitleIcon
            iconColor={iconColor}
            className="home-group-workspace-icon"
          >
            <span>{heading?.split("")?.[0]}</span>
          </TitleIcon>
        )
    }
  }

  return canShowBoardGroup ? (
    <div className="home-boards-group">
      {!disableHeader && (
        <div className="home-group-header">
          <div className="home-group-header-icon">
            <span>{getIcon()}</span>
            <h5 className="home-boards-group-text">{heading}</h5>
          </div>

          {workspaceId !== undefined && (
            <ButtonGroup>
              {WORKSPACE_TAB_OPTIONS.map(
                option =>
                  !option?.disableButton && (
                    <NextLink
                      href={`${ROUTES.workspace}/${workspaceId}/${option.key}`}
                      id={option.key}
                      className="next-link-btn"
                      key={option.key}
                    >
                      {option.title}
                    </NextLink>
                  )
              )}
            </ButtonGroup>
          )}
        </div>
      )}

      <ListWrapper className="d-flex justify-content-flex-start">
        {boards?.map(board => {
          const isStarred = Boolean(board?.prefs?.starred === "true")
          const imageCover =
            board.activeBg === "image" ? board?.prefs.image : ""
          const colorCover = board?.prefs?.color
          return (
            <Tile
              key={board?.id}
              colorCover={colorCover}
              imageCover={imageCover}
            >
              <NextLink
                id={`board/${board?.id}`}
                href={`/board/${board?.id}`}
                className="home-boards-tile-details"
              >
                <div className="home-boards-tile-title">{board?.title}</div>
                <div className="home-boards-tile-detail">
                  <h6>{board?.title}</h6>
                  <div>
                    <AiOutlineStar
                      className={`home-tile-star ${isStarred ? "active" : ""}`}
                      size={15}
                      id={board.id}
                      onClick={handleStarClick}
                    />
                  </div>
                </div>
              </NextLink>
            </Tile>
          )
        })}

        {category === "workspaces" && (
          <CreateBoard
            numberOfBoards={boards.length}
            workspaceId={workspaceId}
            isDefault={isDefault}
          />
        )}
      </ListWrapper>
    </div>
  ) : null
}

export default BoardsGroup
