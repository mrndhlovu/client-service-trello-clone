import { DiTrello } from "react-icons/di"
import { FiTrello, FiActivity } from "react-icons/fi"
import { CgViewList } from "react-icons/cg"
import { HiOutlineUsers } from "react-icons/hi"
import { RiSettings5Line } from "react-icons/ri"

const TabIcon = ({ icon }) => {
  const Icon = () => {
    switch (icon) {
      case "boards":
      case "workspace-boards":
        return <DiTrello />
      case "templates":
        return <FiTrello />
      case "workspace-table":
        return <CgViewList />
      case "workspace-members":
        return <HiOutlineUsers />

      case "workspace-account":
        return <RiSettings5Line />
      default:
        return <FiActivity />
    }
  }

  return <Icon />
}

export default TabIcon
