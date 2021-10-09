import { MouseEvent } from "react"
import { formatDistance } from "date-fns"

import { clientRequest } from "../../../../api"
import { FormattedAction } from "../../../shared"
import { useBoard, useCardContext } from "../../../../lib/providers"
import CommentModule from "./CommentModule"
import StyleActivities from "./StyleActivities"
import UserAvatar from "../../../shared/lib/UserAvatar"

export interface IAction {
  entities: { boardId: string; name?: string; [key: string]: any }
  type: string
  memberCreator: {
    username: string
    id: string
    fullName?: string
  }
  translationKey: string
  initials: string
  createdAt: string
  updatedAt: string
  id: string
}

const Activities = ({
  showActivities,
  showCommentOption = true,
}: {
  showActivities: boolean
  showCommentOption?: boolean
}) => {
  const { togglePreviewModal } = useCardContext()
  const { activities, pagination, loadMoreActions } = useBoard()

  return (
    <>
      {showCommentOption && <CommentModule />}

      {showActivities && (
        <StyleActivities>
          {activities?.map((action, index) => (
            <div className="mod-preview-type" key={index}>
              <div className="user-avatar">
                <UserAvatar initials={action?.initials} />
              </div>
              <FormattedAction
                openPreviewModal={togglePreviewModal}
                action={action}
              />
              {action?.type !== "comment" &&
                action?.entities?.attachment?.type !== "link" &&
                action?.createdAt && (
                  <div className="date">
                    {formatDistance(new Date(action?.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                )}
            </div>
          ))}

          {pagination.hasNextPage && (
            <button onClick={loadMoreActions} className="link-btn actions">
              Load more actions
            </button>
          )}
        </StyleActivities>
      )}
    </>
  )
}

export default Activities
