import { useState } from "react"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion"

import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { AiOutlineRight } from "react-icons/ai"

import { NextLink } from "../../shared"
import { ROUTES, WORKSPACE_TAB_OPTIONS } from "../../../util/constants"
import { TitleIcon } from "../../home/BoardsGroup"
import { Workspace } from "../../../lib/providers"
import TabIcon from "./TabIcon"

const WorkspaceAccordion = ({ workspace }: { workspace: Workspace }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = () => setIsOpen(prev => !prev)

  return (
    <li>
      <Accordion allowToggle>
        <AccordionItem className="accordion-item">
          <AccordionButton
            onClick={handleClick}
            className="toggle"
            variant="link"
          >
            <div className="toggle-content d-flex justify-content-between">
              <div className="d-flex">
                <TitleIcon
                  iconColor={workspace.iconColor}
                  className="toggle-button-icon"
                >
                  <span>{workspace?.name?.split("")?.[0]}</span>
                </TitleIcon>
                <strong>{workspace.name}</strong>
              </div>
              {!isOpen ? <BsChevronDown /> : <BsChevronUp />}
            </div>
          </AccordionButton>
          <AccordionPanel>
            <ul>
              {WORKSPACE_TAB_OPTIONS.map(option => (
                <li className="sb-link-item" key={option.key}>
                  <NextLink
                    href={`${ROUTES.workspace}/${workspace.id}/${option.key}`}
                  >
                    <div className="toggle-content d-flex justify-content-between">
                      <div className="button-text">
                        <span className="sb-link-item-icon">
                          <TabIcon icon={option.key} />
                        </span>
                        <span>{option.title}</span>
                      </div>
                      <div className="redirect-icon">
                        <AiOutlineRight />
                      </div>
                    </div>
                  </NextLink>
                </li>
              ))}
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </li>
  )
}

export default WorkspaceAccordion
