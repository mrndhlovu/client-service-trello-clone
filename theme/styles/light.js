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

    .stylish-list {
      i {
        color: ${props => props.theme.colors.primary};
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

    input[type="radio"] {
      & ~ label {
        &::before {
          border: 2px solid ${props => props.theme.colors.lightBorder};
        }
      }

      &:checked {
        & ~ label {
          &::before {
            color: ${props => props.theme.colors.primary};
            border-color: ${props => props.theme.colors.primary};
          }
        }
      }
    }

    .color-theme {
      color: ${props => props.theme.colors.primary};
    }

    .mi-bglines {
      span {
        background: ${props => props.theme.colors.lightBorder};
      }
    }

    .light-mode {
      background: ${props => props.theme.colors.lightSecondary};

      .icon {
        svg {
          fill: #fff;

          & > * {
            fill: #fff;
          }
        }
      }

      .light-mode-switch {
        background: ${props => props.theme.colors.lightBorder};

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

    /**
 * Button
 */

    .mi-button {
      background: ${props => props.theme.colors.primary};
      color: #ffffff;

      &::before {
        background: #ffffff;
      }

      &:hover {
        color: #ffffff;
      }
    }

    .mi-readmore {
      color: ${props => props.theme.colors.primary};

      &::after {
        background: ${props => props.theme.colors.primary};
      }

      &:hover {
        color: ${props => props.theme.colors.primary};
      }
    }

    .mi-pagination {
      li {
        a {
          border-color: ${props => props.theme.colors.primary};
          color: ${props => props.theme.colors.primary};
        }

        &.is-active {
          a {
            background: ${props => props.theme.colors.primary};
            color: #ffffff;
          }
        }
      }
    }

    .mi-header {
      background: ${props => props.theme.colors.lightBgBody};
      border-color: ${props => props.theme.colors.lightBorder};

      &-toggler {
        background: ${props => props.theme.colors.lightBody};

        &:focus {
          border-color: ${props => props.theme.colors.lightBorder};
        }
      }

      &-image {
        border-color: ${props => props.theme.colors.lightBorder};

        a {
          border-color: ${props => props.theme.colors.lightBorder};
        }
      }

      &-menu {
        li {
          a {
            color: ${props => props.theme.colors.body};

            &::before {
              background: ${props => props.theme.colors.lightBody};
            }

            &:hover {
              color: ${props => props.theme.colors.primary};
            }

            &.active {
              color: #ffffff;

              &::before {
                background: ${props => props.theme.colors.primary};
              }
            }
          }
        }
      }

      &-copyright {
        border-color: ${props => props.theme.colors.lightBorder};

        a {
          color: ${props => props.theme.colors.body};

          &:hover {
            color: ${props => props.theme.colors.primary};
          }
        }
      }
    }

    .mi-socialicons {
      li {
        a {
          color: ${props => props.theme.colors.body};

          &:hover {
            color: ${props => props.theme.colors.primary};
          }
        }
      }

      .mi-socialicons-bordered {
        li {
          a {
            border-color: ${props => props.theme.colors.lightBorder};

            &:hover {
              border-color: ${props => props.theme.colors.primary};
            }
          }
        }
      }
    }

    .mi-sectiontitle {
      span {
        color: rgba(215 220 230);
      }

      h2 {
        &::before {
          background: ${props => props.theme.colors.lightTheme};
        }

        &::after {
          background: ${props => props.theme.colors.primary};
        }
      }
    }

    .mi-smalltitle {
      &-icon {
        color: ${props => props.theme.colors.body};
      }
    }

    .mi-skills-chart {
      .mi-skills-chart-container {
        background: ${props => props.theme.colors.lightBorder};
      }

      .mi-skills-chart-active {
        background: ${props => props.theme.colors.primary};
      }
    }

    .mi-service {
      border-color: ${props => props.theme.colors.lightBorder};
      background: darken(${props => props.theme.colors.lightBody}, 5);

      .mi-service-icon {
        color: ${props => props.theme.colors.primary};
      }

      h5 {
        &::before {
          background: ${props => props.theme.colors.lightBorder};
        }
      }

      &:hover {
        border-top-color: ${props => props.theme.colors.primary};
      }
    }

    .mi-portfolio {
      &-image {
        &::before {
          background: rgba(255, 255, 255, 0.9);
        }

        ul {
          li {
            a,
            button {
              background: ${props => props.theme.colors.body};
              color: #ffffff;
              border: 1px solid ${props => props.theme.colors.body};

              &:hover {
                background: ${props => props.theme.colors.primary};
                border-color: ${props => props.theme.colors.primary};
              }
            }
          }
        }
      }

      h5 {
        color: $light-color-heading;

        a {
          color: $light-color-heading;

          &:hover {
            color: ${props => props.theme.colors.primary};
          }
        }
      }

      h6 {
        color: ${props => props.theme.colors.body};
      }
    }

    .mi-resume {
      .mi-resume-wrapper {
        border-color: ${props => props.theme.colors.lightBorder};
      }

      .mi-resume-summary {
        &::before {
          background: ${props => props.theme.colors.bgBody};
          border-color: ${props => props.theme.colors.lightBorder};
        }
      }

      .mi-resume-year {
        color: ${props => props.theme.colors.body};
      }

      .mi-resume-company {
        color: $light-color-heading;
      }

      .mi-resume-details {
        &::before {
          background: ${props => props.theme.colors.lightBorder};
        }

        h5 {
          color: ${props => props.theme.colors.primary};
        }
      }
    }

    .mi-testimonial {
      .mi-testimonial-content {
        border-color: ${props => props.theme.colors.lightBorder};
        background: darken(${props => props.theme.colors.lightBody}, 5);

        &::after {
          border-color: darken(${props => props.theme.colors.lightBody}, 5)
            transparent transparent
            darken(${props => props.theme.colors.lightBody}, 5);
        }
      }

      .mi-testimonial-author {
        h6 {
          color: ${props => props.theme.colors.body};
        }
      }
    }

    .mi-form {
      .mi-form -field {
        label {
          background: ${props => props.theme.colors.bgBody};
        }

        input,
        textarea {
          border-color: ${props => props.theme.colors.lightBorder};
        }
      }
    }

    .mi-blog {
      background: darken(${props => props.theme.colors.lightBody}, 5);

      .mi-blog-date {
        background: ${props => props.theme.colors.lightTheme};
        color: #ffffff;
      }

      .mi-blog-content {
        h5 {
          a {
            color: ${props => props.theme.colors.lightHeading};

            &:hover {
              color: ${props => props.theme.colors.primary};
            }
          }
        }
      }
    }

    .notfound {
      .notfound-inner {
        background: darken(${props => props.theme.colors.lightBody}, 5);
      }

      h1 {
        color: #fd7171;
      }
    }

    .mi-about {
      .mi-about-image {
        &::before {
          background: ${props => props.theme.colors.lightTheme};
        }

        &::after {
          background: ${props => props.theme.colors.lightTheme};
        }

        &-icon {
          color: #ffffff;
        }
      }
    }

    .mi-contact {
      &-infoblock {
        background: darken(${props => props.theme.colors.lightBody}, 1);

        &-icon {
          border-color: ${props => props.theme.colors.lightBorder};
        }

        &-content {
          p {
            a {
              color: ${props => props.theme.colors.body};

              &:hover {
                color: ${props => props.theme.colors.primary};
              }
            }
          }
        }
      }
    }
  }
`

export default lightStyles
