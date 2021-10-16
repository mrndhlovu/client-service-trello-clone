import styled from "styled-components"
import { getSortedSearch } from "../../../util"
import { ROUTES } from "../../../util/constants"
import { SearchResponse } from "react-instantsearch-dom"

import { NextLink } from "../../shared"
import { isEmpty } from "lodash"
import { MouseEvent } from "react"
import { useRouter } from "next/router"
import { useLocalStorage } from "../../../lib/hooks"

const Container = styled.div`
  li {
    list-style-type: none;
  }

  section {
    margin: 10px;
  }

  .board-list {
    margin-bottom: 14px;
    padding-top: 3px;

    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      flex-basis: 50%;
      max-width: 50%;
    }
  }

  .item-detail {
    display: flex;
    position: relative;
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-direction: column;
  }

  .detail {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;

    display: block;
    padding-right: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const WorkspaceItem = styled.li`
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  padding: 2px 0;
  list-style-type: none;
  border-radius: 2px;
  cursor: pointer;
  padding-left: 5px;
  position: relative;

  a {
    height: 100%;
    width: max-content;
  }

  &:hover {
    background-color: #026aa7;
    color: #fff;
  }
`

const CardItem = styled.li`
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  padding: 2px 0;
`

const ListItem = styled.li`
  .board-content {
    display: flex;
    padding-left: 4px;
    margin: 4px 0;
  }

  a {
    display: flex;
    font-weight: 700;
    height: 32px;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
  }
`

const BoardBackground = styled.div`
  background-color: rgb(210, 144, 52);
  display: inline-block;
  flex: 0 0 auto;
  background-size: cover;
  border-radius: 4px;
  height: 32px;
  width: 40px;
  position: relative;
  opacity: 1;
`

const Search = ({ data }: { data: SearchResponse }) => {
  const { boards, cards, workspaces } = getSortedSearch(data?.hits || [])
  const router = useRouter()
  const hasBoards = !isEmpty(boards)
  const hasCards = !isEmpty(cards)
  const hasWorkspaces = !isEmpty(workspaces)

  const [, setOpenCardModalId] = useLocalStorage("CARD_OPEN_ID", "")

  const handleCardClick = (ev: MouseEvent) => {
    const [cardId, redirect] = ev.currentTarget.id.split("|")

    setOpenCardModalId(cardId)
    router.push(redirect)
  }

  return (
    <Container className="search-content">
      {hasBoards && (
        <section className="board-list">
          <div className="search-content-header">Boards</div>
          <ul>
            {boards.map(item => (
              <ListItem key={item?.objectID}>
                <div className="board-content">
                  <NextLink href={`/${ROUTES.board}/${item?.objectID}`}>
                    <BoardBackground />
                    <div className="item-detail">
                      <div className="detail">{item?.board?.title}</div>
                      <div className="detail">{item?.board?.workspace}</div>
                    </div>
                  </NextLink>
                </div>
              </ListItem>
            ))}
          </ul>
        </section>
      )}

      {hasCards && (
        <section>
          <div className="search-content-header">Cards</div>
          <ul>
            {cards.map(item => (
              <ListItem key={item?.objectID}>
                <div className="board-content">
                  <NextLink
                    id={`${
                      item?.objectID
                    }|${`/${ROUTES.board}/${item?.card?.boardId}`}`}
                    onClick={handleCardClick}
                    href="#"
                  >
                    <BoardBackground />
                    <div className="item-detail">
                      <div className="detail">{item?.card?.title}</div>
                      {router.asPath.indexOf(item?.card?.boardId) !== -1 && (
                        <div className="detail">
                          Card is on currently open board
                        </div>
                      )}
                    </div>
                  </NextLink>
                </div>
              </ListItem>
            ))}
          </ul>
        </section>
      )}

      {hasWorkspaces && (
        <section>
          <ul>
            <div className="search-content-header">Workspaces</div>
            {workspaces.map(item => (
              <NextLink
                key={item?.objectID}
                href={`/${ROUTES.workspace}/${item?.objectID}/edit`}
              >
                <WorkspaceItem>{item?.workspace?.title}</WorkspaceItem>
              </NextLink>
            ))}
          </ul>
        </section>
      )}
    </Container>
  )
}

export default Search
