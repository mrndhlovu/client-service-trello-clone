import SidebarLayout from "../layout/sidebar/SidebarLayout"

import BoardList from "./BoardList"
import StyleHomePage from "./StyleHomePage"

const HomePage = () => {
  return (
    <SidebarLayout>
      <StyleHomePage>
        <BoardList />
      </StyleHomePage>
    </SidebarLayout>
  )
}

export default HomePage
