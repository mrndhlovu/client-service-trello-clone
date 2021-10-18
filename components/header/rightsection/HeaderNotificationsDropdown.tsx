import { formatDistance } from "date-fns"
import { isEmpty } from "lodash"
import { MouseEvent, useState } from "react"
import { FiBell } from "react-icons/fi"
import styled from "styled-components"

import { clientRequest } from "../../../api"
import { INotification, useGlobalState } from "../../../lib/providers"
import { UIDropdown } from "../../shared"
import UserAvatar from "../../shared/lib/UserAvatar"
import HeaderButton from "../HeaderButton"
import NotificationModal from "./NotificationModal"

const NotificationItem = styled.div<{ isHighlighted: boolean }>`
  position: relative;
  background-color: ${props => (props.isHighlighted ? "#eee" : "initial")};
  padding: 5px;
  border-radius: 2px;

  .avatar-auth-button {
    position: absolute;
    margin-top: 4px;
  }

  .content {
    display: grid;
    font-weight: 600;
    font-size: 12px;
    margin-left: 36px;
  }

  .time {
    font-size: 12px;
    font-weight: 200;
  }

  .link-btn {
    text-decoration: underline;
    margin: 5px 5px;

    &:hover {
      color: ${props => props.theme.colors.error};
    }
  }
`

const HeaderNotificationsDropdown = () => {
  const { notifications, setNotifications } = useGlobalState()

  const hasNotification = !isEmpty(notifications)
  const hasUnReadNotifications = notifications?.some(item => !item.isRead)
  const [selectedMessage, setSelectedMessage] = useState<
    INotification | undefined
  >()

  const toggleReadStatus = (ev: MouseEvent) => {
    const notification = notifications.find(
      item => item.id === ev.currentTarget?.id
    )
    const notificationId = notification?.id

    const data = { isRead: !notification?.isRead }

    clientRequest
      .updateNotification(notificationId, data)
      .then(res => {
        setNotifications(prev => [
          ...prev.map(item => (item.id === notificationId ? res.data : item)),
        ])
      })
      .catch(err => {})
  }

  const handleDelete = (ev: MouseEvent) => {
    const notification = notifications.find(
      item => item.id === ev.currentTarget?.id
    )
    const notificationId = notification.id

    const data = { archived: true }

    clientRequest
      .updateNotification(notificationId, data)
      .then(() => {
        if (!!selectedMessage) {
          toggleNotificationsModal()
        }
        setNotifications(prev => [
          ...prev.filter(item => item.id !== notificationId),
        ])
      })
      .catch(() => {})
  }

  const toggleNotificationsModal = (ev?: MouseEvent) => {
    if (!ev) {
      return setSelectedMessage(undefined)
    }

    const notification = notifications.find(
      item => item.id === ev.currentTarget?.id
    )

    if (!notification.isRead) {
      toggleReadStatus(ev)
    }

    setSelectedMessage({ ...notification, isRead: true })
  }

  return (
    <UIDropdown
      heading="Notifications"
      toggle={
        <HeaderButton
          className={`header-button notifications ${
            hasUnReadNotifications ? "active" : ""
          }`}
        >
          <FiBell />
        </HeaderButton>
      }
    >
      <div />

      {notifications?.map((item, index) => (
        <NotificationItem
          key={index}
          isHighlighted={!item.isRead}
          className="notification"
        >
          <UserAvatar initials="M" />

          <div className="content">
            <div className="notification-content">{item.subject}</div>
            <div className="time">
              {" "}
              {formatDistance(new Date(item?.createdAt), new Date(), {
                addSuffix: true,
              })}
            </div>
            <div className="action-buttons">
              <button onClick={handleDelete} id={item.id} className="link-btn">
                Delete
              </button>
              <button
                onClick={toggleReadStatus}
                id={item.id}
                className="link-btn"
              >
                {item.isRead ? "Mark as unread" : "Mark as read"}
              </button>

              <button
                onClick={toggleNotificationsModal}
                className="link-btn"
                id={item.id}
              >
                Open
              </button>
            </div>
          </div>
        </NotificationItem>
      ))}
      {!hasNotification && <p>No new notifications</p>}
      {!!selectedMessage && (
        <NotificationModal
          isOpen={!!selectedMessage}
          onClose={toggleNotificationsModal}
          handleDelete={handleDelete}
          toggleReadStatus={toggleReadStatus}
          selectedMessage={selectedMessage}
        />
      )}
    </UIDropdown>
  )
}

export default HeaderNotificationsDropdown
