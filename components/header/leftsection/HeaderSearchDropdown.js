import { useState } from "react"
import { FiSearch } from "react-icons/fi"

import { UIDropdown } from "../../shared"

const HeaderSearchDropdown = () => {
  const [search, setSearch] = useState("")

  const handleSearch = ev => {
    ev.preventDefault()
    setSearch(ev.target.value)
  }

  return (
    <UIDropdown
      className="header-search-dropdown-button"
      toggle={
        <div className="header-search-content">
          <label>Search</label>
          <div>
            <input
              defaultValue={search}
              onChange={handleSearch}
              placeholder="Search"
            />
          </div>
          <span>
            <FiSearch />
          </span>
        </div>
      }
    ></UIDropdown>
  )
}

export default HeaderSearchDropdown
