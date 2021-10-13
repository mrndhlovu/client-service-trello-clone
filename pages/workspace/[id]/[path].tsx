import { TabPanel, TabPanels } from "@chakra-ui/tabs"
import { GetServerSidePropsContext } from "next"

import {
  Members,
  Settings,
  WorkspaceEditOptions,
} from "../../../components/workspaces"
import { ROUTES } from "../../../util/constants"
import { withAuthComponent, withAuthSsp } from "../../../lib/hocs"
import { Workspace } from "../../../lib/providers"
import ApiRequest from "../../../api"
import UserWorkspaceLayout from "../../../components/layout/UserWorkspaceLayout"
import BoardLists from "../../../components/workspaces/BoardLists"

const index = ({ data }: { data: Workspace }) => {
  return (
    <UserWorkspaceLayout workspace={data}>
      <TabPanels>
        <TabPanel>
          <BoardLists workspace={data} />
        </TabPanel>

        <TabPanel>
          <Members />
        </TabPanel>

        <TabPanel>
          <Settings workspace={data} />
        </TabPanel>

        <TabPanel>
          <WorkspaceEditOptions workspace={data} />
        </TabPanel>
      </TabPanels>
    </UserWorkspaceLayout>
  )
}

export const getServerSideProps = withAuthSsp(
  async (ctx: GetServerSidePropsContext) => {
    const ssrRequest = new ApiRequest(ctx.req?.headers)
    let hasData = false
    if (hasData) return null

    const workspaceId = ctx?.params?.id as string
    return await ssrRequest
      .getWorkspaceById(workspaceId)
      .then(res => {
        hasData = true
        return res?.data
      })
      .catch(err => {
        return {
          redirect: {
            destination: ROUTES.home,
            permanent: false,
          },
        }
      })
  },
  { protected: true }
)

export default withAuthComponent(index)
