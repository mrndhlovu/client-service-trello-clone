import styled from "styled-components"

export default styled.div`
  .edit-workspace {
    span {
      color: #091e42;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 28px;
      display: block;
      margin-bottom: 12px;
    }

    p {
      font-size: 18px;
      color: #6b778c;
      text-align: left;
      margin: 12px auto 24px;
    }

    label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      margin-bottom: 4px;
      margin-top: 24px;
      color: #091e42;
    }

    .btn-group {
      margin-top: 15px;
    }
  }

  .option-container {
    .item-container {
      position: relative;
      padding: 10px 0 20px;

      strong {
        text-transform: capitalize;
      }

      .description {
        width: 87%;
      }

      .option-header {
        display: flex;
        align-items: center;
        gap: 8px;

        .icon-pvt {
          color: ${props => props.theme.colors.error};
        }

        .icon-public {
          color: ${props => props.theme.colors.whatsapp};
        }
      }

      .visibility-btn {
        position: absolute;
        top: 40%;
        right: 0;
      }
    }

    .item-container:not(:last-child) {
      border-bottom: 1px solid currentColor;
    }

    .description-detail {
      clear: both;
      color: #5e6c84;
      display: block;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      margin-top: 4px;
      text-align: left;
      margin-bottom: 10px;
    }

    p:first-child {
      padding-bottom: 10px;
      color: #091e42;
      font-weight: 600;
    }

    .content {
      padding: 5px;
      &:hover {
        background-color: #eee;
      }
    }
  }
`
