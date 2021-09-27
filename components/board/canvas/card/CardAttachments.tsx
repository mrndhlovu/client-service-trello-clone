import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { isEmpty } from "lodash"
import { ChangeEvent, MouseEvent, useState } from "react"
import { FiPaperclip } from "react-icons/fi"

import { clientRequest } from "../../../../api"
import { useCardContext } from "../../../../lib/providers"
import { UIDropdown } from "../../../shared"
import NextLink from "../../../shared/lib/NextLink"
import CardModule from "./CardModule"

const CardAttachments = () => {
  const { attachments, setAttachments } = useCardContext()

  const [title, setTitle] = useState<string>("")

  const hasAttachments = !isEmpty(attachments)

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
          {attachments?.map((attachment, index) => (
            <div key={index} className="attachment-item">
              <div className="preview">
                <NextLink
                  id={attachment.id}
                  linkText={attachment?.resourceType}
                  onClick={handlePreviewClick}
                  href="#"
                />
              </div>
              <p className="attachment-detail">
                <span className="name">{attachment?.title}</span>

                <span className="attachment-controls">
                  <span className="attachment-control"></span>

                  <button
                    id={attachment.id}
                    className="link-btn"
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
                  <UIDropdown
                    heading="Edit attachment"
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
