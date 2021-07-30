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
    overflow: hidden !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${props => props.theme.variables.body};
    line-height: 1.8rem;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.body};
    font-weight: 400;
    background: ${props => props.theme.colors.bgBody};

    @media ${props => props.theme.device.tablet} {
      font-size: calc(${props => props.theme.variables.body} - 2);
    }

    @media ${props => props.theme.device.mobileLg} {
      font-size: calc(${props => props.theme.variables.body} - 3);
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
    color: ${props => props.theme.colors.heading};
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

  ::-moz-selection {
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
  }

  ::-ms-selection {
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
  }

  ::-o-selection {
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
  }

  ::selection {
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
  }

  a {
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      outline: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  input,
  button,
  select,
  textarea {
    background: transparent;
    border: 1px solid ${props => props.theme.colors.border};
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.body};
    ${props => props.theme.mixins.placeholderColor(props.theme.colors.body)};

    &:focus,
    &:active {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }

  input,
  select,
  textarea {
    width: 100%;
    font-size: 14px;
    vertical-align: middle;
  }

  input,
  select,
  button {
    padding: 0 15px;

    @media ${props => props.theme.device.mobileLg} {
      height: 44px;
    }
  }

  textarea {
    padding: 10px 15px;
  }

  blockquote {
    border-left: 5px solid ${props => props.theme.colors.primary};
    font-size: 18px;
    line-height: 27px;
    padding: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    margin-left: 25px;
    background: lighten(${props => props.theme.colors.bgBody}, 5);

    p {
      margin-bottom: 0;
      font-style: italic;
      font-size: 1.2rem;
    }

    footer {
      font-size: 14px;

      a {
        color: ${props => props.theme.colors.primary};

        &:hover {
          color: ${props => props.theme.colors.primary};
        }
      }
    }

    @media ${props => props.theme.device.mobileLg} {
      font-size: 16px;
      line-height: 25px;
      padding: 20px;
      margin-left: 0;
    }
  }

  [class^="flaticon-"],
  [class*=" flaticon-"],
  [class^="flaticon-"],
  [class*=" flaticon-"] {
    line-height: 1;

    &::before,
    &::after {
      margin-left: 0;
      font-size: inherit;
      vertical-align: middle;
    }
  }

  .stylish-list {
    padding-left: 0;

    li {
      list-style: none;
      line-height: 30px;
      position: relative;
      padding-left: 35px;
    }

    i {
      position: absolute;
      left: 0;
      top: 7px;
      font-size: 16px;
      color: ${props => props.theme.colors.primary};
    }
  }

  input,
  select,
  textarea {
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 50000s ease-in-out 0s,
        color 50000s ease-in-out 0s;
    }
  }

  /* Checkbox & Radio Styles */
  input[type="checkbox"],
  input[type="radio"] {
    visibility: hidden;
    opacity: 0;
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    display: none;

    & ~ label {
      position: relative;
      padding-left: 24px;
      cursor: pointer;

      &:before {
        content: "";
        font-family: ${props => props.theme.fonts.primary};
        font-weight: 700;
        position: absolute;
        left: 0;
        top: 5px;
        border: 1px solid ${props => props.theme.colors.border};
        height: 15px;
        width: 15px;
        line-height: 1;
        font-size: 13px;
      }
    }

    &:checked {
      & ~ label {
        color: ${props => props.theme.colors.primary};

        &:before {
          content: "\f00c";

          color: ${props => props.theme.colors.primary};
          border-color: ${props => props.theme.colors.primary};
        }
      }
    }
  }

  input[type="radio"] {
    & ~ label {
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        border: 2px solid ${props => props.theme.colors.border};
        border-radius: 100px;
        height: 15px;
        width: 15px;
        margin-top: -8px;
        line-height: 0.5;
        font-size: 28px;
      }
    }

    &:checked {
      & ~ label {
        &::before {
          content: "";
          color: ${props => props.theme.colors.primary};
          border-color: ${props => props.theme.colors.primary};
        }
      }
    }
  }
`

export default typography
