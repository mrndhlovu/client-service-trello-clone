import Link from "next/link"
import styled, { css } from "styled-components"

import { AiOutlineStar } from "react-icons/ai"
import { useBoard } from "../../lib/hooks/context"
import { useRouter } from "next/router"
import CreateBoard from "./CreateBoard"

const Tile = styled.li`
  list-style: none;
  width: 32%;
  max-width: 190px;
  min-width: 172px;
  margin: 0 2% 2% 0;
  overflow: hidden;

  .home-boards-tile-details {
    background-color: ${props => props?.color};
    background-image: url("${props => props?.image}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 2px;
    padding: 0 8px;

    .home-boards-tile-detail {
      ${props =>
        props.theme.mixins.flex(undefined, "space-between", "flex-end")};
      height: 100%;
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
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }

    .spacer {
      height: 42px;
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
    z-index: 1;
  }

  @media ${props => props.theme.device.mobileLg} {
    margin: 0 10px 10px 0;
  }

  @media ${props => props.theme.device.mobileXs} {
    margin: 0 0 10px 0;
    width: 100%;
    min-width: 100%;
  }
`

const BoardsGroup = ({ heading, icon, boards, category }) => {
  const router = useRouter()
  const { handleStarBoard } = useBoard()

  const handleClick = (ev, redirectTo) => {
    ev.preventDefault()
    router.push(redirectTo)
  }

  return (
    <div className="home-boards-group">
      <div className="home-group-header">
        <div className="home-group-header-icon">{icon}</div>
        <h5 className="home-boards-group-text">{heading}</h5>
      </div>

      <ul className="home-boards-group-list">
        {boards?.map(board => {
          const starred = board?.prefs?.starred === "true"
          return (
            <Tile
              key={board?.id}
              color={board?.prefs?.color}
              image={board?.prefs?.image}
            >
              <Link href="/">
                <a onClick={ev => handleClick(ev, `/board/${board?.id}`)}>
                  <div className="home-boards-tile-details">
                    <div className="home-boards-tile-title">{board?.title}</div>
                    <div className="spacer" />
                    <div className="home-boards-tile-detail">
                      <h6>{board?.title}</h6>
                      <div>
                        {
                          <AiOutlineStar
                            className={`home-tile-star ${
                              starred ? "active" : ""
                            }`}
                            size={15}
                            onClick={ev => handleStarBoard(ev, board)}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </Tile>
          )
        })}

        {category === "workspaces" && <CreateBoard />}
      </ul>
    </div>
  )
}

export default BoardsGroup
