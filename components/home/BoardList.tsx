import { isEmpty } from "lodash"
import { useAuth, useGlobalState } from "../../lib/providers"
import BoardsGroup from "./BoardsGroup"

const BoardList = () => {
  const { boards, workspaces } = useGlobalState()
  const { user } = useAuth()

  const starredBoards = boards?.filter(board => board.prefs.starred === "true")
  const viewedRecentBoards = boards
    ?.filter(board => user.viewedRecent.includes(board.id))
    .reverse()

  return (
    <>
      <BoardsGroup
        heading="Starred boards"
        icon="star"
        boards={starredBoards}
        category="starred"
      />
      <BoardsGroup
        heading="Recently viewed"
        icon="clock"
        boards={viewedRecentBoards}
        category="recent"
      />

      <h5 className="home-boards-group-text">YOUR WORKSPACES</h5>

      {workspaces?.map(workspace => {
        return (
          <BoardsGroup
            heading={`${workspace.name} workspace`}
            boards={boards?.filter(board =>
              board.workspaces.includes(workspace?.id)
            )}
            category="workspaces"
            workspaceId={workspace.id}
          />
        )
      })}
    </>
  )
}

export default BoardList
