import UserAvatar from "../../../shared/lib/UserAvatar"
import { IAction } from "./Activities"

import CommentItem from "./CommentItem"

interface IProps {
  defaultValue?: string
  initials?: string
  updateActionsList: (dat: IAction) => void
}

const CommentModule = ({
  defaultValue,
  initials,
  updateActionsList,
}: IProps) => {
  return (
    <div className="mod-comment">
      {!defaultValue && (
        <div className="user-avatar">
          <UserAvatar initials={initials} />
        </div>
      )}
      <CommentItem
        defaultValue={defaultValue}
        updateActionsList={updateActionsList}
      />
    </div>
  )
}

export default CommentModule
