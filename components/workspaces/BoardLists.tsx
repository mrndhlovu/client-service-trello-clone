import { useGlobalState, Workspace } from "../../lib/providers"
import BoardsGroup from "../home/BoardsGroup"

const BoardLists = ({ workspace }: { workspace: Workspace }) => {
  const { boards } = useGlobalState()

  return (
    <div>
      <BoardsGroup
        category="workspaces"
        heading={workspace.name}
        iconColor={workspace.iconColor}
        workspaceId={workspace.id}
        boards={boards?.filter(board =>
          board.workspaces.includes(workspace?.id)
        )}
        disableHeader
      />
    </div>
  )
}

export default BoardLists
