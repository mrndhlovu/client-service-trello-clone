import styled from "styled-components"

export default styled.div`
  transition: all 0.5s linear;

  .link-attachment {
    margin: 8px 8px 0;
    width: 449px;
    font-size: 12px;
    overflow: hidden;
    clear: both;
    display: inline-block;
    text-overflow: ellipsis;
    height: 20px;
    box-shadow: 0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214;
    padding: 0 5px;
    border-radius: 3px;
  }

  .mod-preview-type {
    margin-left: 26px;
    min-height: 32px;
    padding: 8px 0;
    position: relative;
  }

  .user-avatar {
    position: absolute;
    left: -37px;
    position: absolute;
  }

  .preview-frame {
    padding: 48px 24px 112px;
    height: auto;
    text-align: center;
    margin: 0 auto;
    background-color: transparent;
  }

  .preview-detail {
    margin: 0 auto;
    position: absolute;
    z-index: 2;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    a {
      color: #fff;
      margin: 0 10px;
      text-decoration: underline;
    }
  }

  .preview {
    img {
      max-height: 300px;
      max-width: 100%;
      border: 1px solid #dfe1e6;
      border-radius: 3px;
      box-sizing: border-box;
      clear: both;
      display: block;
      margin: 8px 0 4px;
    }
  }

  .date {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 400;
  }

  .comment-timeline {
    margin-left: 10px;
  }

  .description {
    color: #172b4d;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  a {
    text-decoration: underline;
  }

  .link-btn.actions {
    border-radius: 3px;
    clear: both;
    color: #5e6c84;
    display: block;
    margin-top: 16px;
    padding: 16px 16px 16px 20px;

    &:hover {
      background-color: #dfe1e6;
    }
  }
`
