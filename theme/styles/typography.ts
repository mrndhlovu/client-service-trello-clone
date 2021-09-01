import { css } from "styled-components"

const typography = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #383838;
  }

  *::-webkit-scrollbar {
    width: 5px;
    background-color: #383838;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #6b6b6b;
  }

  html {
    overflow: hidden;
    overflow-y: auto;
  }

  body {
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${props => props.theme.variables.body};
    line-height: 1.29rem;
    font-family: ${props => props.theme.fonts.secondary};
    color: ${props => props.theme.colors.body};
    font-weight: 400;
    background: ${props => props.theme.colors.bgBody};

    @media ${props => props.theme.device.tablet} {
      font-size: calc(${props => props.theme.variables.body} + 2);
    }

    @media ${props => props.theme.device.mobileLg} {
      font-size: calc(${props => props.theme.variables.body} + 1);
    }
  }

  img {
    max-width: 100%;
  }
  ${props => props.theme.mixins.placeholderColor(props.theme.colors.body)};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.border};
  }

  h1 {
    font-size: 3.2857rem;
    line-height: 4rem;

    @media ${props => props.theme.device.tablet} {
      font-size: 2.9857rem;
      line-height: 3.4rem;
    }

    @media ${props => props.theme.device.mobileLg} {
      font-size: 2.6857rem;
      line-height: 3.1rem;
    }
  }

  h2 {
    font-size: 2.57rem;
    line-height: 3.2857rem;

    @media ${props => props.theme.device.tablet} {
      font-size: 2.37rem;
      line-height: 3.0857rem;
    }

    @media ${props => props.theme.device.mobileLg} {
      font-size: 2.17rem;
      line-height: 2.857rem;
    }
  }

  h3 {
    font-size: 2rem;
    line-height: 2.7rem;

    @media ${props => props.theme.device.mobileLg} {
      font-size: 1.91rem;
      line-height: 2.357rem;
    }
  }

  h4 {
    font-size: 1.71rem;
    line-height: 2.43rem;

    @media ${props => props.theme.device.mobileLg} {
      font-size: 1.51rem;
      line-height: 2.13rem;
    }
  }

  h5 {
    font-size: 1.43rem;
    line-height: 2.14rem;

    @media ${props => props.theme.device.mobileLg} {
      font-size: 1.23rem;
      line-height: 2.04rem;
    }
  }

  h6 {
    font-size: 1.14rem;
    line-height: 1.857rem;

    @media ${props => props.theme.device.mobileLg} {
      font-size: 1.04rem;
      line-height: 1.657rem;
    }
  }

  .input-container {
    position: relative;
    margin: 5px 0 15px;
    cursor: text;
    max-width: 100%;
    transition: background-color 0.2s ease-in-out 0s,
      border-color 0.2s ease-in-out 0s;
    overflow-wrap: break-word;

    input {
      background-color: transparent;
      border-radius: 3px;
      border-width: 2px;
      border-style: solid;
      box-sizing: border-box;
      color: inherit;
      cursor: inherit;
      font-size: 14px;
      min-width: 0px;
      outline: none;
      width: 100%;
      line-height: 1.42857;
      height: 39px;
      padding-left: 10px;
    }

    .input-feedback {
      position: absolute;
      bottom: -12px;
      left: 0;
      font-size: 10px;
      margin-top: 0;
      font-weight: 700;
      color: ${props => props.theme.colors.error};
    }
  }

  a,
  button {
    cursor: pointer;
  }

  button {
    border-radius: 3px;
  }
`

export default typography
