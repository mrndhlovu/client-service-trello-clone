import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

import { clientRequest } from "../../../api"
import { useGlobalState } from "../../../lib/providers"
import { Input } from "@chakra-ui/input"
import { Select } from "@chakra-ui/select"
import { ROUTES } from "../../../util/constants"
import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"

interface TemplateIconProps {
  bgColor?: string
  bgImage?: string
}

interface ITemplate {
  name: string
  id: string
  bgColor: string
  desc: string
  bgImage: string
  lists?: [{ name: string }]
}

const Container = styled.div`
  .temp-header,
  .template-detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .create-board {
    span {
      color: #091e42;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 28px;
      display: block;
      margin-bottom: 12px;
    }

    p {
      text-align: left;
      margin: 12px auto 24px;
      max-height: 200px;
      overflow: auto;
    }

    label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      margin-bottom: 4px;
      margin-top: 24px;
      color: #091e42;
    }

    form button {
      margin-top: 15px;
    }
  }

  li {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 10px;
    gap: 10px;
  }

  .template-detail-header {
    justify-content: start;
    gap: 10px;
  }

  svg {
    cursor: pointer;
  }
`

const BackgroundIcon = styled.div<TemplateIconProps>`
  height: 30px;
  width: 30px;
  background-color: ${props => props.bgColor};
  border-radius: 3px;

  ${props =>
    props?.bgImage
      ? css<TemplateIconProps>`
          background-size: cover;
          background-image: url("${props => props?.bgImage}");
          background-position: center center;
          transition: opacity 85ms;
          background-repeat: no-repeat;
          transition: opacity 85ms;
        `
      : css<TemplateIconProps>`
          background-size: initial;
          background-position: left center;
        `};
`

const INITIAL_STATE = {
  title: "",
  workspace: "",
}

const TopTemplates = () => {
  const { workspaces } = useGlobalState()
  const router = useRouter()

  const [templates, setTemplates] = useState<ITemplate[]>([])
  const [optionsOpen, setOptionsOpen] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<
    ITemplate | undefined
  >()
  const [board, setBoard] = useState<{
    title: string
    workspace: string
  }>(INITIAL_STATE)
  const toggleIsOpen = () => setOptionsOpen(prev => !prev)

  const handleSelectedTemplated = (ev: MouseEvent) => {
    setSelectedTemplate(templates[+ev.currentTarget.id])
  }

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setBoard(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
  }

  const handleCreate = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setIsLoading(true)
    const data = {
      title: board?.title || selectedTemplate.name,
      workspaceId: board.workspace ? board.workspace : workspaces?.[0]?.id,
      activeBg: selectedTemplate?.bgImage ? "image" : "color",
      prefs: {
        color: selectedTemplate?.bgColor,
        image: selectedTemplate?.bgImage,
      },
      templateLists: selectedTemplate.lists,
    }

    clientRequest
      .createNewBoard(data)
      .then(res => {
        router.push(`/${ROUTES.board}/${res?.data?.id}`)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    ;(() => {
      clientRequest
        .getTemplates()
        .then(res => setTemplates(res.data))
        .catch(err => {})
    })()
  }, [])

  return (
    <Container>
      {selectedTemplate ? (
        <div className="create-board">
          <div className="template-detail-header">
            <BackgroundIcon
              bgColor={selectedTemplate?.bgColor}
              bgImage={selectedTemplate?.bgImage}
            />
            <div>{selectedTemplate?.name}</div>
          </div>
          <p>{selectedTemplate?.desc}</p>
          <form onSubmit={handleCreate}>
            <label htmlFor="name">
              Board title
              <Input
                onChange={handleChange}
                size="sm"
                name="title"
                defaultValue={selectedTemplate.name}
              />
            </label>
            <label>
              Workspace
              <Select
                defaultValue="default"
                onChange={handleChange}
                size="sm"
                name="workspace"
              >
                {workspaces?.map(workspace => (
                  <option value={workspace.id} key={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </Select>
            </label>

            <Button
              isLoading={isLoading}
              isFullWidth
              colorScheme="blue"
              type="submit"
              size="sm"
            >
              Create
            </Button>
          </form>
        </div>
      ) : (
        <>
          <div className="temp-header">
            <span>Top templates</span>
            <span>
              {!optionsOpen ? (
                <AiOutlinePlus onClick={toggleIsOpen} />
              ) : (
                <AiOutlineMinus onClick={toggleIsOpen} />
              )}
            </span>
          </div>
          {optionsOpen && (
            <ul>
              {templates.map((template, index) => (
                <li id={`${index}`} onClick={handleSelectedTemplated}>
                  <BackgroundIcon
                    bgColor={template?.bgColor}
                    bgImage={template?.bgImage}
                  />
                  <div>{template?.name}</div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Container>
  )
}

export default TopTemplates
