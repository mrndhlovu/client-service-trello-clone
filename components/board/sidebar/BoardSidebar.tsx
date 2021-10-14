import { MouseEvent, ReactNode, useState } from "react"
import { useRouter } from "next/router"
import { Divider, Drawer, DrawerContent, Button } from "@chakra-ui/react"
import { IoIosRocket } from "react-icons/io"
import styled from "styled-components"

import { ROUTES } from "../../../util/constants"
import { useBoard, useAuth } from "../../../lib/providers"
import ChangeBackground from "./ChangeBackground"
import DrawerStyles, { StyledUl } from "./DrawerStyles"
import SideBarHeader from "./SideBarHeader"
import Activities from "../canvas/card/Activities"
import { UIDropdown } from "../../shared"

interface OpenMenuOptions {
  [key: string]: {
    heading: string
    key: string
    back?: string
    options?: {
      title: string
      key: string
      subTitle?: string
      icon?: ReactNode
    }[]
  }
}

const sideBarOptions: OpenMenuOptions = {
  main: {
    key: "main",
    heading: "Menu",
    options: [
      {
        title: "Change background",
        key: "changeColor",
        icon: <div className="change-color" />,
      },
      {
        title: "Power-ups",
        key: "powerUp",
        icon: <IoIosRocket />,
      },
    ],
  },

  changeColor: {
    key: "changeColor",
    back: "main",
    heading: "Change background",
  },

  powerUp: {
    key: "colors",
    back: "main",
    heading: "Colors",
  },

  colors: {
    key: "colors",
    back: "changeColor",
    heading: "Colors",
  },
  photo: {
    key: "photo",
    back: "changeColor",
    heading: "Photos by Unsplash",
  },
}

const StyledDrawerContent = styled(DrawerContent)`
  top: 38px !important;

  .content {
    margin-top: 8px;
    padding: 0 10px;
    height: 100%;
    position: relative;
    overflow: auto;
  }

  .mod-preview-type {
    margin-left: 36px;
  }

  .divider {
    margin: 15px 0 10px;
  }
`

const BoardDrawer = () => {
  const { toggleDrawerMenu, drawerOpen, closeBoard, board } = useBoard()
  const { user } = useAuth()
  const router = useRouter()

  const [openMenu, setOpenMenu] = useState<
    OpenMenuOptions[keyof OpenMenuOptions]
  >(sideBarOptions.main)

  const handleMenuChange = (ev: MouseEvent) => {
    if (ev.currentTarget.id === "powerUp") {
      return router.push(`/${user.username}/${ROUTES.settings}`)
    }
    setOpenMenu(sideBarOptions[ev.currentTarget.id])
  }

  return drawerOpen ? (
    <DrawerStyles>
      <Drawer isOpen={drawerOpen} placement="right" onClose={toggleDrawerMenu}>
        <StyledDrawerContent className="drawer">
          <SideBarHeader
            handleBackClick={handleMenuChange}
            heading={openMenu.heading}
            backId={openMenu.back}
            handleClose={toggleDrawerMenu}
          />
          <Divider className="divider" />

          <div className="content">
            {openMenu.key === "main" && (
              <StyledUl
                boardBgImage={board?.prefs?.image}
                boardBgColor={board?.prefs?.color}
              >
                {openMenu.heading === "Menu" &&
                  openMenu.options.map(option => (
                    <li
                      id={option.key}
                      onClick={handleMenuChange}
                      key={option.key}
                    >
                      <span className="button-icon">{option.icon}</span>
                      <div>
                        <span>{option.title}</span>
                        <br />
                        {option?.subTitle && <small>{option?.subTitle}</small>}
                      </div>
                    </li>
                  ))}
                <Divider className="divider" />
                <li id="closeBoard" key="closeBoard">
                  <span className="button-icon" />
                  <UIDropdown
                    heading="Close board"
                    usePortal
                    toggle={
                      <div>
                        <span>Close board</span>
                        <br />
                      </div>
                    }
                  >
                    <Button
                      size="sm"
                      onClick={closeBoard}
                      isFullWidth
                      colorScheme="red"
                    >
                      Yes close this board
                    </Button>
                  </UIDropdown>
                </li>
                <Divider className="divider" />
              </StyledUl>
            )}

            {openMenu.key === "main" && (
              <Activities showCommentOption={false} showActivities />
            )}

            <ChangeBackground
              openMenu={openMenu.key}
              handleMenuChange={handleMenuChange}
            />
          </div>
        </StyledDrawerContent>
      </Drawer>
    </DrawerStyles>
  ) : null
}

export default BoardDrawer
