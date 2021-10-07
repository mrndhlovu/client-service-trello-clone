import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { isEmpty } from "lodash"
import { ChangeEvent, MouseEvent, useState } from "react"
import { FiPaperclip } from "react-icons/fi"
import { formatDistance } from "date-fns"
import styled from "styled-components"

import { clientRequest } from "../../../../api"
import { ICardCoverProps } from "../CardItem"
import { UIDropdown } from "../../../shared"
import { useBoard, useCardContext } from "../../../../lib/providers"
import CardModule from "./CardModule"
import NextLink from "../../../shared/lib/NextLink"

const ImageAttachment = styled.div<ICardCoverProps>`
  background-image: url("${props => props?.imageCover}");
  min-height: 100px;
  background-size: contain;
  background-color: ${props => props.edgeColor};

  background-position: 50%;
  background-repeat: no-repeat;
  width: 100%;
  max-height: 270px;

  border-radius: 3px;
  height: 80px;
  left: 0;
  margin-top: -40px;
  position: absolute;
  text-align: center;
  text-decoration: none;
  top: 50%;
  width: 112px;
  z-index: 1;
  cursor: pointer;
`

const CardAttachments = () => {
  const { togglePreviewModal, cardId } = useCardContext()
  const { attachments, setAttachments } = useBoard()

  const [title, setTitle] = useState<string>("")

  const hasAttachments = !isEmpty(attachments)
  const cardAttachments = attachments.filter(
    attachment => attachment.cardId === cardId
  )

  const handlePreviewClick = (ev: MouseEvent) => {}

  const handleRemove = (ev: MouseEvent) => {
    const attachmentId = ev.currentTarget.id

    clientRequest
      .updateRemoveAttachment(attachmentId)
      .then(res => {
        setAttachments(prev => prev.filter(item => item.id !== attachmentId))
      })
      .catch(() => null)
  }

  const handleUpdateTitle = (ev: MouseEvent) => {
    const attachmentId = ev.currentTarget.id

    clientRequest
      .updateAttachment({ title }, attachmentId)
      .then(res => {
        setAttachments(prev =>
          prev.map(item => (item.id === attachmentId ? res.data : item))
        )
      })
      .catch(() => null)
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value)
  }

  return hasAttachments ? (
    <div className="checklist module">
      <div className="">
        <CardModule
          icon={<FiPaperclip size={16} />}
          className="checklist-header"
          title="Attachments"
        />
      </div>
      <div className="attachments module-content">
        <ul>
          {cardAttachments?.map((attachment, index) => (
            <div key={index} className="attachment-item">
              <div className="preview">
                {attachment?.resourceType === "image" ? (
                  <ImageAttachment
                    className="image-attachment"
                    imageCover={attachment?.url}
                    edgeColor={attachment.edgeColor}
                    id={`${attachment?.url}|${attachment?.id}`}
                    onClick={togglePreviewModal}
                  />
                ) : (
                  <NextLink
                    id={attachment.id}
                    linkText={attachment?.resourceType}
                    onClick={handlePreviewClick}
                    href="#"
                  />
                )}
              </div>
              <p className="attachment-detail">
                <span className="name">{attachment?.title}</span>

                <span className="attachment-controls">
                  <span className="attachment-control">
                    {" "}
                    {attachment?.updatedAt &&
                      formatDistance(
                        new Date(attachment?.updatedAt),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                  </span>

                  <button
                    id={attachment.id}
                    className="link-btn"
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
                  <UIDropdown
                    heading="Edit attachment"
                    usePortal
                    toggle={
                      <span>
                        <button id={attachment.id} className="link-btn">
                          Edit
                        </button>
                      </span>
                    }
                  >
                    <div className="control-edit">
                      <label htmlFor="title">Link name</label>
                      <Input
                        size="sm"
                        placeholder="Update name"
                        onChange={handleChange}
                        defaultValue={attachment.title}
                      />
                      <Button
                        size="sm"
                        onClick={handleUpdateTitle}
                        colorScheme="blue"
                        id={attachment.id}
                      >
                        Update
                      </Button>
                    </div>
                  </UIDropdown>
                </span>
              </p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  ) : null
}

export default CardAttachments
