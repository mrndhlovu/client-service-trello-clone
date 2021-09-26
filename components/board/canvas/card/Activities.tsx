import { MouseEvent, useEffect, useState } from "react"
import { formatDistance } from "date-fns"
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal"

import { clientRequest } from "../../../../api"
import { FormattedAction } from "../../../shared"
import { useBoard } from "../../../../lib/providers"
import UserAvatar from "../../../shared/lib/UserAvatar"
import NextLink from "../../../shared/lib/NextLink"
import CommentModule from "./CommentModule"
import StyleActivities from "./StyleActivities"

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
        <StyleActivities>
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
              {action?.type !== "comment" &&
                action?.entities?.attachment?.type !== "link" && (
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
        </StyleActivities>
      )}
    </>
  )
}

export default Activities
