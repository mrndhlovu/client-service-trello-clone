import { ChangeEvent, MouseEvent, useState } from "react"
import { Button, Divider, Input } from "@chakra-ui/react"
import { useEffect } from "react"
import { BsCheck } from "react-icons/bs"
import { FiEdit2 } from "react-icons/fi"
import styled from "styled-components"

import { clientRequest } from "../../../api"
import { LABEL_DEFAULT_OPTIONS } from "../../../util/constants"
import { useCardContext, useListCardsContext } from "../../../lib/providers"
import { useGlobalState } from "../../../lib/hooks/context"
import { getLabelOptions } from "../../../util"
import { useRef } from "react"

export interface ILabelProps {
  color: string
  id?: string
  cardId?: string
  name?: string
}

const StyledLi = styled.li<{ bgColor: string; checked: boolean }>`
  .label-color {
    background-color: ${props => props.bgColor};
  }

  .check-icon {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`

const Container = styled.div`
  max-width: 300px;

  ul {
    list-style: none;
  }

  .divider {
    margin: 14px 0;
  }

  .button-group {
    justify-content: space-between;
    display: flex;
    width: 100%;
    margin-top: 10px;
  }

  button {
    border-radius: 3px;
  }

  .label-color {
    border-radius: 3px;
    cursor: pointer;
    font-weight: 700;
    margin: 0 0 4px;
    min-height: 20px;
    padding: 10px 12px;
    position: relative;
    transition: padding 85ms, margin 85ms, box-shadow 85ms;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .confirm-label,
  .pick-label {
    position: relative;
    display: flex;
  }

  .pick-label {
    flex-direction: column;

    .label-color {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .saved-label-name {
        color: #fff;
      }
    }
  }

  .confirm-label {
    .label-color {
      height: 32px;
      margin: 0 8px 8px 0;
      padding: 0;
      width: 48px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }
  }

  .confirm-label {
    flex-wrap: wrap;
    place-content: center;
  }

  .item,
  .item-selected {
    display: flex;
    position: relative;
  }

  .item {
    padding-right: 36px;

    a {
      border-radius: 3px;
      padding: 6px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .item-selected {
    width: fit-content;
  }

  input,
  h4 {
    margin-bottom: 10px;
  }

  h4 {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`

const CardLabels = () => {
  const { card, cardId } = useCardContext()
  const { saveCardChanges, listId } = useListCardsContext()
  const { notify } = useGlobalState()
  const inputRef = useRef<HTMLInputElement | null>()

  const [selectedLabel, setSelectedLabel] = useState<ILabelProps>(
    {} as ILabelProps
  )

  const [labelName, setLabelName] = useState<string>("")
  const [savedLabels, setSavedLabels] = useState<ILabelProps[]>([])
  const [createLabel, setCreateLabel] = useState<boolean>()

  const [labelOptions, setLabelOptions] = useState<ILabelProps[]>(
    getLabelOptions(savedLabels, true)
  )

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setLabelName(ev.target.value)
  }

  const handleSelectedLabel = (ev: MouseEvent) => {
    ev.stopPropagation()
    const label = getLabelOptions(savedLabels).find(
      label => label.color === ev.currentTarget.id
    )

    if ((label.name && selectedLabel.name) || inputRef.current?.value) {
      inputRef.current.value = label.name
    }
    setSelectedLabel(label)

    if (!createLabel) {
      handleCreateLabel()
    }
  }

  const handleSave = () => {
    const data = { name: labelName, color: selectedLabel.color, cardId }

    clientRequest
      .createLabel(data)
      .then(res => {
        setLabelOptions(prev =>
          prev.map(item => (item.color === res.data.color ? res.data : item))
        )
        // setSelectedLabel({} as ILabelProps)
        inputRef.current.value = ""
        handleCreateLabel()
      })
      .catch(err =>
        notify({
          description: err.message,
          status: "error",
          placement: "top",
        })
      )
  }

  const handleDelete = (ev: MouseEvent) => {
    ev.stopPropagation()
    const label = getLabelOptions(savedLabels).find(
      label => label.color === selectedLabel.color
    )

    const labelId = label?.id
    if (!labelId) return
    setSelectedLabel(label)

    clientRequest
      .deleteLabel(labelId)
      .then(() => {
        setSavedLabels(prev => [...prev.filter(label => label.id !== labelId)])
        inputRef.current.value = ""
        handleCreateLabel()
      })
      .catch(err =>
        notify({
          description: err.message,
          status: "error",
          placement: "top",
        })
      )
  }

  const handleUpdateLabels = (ev: MouseEvent) => {
    if (ev.currentTarget.nodeName === "svg") return
    const label = ev.currentTarget.id

    saveCardChanges(cardId, listId, { label })
  }

  const handleCreateLabel = () => setCreateLabel(prev => !prev)

  useEffect(() => {
    const getData = () => {
      clientRequest
        .getUserCardLabels()
        .then(res => setSavedLabels(res.data))
        .catch(err =>
          notify({
            description: err.message,
            status: "error",
            placement: "top",
          })
        )
    }

    getData()

    return () => {
      setSelectedLabel({} as ILabelProps)
      setSavedLabels([])
      inputRef.current = null
    }
  }, [])

  return (
    <Container>
      {createLabel ? (
        <>
          {selectedLabel?.color !== undefined && (
            <Input
              size="sm"
              onChange={handleChange}
              defaultValue={selectedLabel?.name}
              placeholder="Label name"
              ref={inputRef}
            />
          )}

          <h4>Select a color</h4>

          <ul className="confirm-label">
            {LABEL_DEFAULT_OPTIONS.map((label, index) => (
              <StyledLi
                className="item-selected"
                key={index}
                bgColor={label.color}
                id={label.color}
                onClick={handleSelectedLabel}
                checked={selectedLabel?.color === label.color}
              >
                <span className="label-color">
                  <span className="check-icon">
                    <BsCheck size={20} />
                  </span>
                </span>
              </StyledLi>
            ))}
          </ul>
          <div className="button-group">
            <Button onClick={handleSave} size="sm" colorScheme="blue">
              Save
            </Button>
            {savedLabels.some(
              label => label.color === selectedLabel?.color
            ) && (
              <Button onClick={handleDelete} size="sm" colorScheme="red">
                Delete
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <h4>Labels</h4>
          <ul className="pick-label">
            {labelOptions.map((label, index) => (
              <StyledLi
                id={label.color}
                onClick={handleUpdateLabels}
                className="item"
                key={index}
                bgColor={label.color}
                checked={card.labels.includes(label.color)}
              >
                <span className="label-color">
                  <span className="saved-label-name">{label.name}</span>
                  <span className="check-icon">
                    <BsCheck />
                  </span>
                </span>
                <a href="#">
                  <FiEdit2
                    id={label.color}
                    name={label?.name}
                    onClick={handleSelectedLabel}
                  />
                </a>
              </StyledLi>
            ))}
          </ul>
          <Divider className="divider" />

          <Button
            isFullWidth
            onClick={handleCreateLabel}
            size="sm"
            colorScheme="gray"
          >
            Create a new label
          </Button>
        </>
      )}
    </Container>
  )
}

export default CardLabels
