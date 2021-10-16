import { useRouter } from "next/router"

import { withAuthComponent, withAuthSsp } from "../../../lib/hocs"
import SidebarLayout from "../../../components/layout/sidebar/SidebarLayout"
import { useGlobalState } from "../../../lib/providers"
import {
  BackgroundImage,
  TemplateCategory,
} from "../../../components/home/Templates"

const index = () => {
  const { templates, handleUseTemplate } = useGlobalState()
  const { asPath } = useRouter()

  const category = asPath.split("/")?.[2]
  const filteredCategories = templates?.filter(
    item => item?.category === category
  )

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
      </TemplateCategory>
    </SidebarLayout>
  )
}

export const getServerSideProps = withAuthSsp()

export default withAuthComponent(index)
