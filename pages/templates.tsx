import { GetServerSidePropsContext } from "next"

import { withAuthComponent, withAuthSsp } from "../lib/hocs"
import ApiRequest from "../api"
import SidebarLayout from "../components/layout/sidebar/SidebarLayout"
import Templates from "../components/home/Templates"
import { ROUTES } from "../util/constants"

const index = () => {
  return (
    <SidebarLayout>
      <Templates />
    </SidebarLayout>
  )
}

export const getServerSideProps =
  withAuthSsp()
  // async (ctx: GetServerSidePropsContext) => {
  //   const ssrRequest = new ApiRequest(ctx.req?.headers)
  //   let hasData = false
  //   if (hasData) return null

  //   const workspaceId = ctx?.params?.id as string
  //   return await ssrRequest
  //     .getWorkspaceById(workspaceId)
  //     .then(res => {
  //       hasData = true
  //       return res?.data
  //     })
  //     .catch(err => {
  //       return {
  //         redirect: {
  //           destination: ROUTES.home,
  //           permanent: false,
  //         },
  //       }
  //     })
  // },
  // { protected: true }

export default withAuthComponent(index)
