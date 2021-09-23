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
  id: string
}

const Container = styled.div`
  .mod-preview-type {
    margin-left: 26px;
    min-height: 32px;
    padding: 8px 0;
    position: relative;
  }

  .preview-frame {
    padding: 48px 24px 112px;
    height: auto;
    text-align: center;
    margin: 0 auto;
    background-color: transparent;
  }

  .preview-detail {
    margin: 0 auto;
    position: absolute;
    z-index: 2;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    a {
      color: #fff;
      margin: 0 10px;
      text-decoration: underline;
    }
  }

  .preview {
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

  const [preview, setPreview] = useState<
    { url: string; id: string } | undefined
  >()

  const modalIsOpen = preview !== undefined

  const togglePreviewModal = (ev?: MouseEvent) => {
    if (!ev?.currentTarget.id) return setPreview(undefined)

    const [url, previewId] = ev?.currentTarget?.id.split("|")
    setPreview({ url, id: previewId })
  }

  const handleDelete = (ev?: MouseEvent) => {
    const previewId = ev.currentTarget.id
    clientRequest
      .deleteAttachment(previewId)
      .then(() => {
        setActivities(prev => [
          ...prev.filter(
            activity => activity?.entities?.attachment?.id !== previewId
          ),
        ])
        togglePreviewModal()
      })
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
    <Container>
      {sortedList.map((activity, index) => (
        <div className="mod-preview-type" key={index}>
          <div className="user-avatar">
            <UserAvatar initials={activity?.initials} />
          </div>
          <FormattedActivity
            openPreviewModal={togglePreviewModal}
            activity={activity}
          />
          <div className="date">
            {formatDistance(new Date(activity?.createdAt), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      ))}

      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={togglePreviewModal}>
          <ModalOverlay className="overlay-dark" />
          <ModalContent className="transparent-bg">
            <div className="preview-frame">
              <img src={preview.url} alt="preview" className="preview" />
            </div>
            <div className="preview-detail">
              <p className="meta">
                <span>
                  <a href={preview.url} target="_blank">
                    Open in new tab
                  </a>
                </span>
                <span>
                  <NextLink
                    id={preview.id}
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
    </Container>
  )
}

export default Activities
