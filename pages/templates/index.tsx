import { withAuthComponent, withAuthSsp } from "../../lib/hocs"
import SidebarLayout from "../../components/layout/sidebar/SidebarLayout"
import Templates from "../../components/home/Templates"

const index = () => {
  return (
    <SidebarLayout>
      <Templates />
    </SidebarLayout>
  )
}

export const getServerSideProps = withAuthSsp()

export default withAuthComponent(index)
