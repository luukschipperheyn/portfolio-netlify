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

const Metadata = styled.div`
  font-size: 12px;
  margin-bottom: 1rem;
  p {
    margin-bottom: 0.2rem;
  }
`

const StyledPage = styled(Page)`
  li::before {
    content: '- ';
  }
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
        url: string
        at: {
          name: string
          url: string
        }
        clients: [
          {
            name: string
            url: string
          }
        ]
      }
    }
  }
}

const ProjectTemplate: React.SFC<ProjectTemplateProps> = ({ data }) => {
  const { title, clients, url, at } = data.markdownRemark.frontmatter
  return (
    <StyledPage>
      <Container>
        <StyledH1>{title}</StyledH1>
        <Metadata>
          {at && (
            <p>
              @{' '}
              <a target="_blank" href={at.url}>
                {at.name}
              </a>
            </p>
          )}
          {clients && (
            <p>
              For{' '}
              {clients.map((client, i) => (
                <span key={`client-${i}`}>
                  {i > 0 ? (i >= clients.length - 1 ? ' and ' : ', ') : ''}
                  <a target="_blank" href={client.url}>
                    {client.name}
                  </a>
                </span>
              ))}
            </p>
          )}
          {url && (
            <p>
              <a target="_blank" href={url}>
                Link to project
              </a>
            </p>
          )}
        </Metadata>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Container>
    </StyledPage>
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        url
        at {
          name
          url
        }
        clients {
          name
          url
        }
      }
    }
  }
`
