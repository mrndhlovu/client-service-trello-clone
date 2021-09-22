import { MouseEvent, useEffect, useState } from "react"
import { formatDistance } from "date-fns"
import styled from "styled-components"
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal"

import { clientRequest } from "../../../../api"
import { FormattedActivity } from "../../../shared"
import { useBoard } from "../../../../lib/providers"
import UserAvatar from "../../../shared/lib/UserAvatar"
import NextLink from "../../../shared/lib/NextLink"

export interface IActivity {
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
}

const Container = styled.div`
  .mod-attachment-type {
    margin-left: 26px;
    min-height: 32px;
    padding: 8px 0;
    position: relative;
  }

  .attachment {
    img {
      max-height: 300px;
      max-width: 100%;
      border: 1px solid #dfe1e6;
      border-radius: 3px;
      box-sizing: border-box;
      clear: both;
      display: block;
      margin: 8px 0 4px;
    }
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
  const { boardId } = useBoard()
  const sortedList = activities?.sort((a, b) => {
    return new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime()
  })

  const [attachment, setAttachment] = useState<
    { url: string; id: string } | undefined
  >()

  const modalIsOpen = attachment !== undefined

  const openAttachmentModal = (ev?: MouseEvent) => {
    if (!ev?.currentTarget.id) return setAttachment(undefined)

    const [url, id] = ev?.currentTarget?.id.split("|")
    setAttachment({ url, id })
  }

  const handleDelete = (ev?: MouseEvent) => {
    clientRequest
      .deleteAttachment(ev.currentTarget.id)
      .then(() => openAttachmentModal())
      .catch(() => {})
  }

  useEffect(() => {
    const getData = () => {
      clientRequest
        .getActivities(boardId)
        .then(res => setActivities(res.data))
        .catch(() => {})
    }

    getData()
  }, [])

  return (
    <>
      <Container>
        {sortedList.map((activity, index) => (
          <div className="mod-attachment-type" key={index}>
            <div className="user-avatar">
              <UserAvatar initials={activity?.initials} />
            </div>
            <FormattedActivity
              openAttachmentModal={openAttachmentModal}
              activity={activity}
            />
            <div className="date">
              {formatDistance(new Date(activity?.createdAt), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        ))}
      </Container>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={openAttachmentModal}>
          <ModalOverlay className="overlay-dark" />
          <ModalContent className="transparent-bg">
            <div className="attachment-frame">
              <img
                src={attachment.url}
                alt="attachment preview"
                className="attachment-preview"
              />
            </div>
            <div className="attachment-detail">
              <p className="meta">
                <span>
                  <a href={attachment.url} target="_blank">
                    Open in new tab
                  </a>
                </span>
                <span>
                  <NextLink
                    id={attachment.id}
                    onClick={handleDelete}
                    href="#"
                    linkText="Delete"
                  />
                </span>
              </p>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default Activities
