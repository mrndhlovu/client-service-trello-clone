import { IActivity } from "../../board/canvas/card/Activities"
import NextLink from "./NextLink"

export enum ACTION_KEYS {
  CREATE_BOARD = "created:board",
  DELETED_BOARD = "deleted:board",
  ARCHIVED_BOARD = "archived:board",

  CREATE_CARD = "created:card",
  TRANSFER_CARD = "transferred:card",
  COMMENT_ON_CARD = "commented:on:card",
  ADD_CHECKLIST = "added:checklist:to:card",
  MOVE_CARD_TO_LIST = "moved:card:from:list:to:list",
  MOVE_CARD_UP = "moved:card:up",
  MOVE_CARD_DOWN = "moved:card:down",
  DELETED_CARD = "deleted:card",
  ARCHIVED_CARD = "archived:card",
  CONVERT_TASK_TO_CARD = "converted:task:to:card",
  CHANGED_CARD_COVER = "added:card:cover",
  REMOVED_CARD_COVER = "removed:card:cover",
  ADD_CARD_ATTACHMENT = "added:card:attachment",
  REMOVE_CARD_ATTACHMENT = "removed:card:attachment",

  CREATE_LIST = "add:list:to:board",
  TRANSFER_LIST = "transferred:list",
  DELETED_LIST = "deleted:list",
  ARCHIVED_LIST = "archived:list",
}

const FormattedActivity = <T extends IActivity>({
  activity,
}: {
  activity: T
}) => {
  const name =
    activity.memberCreator?.fullName || `@${activity.memberCreator.username}`

  const getCardHref = (data: IActivity["data"]) =>
    `/board/${data?.id}?openModalId=${data?.card?.id}`

  const getString = () => {
    switch (activity.translationKey) {
      case ACTION_KEYS.CREATE_BOARD:
        return ` created this board.`

      case ACTION_KEYS.CREATE_LIST:
        return ` created the ${activity?.data?.list?.name} list.`

      case ACTION_KEYS.CREATE_CARD:
        return (
          <span>
            {" "}
            added{" "}
            <NextLink
              href={getCardHref(activity?.data)}
              linkText={activity.data?.card.name}
            />{" "}
            card to {activity?.data?.list?.name} list.
          </span>
        )

      case ACTION_KEYS.DELETED_BOARD:
        return ` created the ${activity?.data?.list?.name}.`

      case ACTION_KEYS.ADD_CHECKLIST:
        return (
          <span>
            {" "}
            added a checklist on{" "}
            <NextLink
              href={getCardHref(activity?.data)}
              linkText={activity.data.name}
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
