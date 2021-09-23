import { ACTION_KEYS } from "@tusksui/shared"
import { MouseEvent } from "react"
import { IActivity } from "../../board/canvas/card/Activities"
import NextLink from "./NextLink"

const FormattedActivity = <T extends IActivity>({
  activity,
  openPreviewModal,
}: {
  activity: T
  openPreviewModal: (ev: MouseEvent) => void
}) => {
  const name =
    activity.memberCreator?.fullName || `@${activity.memberCreator.username}`

  const getHref = (data: IActivity["entities"], isBoardHref?: boolean) => {
    if (isBoardHref) {
      return `/board/${data?.boardId}`
    }

    return `/board/${data?.boardId}?openModalId=${data?.card?.id}`
  }

  const getString = () => {
    switch (activity.translationKey) {
      case ACTION_KEYS.CREATE_BOARD:
        return ` created this board.`

      case ACTION_KEYS.CREATE_LIST:
        return ` created the ${activity?.entities?.list?.name} list.`

      case ACTION_KEYS.CREATE_CARD:
        return (
          <span>
            {" "}
            added{" "}
            <NextLink
              href={getHref(activity?.entities)}
              linkText={activity.entities?.card.name}
            />{" "}
            card to {activity?.entities?.list?.name} list.
          </span>
        )

      case ACTION_KEYS.DELETED_BOARD:
        return ` deleted the board ${activity?.entities?.name}.`

      case ACTION_KEYS.ARCHIVED_BOARD:
        return ` archived the board ${activity?.entities?.name}.`

      case ACTION_KEYS.DELETED_CARD:
        return ` deleted ${activity?.entities?.card?.name} card.`

      case ACTION_KEYS.ARCHIVED_CARD:
        return ` archived ${activity?.entities?.card?.name} card.`

      case ACTION_KEYS.REMOVE_CARD_ATTACHMENT:
        return ` removed attachment ${activity?.entities?.attachment?.name}.`

      case ACTION_KEYS.MOVE_LIST_LEFT:
        return <span> moved {activity?.entities?.list?.name} down.</span>

      case ACTION_KEYS.MOVE_LIST_RIGHT:
        return <span> moved {activity?.entities?.list?.name} right.</span>

      case ACTION_KEYS.ADD_CARD_ATTACHMENT:
        const previewId = `${activity?.entities?.attachment?.url}|${activity?.entities?.attachment?.id}`
        return (
          <span>
            {" "}
            attached{" "}
            <NextLink
              href="#"
              linkText={activity?.entities?.attachment?.name}
              onClick={openPreviewModal}
              id={previewId}
            />{" "}
            {activity?.entities?.card?.name && (
              <>
                to{" "}
                <NextLink
                  onClick={openPreviewModal}
                  href="#"
                  id={previewId}
                  linkText={activity?.entities?.card?.name}
                />
              </>
            )}
            <div className="preview">
              <img
                src={activity?.entities?.attachment?.url}
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
              href={getHref(activity?.entities)}
              linkText={activity?.entities?.card?.name}
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
              href={getHref(activity?.entities)}
              linkText={activity?.entities?.card?.name}
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
              href={getHref(activity?.entities)}
              linkText={activity?.entities?.card?.name}
            />{" "}
            from {activity?.entities?.list?.name} to{" "}
            {activity?.entities?.targetList?.name}.
          </span>
        )

      case ACTION_KEYS.TRANSFER_CARD:
        return (
          <span>
            {" "}
            transferred{" "}
            <NextLink
              href={getHref(activity?.entities)}
              linkText={activity?.entities?.card?.name}
            />{" "}
            from {activity?.entities?.list?.name} to{" "}
            {activity?.entities?.targetList?.name} on{" "}
            <NextLink
              href={getHref(activity?.entities, true)}
              linkText={activity?.entities?.targetBoard?.name}
            />{" "}
            board .
          </span>
        )

      case ACTION_KEYS.TRANSFER_LIST:
        return (
          <span>
            {" "}
            transferred {activity?.entities?.list?.name} from{" "}
            <NextLink
              href={getHref(activity?.entities, true)}
              linkText={activity?.entities?.name}
            />{" "}
            to{" "}
            <NextLink
              href={getHref(activity?.entities?.targetBoard, true)}
              linkText={activity?.entities?.targetBoard?.name}
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
              href={getHref(activity?.entities)}
              linkText={activity?.entities?.card?.name}
            />{" "}
            card.
          </span>
        )

      default:
        return ""
    }
  }

  return (
    <span className="description">
      <strong>{name}</strong>
      {getString()}
    </span>
  )
}

export { FormattedActivity }
