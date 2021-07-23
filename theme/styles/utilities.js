import { css } from "styled-components"

const utilities = css`
  .mi-wrapper {
    padding-left: 300px;
    position: relative;
    min-height: 100vh;
    z-index: 1;

    @media ${props => props.theme.device.laptop} {
      padding-left: 260px;
    }

    @media ${props => props.theme.device.notebook} {
      padding-left: 0;
    }

    @media ${props => props.theme.device.tablet} {
      padding-left: 0;
    }

    @media ${props => props.theme.device.mobileLg} {
      padding-left: 0;
    }
  }

  .color-theme {
    color: ${props => props.theme.colors.primary};
  }

  .mt-30-reverse {
    margin-top: -30px;
  }

  .mt-30 {
    margin-top: 30px;
  }

  .mt-50-reverse {
    margin-top: -50px;
  }

  .mt-50 {
    margin-top: 50px;
  }

  .mi-padding-top {
    padding-top: 120px;

    @media ${props => props.theme.device.tablet} {
      padding-top: 100px;
    }

    @media ${props => props.theme.device.mobileLg} {
      padding-top: 80px;
    }
  }

  .mi-padding-bottom {
    padding-bottom: 120px;

    @media ${props => props.theme.device.tablet} {
      padding-bottom: 100px;
    }

    @media ${props => props.theme.device.mobileLg} {
      padding-bottom: 80px;
    }
  }

  .mi-section {
    position: relative;
  }
`

export default utilities
