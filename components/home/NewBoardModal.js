import { useRef, useState } from "react"
import router from "next/router"
import styled from "styled-components"
import Link from "next/link"
import { FiCheck, FiX } from "react-icons/fi"
import { Modal } from "react-bootstrap"

import { BOARD_COLOR_OPTIONS, ROUTES } from "../../util/constants"
import { CREATE_BOARD_VALIDATION } from "../../util/formhelpers"
import { createNewBoard } from "../../api"
import { UIForm } from "../shared"
import { useAuth } from "../../lib/hooks/context"
import AuthFormButton from "../auth/AuthFormButton"

const StyledModal = styled(Modal)`
  background: #212529a3;
  height: 100%;
  width: 100%;

  .modal-dialog {
    height: 100%;
    width: 100%;
  }

  .modal-content {
    border: none;
    background-color: transparent;
    border-radius: 3px;
    z-index: 10000;
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
    border-top: none;

    button {
      color: #fff;
      border: none;
      background-color: #dee2e6de;
    }
  }
`

const FormWrapper = styled.div`
  height: 105px;
  position: relative;

  .form-wrap {
    position: relative;
    background-color: ${props => props?.color};
    background-image: url("${props => props?.image}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 10px;
    border-radius: 3px;
    min-width: 295px;

    form {
      width: 90%;
    }

    .icon-wrapper {
      position: relative;
      width: 10%;
    }

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
      z-index: 100;
    }

    input {
      border: none !important;
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
      margin: 0 !important;
      background-color: #ffffff26;
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
  const [loading, setLoading] = useState(false)
  const formRef = useRef()

  const handleFormValidation = data => {
    setDisabled(data?.title === undefined)
  }

  const handleCreateBoard = async () => {
    setLoading(true)

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
    setLoading(false)
  }

  const handleSelectedColor = newOption => setActiveBgOption(newOption)

  return (
    <StyledModal size="md" onHide={toggleModal} show={openModal}>
      <Modal.Dialog>
        <Modal.Body>
          <FormWrapper
            image={activeBgOption.image}
            color={activeBgOption.color}
            className="board-bg-wrapper d-flex justify-content-between"
          >
            <div className="d-flex form-wrap flex-grow-1">
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
              <div className="icon-wrapper">
                <FiX cursor="pointer" onClick={toggleModal} />
              </div>
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
                        <BoardBgOption
                          image={option.image}
                          color={option.color}
                        >
                          {activeBgOption.key === option.key && <FiCheck />}
                        </BoardBgOption>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FormWrapper>
        </Modal.Body>

        <Modal.Footer>
          <AuthFormButton
            formId="create-board"
            onClick={handleCreateBoard}
            buttonText="Create board"
            disabled={loading && disabled}
            loading={loading}
            size="sm"
          />
        </Modal.Footer>
      </Modal.Dialog>
    </StyledModal>
  )
}

export default NewBoardModal
