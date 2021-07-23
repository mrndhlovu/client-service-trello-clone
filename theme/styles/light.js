import { css } from "styled-components"

const lightStyles = css`
  .light {
    *::-webkit-scrollbar-track {
      background-color: #383838;
    }

    *::-webkit-scrollbar {
      background-color: #383838;
    }

    *::-webkit-scrollbar-thumb {
      background-color: #6b6b6b;
    }

    & {
      color: ${props => props.theme.colors.body};
      background: ${props => props.theme.colors.lightBgBody};
    }

    ${props => props.theme.mixins.placeholderColor(props.theme.colors.body)};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${props => props.theme.colors.lightHeading};
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

    input,
    button,
    select,
    textarea {
      border-color: ${props => props.theme.colors.lightBorder};
      color: ${props => props.theme.colors.body};
      ${props =>
        props.theme.mixins.placeholderColor(props.theme.colors.lightBody)};

      &:focus,
      &:active {
        border-color: ${props => props.theme.colors.primary};
      }
    }

    blockquote {
      border-color: ${props => props.theme.colors.primary};
      background: darken(${props => props.theme.colors.lightBody}, 5);

      footer {
        a {
          color: ${props => props.theme.colors.primary};

          &:hover {
            color: ${props => props.theme.colors.primary};
          }
        }
      }
    }

    /* Checkbox & Radio Styles */
    input[type="checkbox"],
    input[type="radio"] {
      & ~ label {
        &:before {
          border-color: ${props => props.theme.colors.lightBorder};
        }
      }

      &:checked {
        & ~ label {
          color: ${props => props.theme.colors.primary};

          &:before {
            color: ${props => props.theme.colors.primary};
            border-color: ${props => props.theme.colors.primary};
          }
        }
      }
    }

    .color-theme {
      color: ${props => props.theme.colors.primary};
    }

    .light-mode {
      .icon {
        svg {
          fill: ${props => props.theme.colors.lightBody};

          & > * {
            fill: ${props => props.theme.colors.lightBody};
          }
        }
      }

      .light-mode-switch {
        background: ${props => props.theme.colors.lightBody};

        &::after {
          background: #ffffff;
        }

        &.active {
          &::after {
            background: ${props => props.theme.colors.primary};
          }
        }
      }
    }
  }
`

export default lightStyles
