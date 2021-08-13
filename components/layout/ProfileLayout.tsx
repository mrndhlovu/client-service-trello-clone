import { TabList, Container, Tab, Tabs } from "@chakra-ui/react"
import styled from "styled-components"

import { PROFILE_TAB_OPTIONS } from "../../util/constants"
import { useProfile } from "../../lib/hooks/context"

const StyledContainer = styled(Container)``

const ProfileLayout = ({ children }) => {
  const { activeIndex, handleIndexChange } = useProfile()

  return (
    <StyledContainer>
      <div className="profile-header">
        <Tabs
          onChange={handleIndexChange}
          index={activeIndex}
          isFitted
          variant="enclosed"
        >
          <TabList mb="1em">
            {PROFILE_TAB_OPTIONS.map(option => (
              <Tab key={option.key}>{option.title}</Tab>
            ))}
          </TabList>
          {children}
        </Tabs>
      </div>
    </StyledContainer>
  )
}

export default ProfileLayout
