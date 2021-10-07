import { useMemo } from "react"
import { isEmpty } from "lodash"
import styled, { css } from "styled-components"

import { FiEdit2 } from "react-icons/fi"
import {
  AiFillClockCircle,
  AiOutlineClockCircle,
  AiOutlinePaperClip,
} from "react-icons/ai"
import { Button, Badge } from "@chakra-ui/react"
import { BsChatDots, BsCheckBox } from "react-icons/bs"

import {
  useBoard,
  useCardContext,
  useListItemContext,
  useListsContext,
} from "../../../lib/providers"
import { calculateCompletedTasks } from "../../../util"
import CardActions from "./cardActions/CardActions"
import CardModal from "./card/CardModal"
import EditCardMenu from "./EditCardMenu"
import CardActionsModal from "./CardActionsModal"
import PreviewModal from "./card/PreviewModal"
import { format } from "date-fns"

export interface ICardCoverProps {
  colorCover?: string
  imageCover?: string
  edgeColor?: string
  height?: string
  width?: string
}

const CardLabel = styled.span<{ color: string }>`
  background-color: ${props => props.color || "none"};
`

const StyledContainer = styled.span`
  .due-date {
    display: flex;
    font-weight: 200;
    font-size: 11px;
    align-items: center;
    padding: 2px 0;
    color: #000;
    gap: 1px;
  }
`

const CardCover = styled.div<ICardCoverProps>`
  ${props =>
    props.imageCover
      ? css<ICardCoverProps>`
          background-image: url("${props => props?.imageCover}");
          min-height: 100px;
          background-size: contain;
          height: ${props => (props.height ? `${props.height}px` : "initial")};
          background-color: ${props => props.edgeColor};
          border-radius: 3px 3px 0;
          background-position: 50%;
          background-repeat: no-repeat;
          width: 100%;
          max-height: 270px;

          &.image-cover-full {
            background-position: none;
            background-size: cover;
          }
        `
      : css<ICardCoverProps>`
          background-color: ${props => props.colorCover};
          height: 32px;
        `};
`

export interface ICardActionProps {
  toggleActionsMenu: () => void
  actionsOpen: boolean
}

const CardItem = ({ toggleActionsMenu, actionsOpen }: ICardActionProps) => {
  const { saveCardChanges } = useListsContext()
  const { activities, attachments } = useBoard()
  const {
    card,
    cardId,
    cardIsOpen,
    colorCover,
    coverSize,
    coverUrl,
    edgeColor,
    imageCover,
    listId,
    showCardCover,
    tasks,
    previewModalIsOpen,
    hasAttachments,
    toggleCardIsOpen,
  } = useCardContext()

  const numberOfCardComments = useMemo(
    () =>
      activities?.filter(
        action =>
          action?.entities?.comment !== undefined &&
          action?.entities?.cardId === cardId
      )?.length,
    [activities, cardId]
  )

  const hasComments = numberOfCardComments > 0
  const hasTasks = !isEmpty(tasks)
  const hasDueDate = card?.due && card?.due !== undefined
  const hasBadge = hasComments || hasTasks || hasAttachments || hasDueDate
  const [numberOfTasksToComplete, numberOfCompletedTasks] =
    calculateCompletedTasks(tasks)
  const allTasksCompleted = numberOfCompletedTasks === numberOfTasksToComplete

  const handleSave = (title: string) => {
    saveCardChanges(card.id, listId, { title })
    toggleActionsMenu()
  }

  return (
    <>
      {!actionsOpen && (
        <Button onClick={toggleActionsMenu} size="xs" className="edit-button">
          <FiEdit2 size={15} />
        </Button>
      )}

      {actionsOpen && (
        <>
          <CardActions
            close={toggleActionsMenu}
            listId={listId}
            cardId={cardId}
          />

          <CardActionsModal
            actionsOpen={actionsOpen}
            toggleActionsMenu={toggleActionsMenu}
          />
        </>
      )}
      <StyledContainer id={cardId} onClick={toggleCardIsOpen}>
        {showCardCover && (
          <CardCover
            className="list-card-cover"
            imageCover={imageCover || coverUrl}
            edgeColor={edgeColor}
            colorCover={colorCover}
            width={coverSize?.width}
            height={coverSize?.height}
          />
        )}

        <div className={`list-card ${actionsOpen ? "edit-open" : ""}`}>
          <div className="list-card-details">
            <div className="list-card-labels">
              {card?.labels?.map((label: string, index: number) => (
                <CardLabel className="card-label " color={label} key={index} />
              ))}
            </div>

            {actionsOpen ? (
              <EditCardMenu
                title={card.title}
                close={toggleActionsMenu}
                save={handleSave}
              />
            ) : (
              <span className="list-card-title">{card?.title}</span>
            )}
          </div>
          {hasBadge && (
            <div className="badges">
              {hasAttachments && (
                <div>
                  <span>{attachments?.length}</span>{" "}
                  <AiOutlinePaperClip size={12} />
                </div>
              )}

              {hasDueDate && (
                <Badge colorScheme={card?.dueComplete ? "green" : "yellow"}>
                  {" "}
                  <span className="due-date">
                    <AiOutlineClockCircle size={13} />
                    {format?.(new Date(card?.due), "MMM d")}
                  </span>
                </Badge>
              )}

              {hasComments && (
                <div>
                  <BsChatDots size={12} />
                  <span> {numberOfCardComments}</span>
                </div>
              )}

              {hasTasks && (
                <Badge colorScheme={allTasksCompleted ? "whatsapp" : ""}>
                  <div className="tasks">
                    <BsCheckBox size={12} />
                    <span>
                      {" "}
                      {`${numberOfCompletedTasks}/${numberOfTasksToComplete}`}
                    </span>{" "}
                  </div>
                </Badge>
              )}
            </div>
          )}
        </div>
      </StyledContainer>
      {cardIsOpen && (
        <CardModal onClose={toggleCardIsOpen} isOpen={cardIsOpen} />
      )}
      {previewModalIsOpen && <PreviewModal />}
    </>
  )
}

export default CardItem
