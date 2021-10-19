import { useState, MouseEvent } from "react"
import { useRouter } from "next/router"

import { withAuthComponent, withAuthSsp } from "../../../lib/hocs"
import SidebarLayout from "../../../components/layout/sidebar/SidebarLayout"
import { ITemplate, useGlobalState } from "../../../lib/providers"
import {
  BackgroundImage,
  TemplateCategory,
} from "../../../components/home/Templates"
import SelectWorkspaceModal from "../../../components/home/SelectWorkspaceModal"

const index = () => {
  const { templates } = useGlobalState()
  const { asPath } = useRouter()

  const [selectedTemplate, setSelectedTemplate] = useState<
    ITemplate | undefined
  >()

  const category = asPath.split("/")?.[2]
  const filteredCategories = templates?.filter(
    item => item?.category === category
  )

  const toggleModal = (ev?: MouseEvent) => {
    const template = templates.find(item => item.id === ev.currentTarget.id)

    setSelectedTemplate(template)
  }

  return (
    <SidebarLayout>
      <TemplateCategory>
        <h2>{category}</h2>
        <div className="category-option">
          {filteredCategories?.map((template, index) => (
            <div key={index} className="category-item">
              <BackgroundImage
                bgColor={template.bgColor}
                className="category-bg"
              />

              <div className="category-content">
                <button
                  className="link-btn"
                  id={template?.id}
                  onClick={toggleModal}
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
      </TemplateCategory>
      {!!selectedTemplate && (
        <SelectWorkspaceModal
          selectedTemplate={selectedTemplate}
          onClose={toggleModal}
          isOpen={!!selectedTemplate}
        />
      )}
    </SidebarLayout>
  )
}

export const getServerSideProps = withAuthSsp()

export default withAuthComponent(index)
