import { FaRegUser } from "react-icons/fa"
import styled from "styled-components"

import { useAuth } from "../../../lib/providers"

const Container = styled.div`
  background-color: ${props => props.theme.colors.borderLight};
  border-radius: 50%;
  position: relative;
  outline: 0;
  border: none;
  height: 30px;
  width: 30px;

  .avatar-auth-user-icon {
    ${props => props.theme.styles.absoluteCenter};
    color: #ffffff;
  }

  .avatar-button-text {
    color: ${props => props.theme.colors.border} !important;
    font-size: 1rem;
    font-weight: 700;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

const UserAvatar = ({ initials }: { initials?: string }) => {
  const { user } = useAuth()

  return (
    <Container className="avatar-auth-button">
      {user?.initials ? (
        <span className="avatar-button-text">{initials || user?.initials}</span>
      ) : (
        <FaRegUser className="avatar-auth-user-icon" />
      )}
    </Container>
  )
}

export default UserAvatar
