import { IActivity } from "../../board/canvas/card/Activities"
import Link from "next/link"

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
      case "created:board":
        return ` created this board.`

      case "add:list:to:board":
        return ` created this ${activity?.data?.list?.name}.`

      case "created:card":
        return (
          <span>
            {" "}
            added{" "}
            {
              <Link href={getCardHref(activity?.data)}>
                <a href="/">Card</a>
              </Link>
            }{" "}
            to {activity?.data?.list?.name}.
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
