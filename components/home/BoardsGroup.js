import Link from "next/link"
import styled, { css } from "styled-components"

import { AiOutlineStar } from "react-icons/ai"
import { useBoard } from "../../lib/hooks/context"
import { useRouter } from "next/router"
import CreateBoard from "./CreateBoard"

const ListWrapper = styled.ul`
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;
`

export const Tile = styled.li`
  list-style: none;
  width: 23.5%;
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
    height: 100px;

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

      <ListWrapper className="d-flex justify-content-flex-start">
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
      </ListWrapper>
    </div>
  )
}

export default BoardsGroup
