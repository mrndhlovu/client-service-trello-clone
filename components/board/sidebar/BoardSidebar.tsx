import styled from "styled-components"

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
} from "@chakra-ui/react"
import { UIDropdown } from "../../shared"
import { useBoard } from "../../../lib/providers"

const Container = styled.div``

const BoardDrawer = () => {
  const { toggleDrawerMenu, drawerOpen, closeBoard } = useBoard()

  return (
    <Container>
      <Drawer isOpen={drawerOpen} placement="right" onClose={toggleDrawerMenu}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <UIDropdown
              className="header-auth-dropdown"
              heading="Close board"
              toggle={
                <Button isFullWidth colorScheme="red" mr={3}>
                  Close board
                </Button>
              }
            >
              <Button colorScheme="red" isFullWidth onClick={closeBoard}>
                Close
              </Button>
            </UIDropdown>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  )
}

export default BoardDrawer
