import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import Img from 'gatsby-image/withIEPolyfill'
import styled from '@emotion/styled-base'

interface ProjectTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    projectsJson: {
      title: string
      content: [{ image: any; text: string }]
    }
  }
}

const StyledImg = styled(Img)`
  max-height: 300px;
`

const ProjectTemplate: React.SFC<ProjectTemplateProps> = ({ data }) => {
  const { title, content } = data.projectsJson
  const [contentIndex, setContentIndex] = React.useState(0)
  const item = content[contentIndex]
  React.useEffect(() => {
    speechSynthesis.speak(new SpeechSynthesisUtterance(item.text))
  }, [item])
  const isLastContentItem = () => contentIndex >= content.length - 1
  const incrementContentIndex = () => {
    if (!isLastContentItem()) {
      setContentIndex(contentIndex + 1)
    }
  }
  const resetContentIndex = () => setContentIndex(0)
  return (
    <Page>
      <Container>
        <h1>{title}</h1>
        <div>
          <StyledImg fluid={item.image.childImageSharp.fluid} objectFit="cover" objectPosition="50% 50%" alt="" />
          <p>{item.text}</p>
          {contentIndex !== 0 && <button onClick={resetContentIndex}>reset</button>}
          {!isLastContentItem() && <button onClick={incrementContentIndex}>next</button>}
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        {/* <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} /> */}
      </Container>
    </Page>
  )
}

export default ProjectTemplate

export const query = graphql`
  query ProjectTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    projectsJson(fields: { slug: { eq: $slug } }) {
      title
      content {
        text
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
