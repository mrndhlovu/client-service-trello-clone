import { Button, ButtonGroup } from "@chakra-ui/button"
import { Textarea } from "@chakra-ui/textarea"
import { ChangeEvent, MouseEvent, useRef, useState } from "react"

import { FiPaperclip } from "react-icons/fi"
import { GrEmoji } from "react-icons/gr"
import { AiOutlineClose } from "react-icons/ai"

import { clientRequest } from "../../../../api"
import { IAction } from "./Activities"
import { UIDropdown } from "../../../shared"
import { useAuth, useBoard, useCardContext } from "../../../../lib/providers"

interface IProps {
  defaultValue?: string
  commentId?: string
  handleDeleteComment?: (ev: MouseEvent) => void
  updateActionsList?: (data: IAction, options?: { edited: boolean }) => void
}

const CommentItem = ({
  defaultValue,
  commentId,
  handleDeleteComment,
  updateActionsList,
}: IProps) => {
  const { boardId } = useBoard()
  const { cardId } = useCardContext()
  const { user } = useAuth()
  const inputRef = useRef<HTMLTextAreaElement>()

  const [focused, setFocused] = useState<boolean>(false)
  const [comment, setComment] = useState<string>(defaultValue || "")

  const showFormControls = focused
  const editable = commentId !== undefined

  const toggleInput = (ev?: MouseEvent) => {
    const isCloseButton = ev.currentTarget.id === "close-btn"

    if (focused && !isCloseButton) return
    setFocused(prev => !prev)
  }

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    ev.stopPropagation()
    setComment(ev.target.value)
  }

  const handleSave = () => {
    if (editable) {
      clientRequest
        .editComment({ comment, commentId })
        .then(res => {
          setFocused(false)
          updateActionsList(res.data, { edited: true })
        })
        .catch(() => null)

      return
    }
    const options = {
      boardId,
      cardId,
      fullName: user?.fullName,
      initials: user.initials,
      username: user.username,
    }

    clientRequest
      .comment({ comment, ...options })
      .then(res => {
        updateActionsList(res.data)

        setComment("")
        setFocused(false)
      })
      .catch(() => null)
  }

  return (
    <>
      <div className="mod-comment-frame">
        <div className={`comment-form ${showFormControls ? "active" : ""}`}>
          <Textarea
            className={`new-comment ${!focused ? "" : "active"}`}
            value={comment}
            onChange={handleChange}
            placeholder="Write a comment..."
            onClick={toggleInput}
            ref={inputRef}
          />

          <div className={`controls ${showFormControls ? "active" : ""}`}>
            <ButtonGroup alignItems="center" className="save btn">
              <Button
                colorScheme={focused && comment ? "blue" : "gray"}
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
              <AiOutlineClose
                id="close-btn"
                cursor="pointer"
                onClick={toggleInput}
              />
            </ButtonGroup>
            <div className="control-btn">
              <UIDropdown
                toggle={
                  <span>
                    <GrEmoji size={16} />
                  </span>
                }
              >
                <div />
              </UIDropdown>
              <UIDropdown
                toggle={
                  <span>
                    <FiPaperclip size={15} onClick={toggleInput} />
                  </span>
                }
              >
                <div />
              </UIDropdown>
            </div>
          </div>
        </div>
      </div>
      {editable && (
        <div className="edit-controls">
          <button className="link-btn" onClick={toggleInput}>
            {focused ? "Close" : "Edit"}
          </button>
          <button
            id={commentId}
            className="link-btn"
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        </div>
      )}
    </>
  )
}

export default CommentItem
