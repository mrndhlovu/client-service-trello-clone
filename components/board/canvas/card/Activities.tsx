import { useEffect, useState } from "react"
import { formatDistance } from "date-fns"
import styled from "styled-components"

import { clientRequest } from "../../../../api"
import { FormattedActivity } from "../../../shared"
import UserAvatar from "../../../shared/lib/UserAvatar"

export interface IActivity {
  data: { id: string; name: string; [key: string]: any }
  type: string
  memberCreator: {
    username: string
    id: string
    fullName?: string
  }
  translationKey: string
  initials: string
  createdAt: string
}

const Container = styled.div`
  .mod-attachment-type {
    margin-left: 26px;
    min-height: 32px;
    padding: 8px 0;
    position: relative;
  }

  .user-avatar {
    position: absolute;
    left: -38px;
    top: 12px;

    .avatar-button-text {
      font-size: 13px;
    }
  }

  .date {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 400;
  }

  .description {
    color: #172b4d;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  a {
    text-decoration: underline;
  }
`

const Activities = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const sortedList = activities?.sort((a, b) => {
    return new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime()
  })

  useEffect(() => {
    const getData = () => {
      clientRequest
        .getActivities()
        .then(res => setActivities(res.data))
        .catch(() => {})
    }

    getData()
  }, [])

  return (
    <Container>
      {sortedList.map((activity, index) => (
        <div className="mod-attachment-type" key={index}>
          <div className="user-avatar">
            <UserAvatar initials={activity?.initials} />
          </div>
          <FormattedActivity activity={activity} />
          <div className="date">
            {formatDistance(new Date(activity?.createdAt), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      ))}
    </Container>
  )
}

export default Activities
