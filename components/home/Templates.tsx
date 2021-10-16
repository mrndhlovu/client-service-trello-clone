import { useGlobalState } from "../../lib/providers"
import styled from "styled-components"
import { Button } from "@chakra-ui/button"

import { CATEGORY_OPTIONS, ROUTES } from "../../util/constants"
import { NextLink } from "../shared"

const Container = styled.div`
  margin-bottom: 50px;
`

export const TemplateCategory = styled.div`
  margin-bottom: 40px;
  position: relative;

  .link-btn {
    text-decoration: underline;
    margin: 5px 0 0;
  }

  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    margin-top: 6px;
    font-weight: 600;
    margin: 0 0 8px;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
  }

  .category-content {
    padding: 10px;
  }

  .category-option {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    place-items: center;
    margin-top: 24px;
    width: 100%;
    justify-content: flex-start;
    vertical-align: top;
    align-items: baseline;
    justify-content: space-between;
  }

  .header,
  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }

  .header {
    div {
      margin-top: 12px;
      font-size: 14px;
      line-height: 20px;
      color: #172b4d;
      font-weight: bold;
    }
  }

  .description {
    div {
      font-size: 12px;
      line-height: 20px;
      color: #172b4d;
    }
  }

  a {
    position: absolute;
    right: 0;
    bottom: -35px;

    button {
      text-transform: capitalize;
      font-weight: 200;
    }
  }
`

export const BackgroundImage = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  height: 132px;
  width: auto;
  border-radius: 3px;
  position: relative;
`

const Templates = () => {
  const { templates, handleUseTemplate } = useGlobalState()

  return (
    <Container>
      {CATEGORY_OPTIONS.map(name => (
        <TemplateCategory key={name}>
          <h2>{name}</h2>
          <div className="category-option">
            {templates
              .filter(template => template.category === name)
              .slice(0, 3)
              .map((template, index) => (
                <div key={index} className="category-item">
                  <BackgroundImage
                    bgColor={template.bgColor}
                    className="category-bg"
                  />
                  <div className="category-content">
                    <button
                      className="link-btn"
                      id={template?.id}
                      onClick={handleUseTemplate}
                    >
                      Use Template
                    </button>
                    <div className="header">
                      <div>{template.name}</div>
                    </div>
                    <div className="description">
                      <div className="text">{template.description}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <NextLink href={`/${ROUTES.templates}/${name}`}>
            <Button size="sm">{`More templates for ${name}`}</Button>
          </NextLink>
        </TemplateCategory>
      ))}
    </Container>
  )
}

export default Templates
