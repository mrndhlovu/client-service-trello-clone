import styled from "styled-components"
import Link from "next/link"

import { Button, Modal } from "react-bootstrap"

import { UIForm } from "../shared"
import { useAuth, useBoard } from "../../lib/hooks/context"
import { CREATE_BOARD_VALIDATION } from "../../util/formhelpers"
import { useRef, useState } from "react"
import { FiCheck, FiX } from "react-icons/fi"

import { BOARD_COLOR_OPTIONS, ROUTES } from "../../util/constants"
import { createNewBoard } from "../../api"
import AuthFormButton from "../auth/AuthFormButton"
import router from "next/router"

const StyledModal = styled(Modal)`
  background: #212529a3 !important;

  .modal-content {
    margin-top: 50px;
    border: none;
    background-color: transparent;
    border-radius: 3px;
    max-width: 372px;
  }

  .board-bg-options {
    max-width: 120px;
  }

  ul {
    padding-left: 10px;
  }

  li {
    list-style: none;
  }

  .modal-footer {
    justify-content: start;
    padding-left: 0;
    border-top: none;

    button {
      color: #fff;
      border: none;
      background-color: #dee2e6de;
    }
  }
`

const FormWrapper = styled.div`
  height: 96px;

  .form-wrap {
    position: relative;
    background-color: ${props => props?.color};
    background-image: url("${props => props?.image}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 10px;
    border-radius: 3px;

    &::before {
      background: rgba(0, 0, 0, 0.15);
      position: absolute;
      bottom: 0;
      content: "";
      display: block;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 3px;
      z-index: 0;
    }

    svg {
      position: absolute;
      color: #fff;
      right: 5px;
      top: 5px;
    }

    input {
      border: none !important;
      background: transparent !important;
      box-shadow: none;
      box-sizing: border-box;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      left: -8px;
      line-height: 24px;
      margin-bottom: 4px;
      padding: 2px 8px;
      position: relative;
      width: 90%;

      &:focus {
        color: #fff;
      }
    }
  }
`

const BoardBgOption = styled.div`
  background-color: ${props => props?.color};
  background-image: url("${props => props?.image}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  position: relative;
  margin: 3px;

  svg {
    ${props => props.theme.styles.absoluteCenter};
    color: #fff;
  }
`
const initialState = { title: "" }

const NewBoardModal = ({ toggleModal, openModal }) => {
  const { user } = useAuth()

  const [activeBgOption, setActiveBgOption] = useState(BOARD_COLOR_OPTIONS[0])
  const [disabled, setDisabled] = useState(true)
  const formRef = useRef()

  const handleFormValidation = data => {
    setDisabled(data?.title === undefined)
  }

  const handleCreateBoard = async () => {
    formRef.current.isSubmitting = true

    await createNewBoard({
      ...formRef.current?.values,
      prefs: { image: activeBgOption.image, color: activeBgOption.color },
    })
      .then(res => {
        formRef.current.isSubmitting = false

        router.push(`/${ROUTES.board}/${res?.data?.id}`)
      })
      .catch(err => {
        formRef.current.isSubmitting = false
      })
  }

  const handleSelectedColor = newOption => setActiveBgOption(newOption)

  return (
    <StyledModal size="sm" show={openModal} onHide={toggleModal}>
      <FormWrapper
        image={activeBgOption.image}
        color={activeBgOption.color}
        className="board-bg-wrapper d-flex justify-content-between"
      >
        <div className="form-wrap flex-grow-1">
          <FiX cursor="pointer" onClick={toggleModal} />
          <UIForm
            id="create-board"
            validationSchema={CREATE_BOARD_VALIDATION}
            initialState={initialState}
            validate={handleFormValidation}
            ref={formRef}
          >
            <UIForm.Input
              hideError
              focus="true"
              placeholder="Add board title"
              name="title"
              required
            />
          </UIForm>
        </div>
        <div className="board-bg-options flex-grow-1">
          <ul className="d-flex flex-wrap gap">
            {BOARD_COLOR_OPTIONS.map(option => (
              <li key={option.key}>
                <Link href="/">
                  <a
                    id={option.image || option.color}
                    onClick={() => handleSelectedColor(option)}
                  >
                    <BoardBgOption image={option.image} color={option.color}>
                      {activeBgOption.key === option.key && <FiCheck />}
                    </BoardBgOption>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FormWrapper>
      <Modal.Footer>
        <AuthFormButton
          formId="create-board"
          onClick={handleCreateBoard}
          buttonText="Create board"
          disabled={formRef.current?.isSubmitting && disabled}
          loading={formRef.current?.isSubmitting}
          size="sm"
        />
      </Modal.Footer>
    </StyledModal>
  )
}

export default NewBoardModal
