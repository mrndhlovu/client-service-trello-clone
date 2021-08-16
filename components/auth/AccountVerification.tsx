import styled from "styled-components"

import VerifiedConfirmation from "./VerifiedConfirmation"
import VerifyAccount from "./VerifyAccount"

interface IProps {
  isVerified: boolean | undefined
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  ${props => props.theme.styles.absoluteCenter};

  .verification-alert {
    width: 95%;
    margin: 0 auto;
    border-radius: 3px;
    margin-top: 20px;
    color: ${props => props.theme.colors.border};
    .title {
      font-weight: 600;
      font-size: 23px;
    }

    .desc {
      font-size: 13px;
    }

    label {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }

    input {
      background-color: #e8f4f9;
      width: 260px;
    }
  }
`

const AccountVerification = ({ isVerified }: IProps) => {
  return (
    <Container>
      {!isVerified && <VerifyAccount />}
      {isVerified && <VerifiedConfirmation />}
    </Container>
  )
}

export default AccountVerification
