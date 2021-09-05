import { MouseEvent, ReactNode, useState } from "react"
import { Divider, Drawer, DrawerContent } from "@chakra-ui/react"
import { IoIosRocket } from "react-icons/io"
import styled from "styled-components"

import { useBoard } from "../../../lib/providers"
import SideBarHeader from "./SideBarHeader"
import DrawerStyles from "./DrawerStyles"
import ChangeBackground from "./ChangeBackground"

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

const StyledUl = styled.ul<{ boardBgColor: string; boardBgImage: string }>`
  li {
    padding: 6px 6px 6px 40px;
    position: relative;
    text-align: left;

    border-radius: 3px;
    font-weight: 600;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;

    display: flex;
    text-align: center;
    justify-content: flex-start;

    div {
      text-align: left;

      &span:first-child {
        font-weight: 600;
      }
      small {
        font-weight: lighter;
      }
    }

    &:hover {
      background-color: #e9e9e9ea;
    }

    .button-icon {
      font-size: 20px;
      height: 20px;
      left: 12px;
      line-height: 20px;
      position: absolute;
      top: 6px;
      width: 20px;

      .change-color {
        background-position: 50%;
        background-size: cover;
        border-radius: 3px;
        background-color: ${props => props.boardBgColor};
        background-image: url("${props => props.boardBgImage}");
        width: 20px;
        height: 20px;
      }
    }
  }
`

const StyledDrawerContent = styled(DrawerContent)`
  top: 38px !important;

  .content {
    margin-top: 8px;
    padding: 0 10px;
    height: 100%;
    position: relative;
    overflow-y: auto;
  }

  .divider {
    margin: 15px 0;
  }
`

const BoardDrawer = () => {
  const { toggleDrawerMenu, drawerOpen, closeBoard, board } = useBoard()

  const [openMenu, setOpenMenu] = useState<
    OpenMenuOptions[keyof OpenMenuOptions]
  >(sideBarOptions.main)

  const handleMenuChange = (ev: MouseEvent) => {
    setOpenMenu(sideBarOptions[ev.currentTarget.id])
  }

  return (
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
                <li id="closeBoard" onClick={handleMenuChange} key="closeBoard">
                  <span className="button-icon" />
                  <div>
                    <span>Close board</span>
                    <br />
                  </div>
                </li>
                <Divider className="divider" />
              </StyledUl>
            )}

            <ChangeBackground
              openMenu={openMenu.key}
              handleMenuChange={handleMenuChange}
            />
          </div>
        </StyledDrawerContent>
      </Drawer>
    </DrawerStyles>
  )
}

export default BoardDrawer
