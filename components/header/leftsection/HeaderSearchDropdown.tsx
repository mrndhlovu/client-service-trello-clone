import { ChangeEvent, useRef, useState } from "react"
import { FiSearch } from "react-icons/fi"
import styled from "styled-components"
import { InstantSearch, SearchResponse } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import { Input } from "@chakra-ui/react"

import { UIPopOver } from "../../shared"
import { useAuth, useGlobalState } from "../../../lib/providers"
import HeaderBoardStyles from "./HeaderBoardStyles"
import HeaderBoardGroup from "./HeaderBoardGroup"
import Search from "./Search"

const Container = styled.div`
  position: relative;

  li {
    list-style: none;
  }
`

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY_ID
)
const INDEX_NAME = "dev_tusks"

const HeaderSearchDropdown = () => {
  const { boards } = useGlobalState()

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchHits, setSearchHits] = useState<
    SearchResponse<unknown> | undefined
  >()
  const { user } = useAuth()
  const inputRef = useRef<HTMLInputElement>()

  const viewedRecentBoards = boards
    ?.filter(board => user.viewedRecent.includes(board.id))
    .sort((a, b) => {
      const dateA = new Date(a.lastViewed).getTime()
      const dateB = new Date(b.lastViewed).getTime()

      return dateA < dateB ? 1 : -1
    })
    .slice(0, 6)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    setSearchQuery(ev.target.value)
    if (ev.target.value) {
      handleSearch(ev.target.value)
    }
  }

  const handleSearch = (query: string) => {
    searchClient
      .initIndex(INDEX_NAME)
      .search(query, { facets: ["type"], filters: `userId:${user.id}` })
      .then(data => {
        setSearchHits(data)
      })
      .catch(err => console.log(err))
  }

  const close = () => {
    setSearchHits(undefined)
    setSearchQuery("")
    inputRef.current.value = ""
  }

  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
      <UIPopOver
        heading="Search"
        ref={inputRef}
        handleClose={close}
        toggle={
          <Container className="header-search-content">
            <label htmlFor="search">Search</label>

            <Input
              name="search"
              defaultValue={searchQuery}
              onChange={handleChange}
              placeholder="Search"
              ref={inputRef}
              autoComplete="off"
              type="text"
            />

            <span>
              <FiSearch />
            </span>
          </Container>
        }
      >
        {!!searchQuery && <Search data={searchHits} />}
        {!searchQuery && (
          <HeaderBoardStyles>
            <div className="search-content-header">Recent boards</div>
            <HeaderBoardGroup boards={viewedRecentBoards} category="recent" />
          </HeaderBoardStyles>
        )}
      </UIPopOver>
    </InstantSearch>
  )
}

export default HeaderSearchDropdown
