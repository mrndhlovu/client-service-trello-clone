import { MouseEvent, useEffect, useState } from "react"
import { formatDistance } from "date-fns"
import styled from "styled-components"
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal"

import { clientRequest } from "../../../../api"
import { FormattedAction } from "../../../shared"
import { useBoard } from "../../../../lib/providers"
import UserAvatar from "../../../shared/lib/UserAvatar"
import NextLink from "../../../shared/lib/NextLink"
import CommentModule from "./CommentModule"
import { useLocalStorage } from "../../../../lib/hooks"

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

const Container = styled.div`
  transition: all 0.5s linear;

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

  .date {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 400;
  }

  .comment-timeline {
    margin-left: 10px;
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

const Activities = ({ showActivities }: { showActivities: boolean }) => {
  const [activities, setActivities] = useState<IAction[]>([])
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

  const updateActionsList = (data: IAction, options?: { edited: false }) => {
    if (options?.edited) {
      setActivities(prev => [
        ...prev.map(item => (item.id === data.id ? data : item)),
      ])
      return
    }

    setActivities(prev => [...prev, data])
  }

  const handleDelete = (ev?: MouseEvent) => {
    const previewId = ev.currentTarget.id
    clientRequest
      .deleteAttachment(previewId)
      .then(() => {
        setActivities(prev => [
          ...prev.filter(
            action => action?.entities?.attachment?.id !== previewId
          ),
        ])
        togglePreviewModal()
      })
      .catch(() => {})
  }

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
      <CommentModule updateActionsList={updateActionsList} />

      {showActivities && (
        <Container>
          {sortedList.map((action, index) => (
            <div className="mod-preview-type" key={index}>
              <div className="user-avatar">
                <UserAvatar initials={action?.initials} />
              </div>
              <FormattedAction
                openPreviewModal={togglePreviewModal}
                handleDeleteComment={handleDeleteComment}
                updateActionsList={updateActionsList}
                action={action}
              />
              {action?.type !== "comment" && (
                <div className="date">
                  {formatDistance(new Date(action?.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </div>
              )}
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
      )}
    </>
  )
}

export default Activities
