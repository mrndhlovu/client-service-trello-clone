import { Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { FiSearch } from "react-icons/fi"

const HeaderSearchDropdown = () => {
  const [search, setSearch] = useState("")

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    setSearch(ev.target.value)
  }

  return (
    <div className="header-search-content">
      <label>Search</label>
      <div>
        <Input
          defaultValue={search}
          onChange={handleSearch}
          placeholder="Search"
        />
      </div>
      <span>
        <FiSearch />
      </span>
    </div>
  )
}

export default HeaderSearchDropdown
