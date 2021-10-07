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

const Activities = ({ showActivities }: { showActivities: boolean }) => {
  const { togglePreviewModal } = useCardContext()
  const { activities, setActivities } = useBoard()

  const handleDeleteComment = (ev?: MouseEvent) => {
    ev.stopPropagation()
    const commentId = ev.currentTarget.id

    clientRequest
      .deleteComment(commentId)
      .then(() => {
        setActivities(prev => [
          ...prev.filter(action => action?.id !== commentId),
        ])
      })
      .catch(() => {})
  }

  return (
    <>
      <CommentModule />

      {showActivities && (
        <StyleActivities>
          {activities.map((action, index) => (
            <div className="mod-preview-type" key={index}>
              <div className="user-avatar">
                <UserAvatar initials={action?.initials} />
              </div>
              <FormattedAction
                openPreviewModal={togglePreviewModal}
                handleDeleteComment={handleDeleteComment}
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
        </StyleActivities>
      )}
    </>
  )
}

export default Activities
