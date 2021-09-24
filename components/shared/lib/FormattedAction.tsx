import { ACTION_KEYS } from "@tusksui/shared"
import { formatDistance } from "date-fns"
import { MouseEvent } from "react"

import { IAction } from "../../board/canvas/card/Activities"
import CommentItem from "../../board/canvas/card/CommentItem"
import NextLink from "./NextLink"

const FormattedAction = <T extends IAction>({
  action,
  openPreviewModal,
  handleDeleteComment,
  updateActionsList,
}: {
  action: T
  openPreviewModal: (ev: MouseEvent) => void
  handleDeleteComment: (ev: MouseEvent) => void
  updateActionsList?: (data: IAction, options?: { edited: boolean }) => void
}) => {
  const name =
    action.memberCreator?.fullName || `@${action.memberCreator.username}`

  const getHref = (data: IAction["entities"], isBoardHref?: boolean) => {
    if (isBoardHref) {
      return `/board/${data?.boardId}`
    }

    return `/board/${data?.boardId}?openModalId=${data?.card?.id}`
  }

  const ActionItem = () => {
    switch (action.translationKey) {
      case ACTION_KEYS.CREATE_BOARD:
        return <span> created this board.</span>

      case ACTION_KEYS.CREATE_LIST:
        return <span> created the {action?.entities?.list?.name} list.</span>

      case ACTION_KEYS.CREATE_CARD:
        return (
          <span>
            {" "}
            added{" "}
            <NextLink
              href={getHref(action?.entities)}
              linkText={action.entities?.card.name}
            />{" "}
            card to {action?.entities?.list?.name} list.
          </span>
        )

      case ACTION_KEYS.DELETED_BOARD:
        return <span> deleted the board {action?.entities?.name}.</span>

      case ACTION_KEYS.COMMENT_ON_CARD:
        return (
          <CommentItem
            commentId={action.id}
            defaultValue={action.entities?.comment.text}
            handleDeleteComment={handleDeleteComment}
            updateActionsList={updateActionsList}
          />
        )

      case ACTION_KEYS.ARCHIVED_BOARD:
        return <span> archived the board ${action?.entities?.name}.</span>

      case ACTION_KEYS.DELETED_CARD:
        return <span> deleted {action?.entities?.card?.name} card.</span>

      case ACTION_KEYS.ARCHIVED_CARD:
        return <span> archived {action?.entities?.card?.name} card.</span>

      case ACTION_KEYS.REMOVE_CARD_ATTACHMENT:
        return (
          <span> removed attachment {action?.entities?.attachment?.name}.</span>
        )

      case ACTION_KEYS.MOVE_LIST_LEFT:
        return <span> moved {action?.entities?.list?.name} down.</span>

      case ACTION_KEYS.MOVE_LIST_RIGHT:
        return <span> moved {action?.entities?.list?.name} right.</span>

      case ACTION_KEYS.ADD_CARD_ATTACHMENT:
        const previewId = `${action?.entities?.attachment?.url}|${action?.entities?.attachment?.id}`
        return (
          <span>
            {" "}
            attached{" "}
            <NextLink
              href="#"
              linkText={action?.entities?.attachment?.name}
              onClick={openPreviewModal}
              id={previewId}
            />{" "}
            {action?.entities?.card?.name && (
              <>
                to{" "}
                <NextLink
                  onClick={openPreviewModal}
                  href="#"
                  id={previewId}
                  linkText={action?.entities?.card?.name}
                />
              </>
            )}
            <div className="preview">
              <img
                src={action?.entities?.attachment?.url}
                alt="attachment"
                className="preview-img"
              />
            </div>
          </span>
        )

      case ACTION_KEYS.MOVE_CARD_DOWN:
        return (
          <span>
            {" "}
            moved{" "}
            <NextLink
              href={getHref(action?.entities)}
              linkText={action?.entities?.card?.name}
            />{" "}
            down.
          </span>
        )

      case ACTION_KEYS.MOVE_CARD_UP:
        return (
          <span>
            {" "}
            moved{" "}
            <NextLink
              href={getHref(action?.entities)}
              linkText={action?.entities?.card?.name}
            />{" "}
            up.
          </span>
        )

      case ACTION_KEYS.MOVE_CARD_TO_LIST:
        return (
          <span>
            {" "}
            moved{" "}
            <NextLink
              href={getHref(action?.entities)}
              linkText={action?.entities?.card?.name}
            />{" "}
            from {action?.entities?.list?.name} to{" "}
            {action?.entities?.targetList?.name}.
          </span>
        )

      case ACTION_KEYS.TRANSFER_CARD:
        return (
          <span>
            {" "}
            transferred{" "}
            <NextLink
              href={getHref(action?.entities)}
              linkText={action?.entities?.card?.name}
            />{" "}
            from {action?.entities?.list?.name} to{" "}
            {action?.entities?.targetList?.name} on{" "}
            <NextLink
              href={getHref(action?.entities, true)}
              linkText={action?.entities?.targetBoard?.name}
            />{" "}
            board .
          </span>
        )

      case ACTION_KEYS.TRANSFER_LIST:
        return (
          <span>
            {" "}
            transferred {action?.entities?.list?.name} from{" "}
            <NextLink
              href={getHref(action?.entities, true)}
              linkText={action?.entities?.name}
            />{" "}
            to{" "}
            <NextLink
              href={getHref(action?.entities?.targetBoard, true)}
              linkText={action?.entities?.targetBoard?.name}
            />{" "}
            board .
          </span>
        )

      case ACTION_KEYS.ADD_CHECKLIST:
        return (
          <span>
            {" "}
            added a checklist on{" "}
            <NextLink
              href={getHref(action?.entities)}
              linkText={action?.entities?.card?.name}
            />{" "}
            card.
          </span>
        )

      default:
        return null
    }
  }

  return (
    <span className="description">
      <div>
        <strong>{name}</strong>
        {action.type === "comment" && (
          <span className="date comment-timeline">
            {formatDistance(new Date(action?.updatedAt), new Date(), {
              addSuffix: true,
            })}
            {action?.entities?.comment?.edited && " (edited)"}
          </span>
        )}
      </div>
      <ActionItem />
    </span>
  )
}

export { FormattedAction }
