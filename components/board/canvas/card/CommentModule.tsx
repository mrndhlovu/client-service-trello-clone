import { useCardContext } from "../../../../lib/providers"
import UserAvatar from "../../../shared/lib/UserAvatar"

import CommentItem from "./CommentItem"

interface IProps {
  defaultValue?: string
  initials?: string
}

const CommentModule = ({ defaultValue, initials }: IProps) => {
  const { updateActionsList } = useCardContext()

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
