import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { Input } from "@chakra-ui/input"
import { Select } from "@chakra-ui/select"
import { ROUTES, TOP_TEMPLATE_OPTIONS } from "../../../util/constants"
import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

import { clientRequest } from "../../../api"
import { ITemplate, useGlobalState } from "../../../lib/providers"
import SelectWorkspace from "./SelectWorkspace"

interface TemplateIconProps {
  bgColor?: string
  bgImage?: string
}

const Container = styled.div`
  background-color: #fff;
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
  min-width: 30px;
  background-color: ${props => props.bgColor};
  border-radius: 3px;

  ${props => {
    if (props?.bgImage) {
      return css<TemplateIconProps>`
        background-size: cover;
        background-image: url(${props.bgImage});
        background-position: center center;
        transition: opacity 85ms;
        background-repeat: no-repeat;
        transition: opacity 85ms;
      `
    } else {
      return css<TemplateIconProps>`
        background-size: initial;
        background-position: left center;
      `
    }
  }};
`

const INITIAL_STATE = {
  title: "",
  workspace: "",
}

const TopTemplates = () => {
  const { templates } = useGlobalState()
  const router = useRouter()

  const [optionsOpen, setOptionsOpen] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<
    ITemplate | undefined
  >()
  const [template, setTemplate] = useState<{
    title: string
    workspace: string
  }>(INITIAL_STATE)

  const toggleIsOpen = () => setOptionsOpen(prev => !prev)

  const handleSelectedTemplated = (ev: MouseEvent) => {
    setSelectedTemplate(templates.find(item => item.id === ev.currentTarget.id))
  }

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setTemplate(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
  }

  const handleCreate = () => {
    setIsLoading(true)
    const data = {
      title: template?.title || selectedTemplate.name,
      workspaceId: template.workspace,
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

        setTimeout(() => {
          setSelectedTemplate(undefined)
        }, 4000)
      })
      .catch(err => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!selectedTemplate) {
      setIsLoading(false)
    }
  }, [selectedTemplate])

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
          <p>{selectedTemplate?.description}</p>
          <SelectWorkspace
            selectedTemplate={selectedTemplate}
            handleChange={handleChange}
            handleCreate={handleCreate}
            isLoading={isLoading}
            disabled={!template.workspace}
          />
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
              {templates
                ?.filter(item => TOP_TEMPLATE_OPTIONS?.includes(item.name))
                .map(template => (
                  <li id={template.id} onClick={handleSelectedTemplated}>
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
