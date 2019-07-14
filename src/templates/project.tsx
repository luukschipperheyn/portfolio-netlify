import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import styled from '@emotion/styled'
import { uiColors } from '../styles/variables'

const StyledH1 = styled.h1`
  background: ${uiColors.active.background};
  color: ${uiColors.active.text};
`

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
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
      }
    }
  }
}

const ProjectTemplate: React.SFC<ProjectTemplateProps> = ({ data }) => (
  <Page>
    <Container>
      <StyledH1>{data.markdownRemark.frontmatter.title}</StyledH1>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Container>
  </Page>
)

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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`
