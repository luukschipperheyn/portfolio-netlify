import { graphql } from 'gatsby'
import * as React from 'react'

import styled from '@emotion/styled'
import Container from '../components/Container'
import Page from '../components/Page'
import { colors, uiColors } from '../styles/variables'

const StyledH1 = styled.h1`
  background: ${uiColors.title.background};
  color: ${uiColors.title.text};
  font-size: 3rem;
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
  ul {
    margin-bottom: 1rem;
  }
  img {
    box-shadow: none !important;
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
        collaborators: [
          {
            name: string
            url: string
          }
        ]
      }
    }
  }
}

const ProjectTemplate: React.FunctionComponent<ProjectTemplateProps> = ({ data }) => {
  const { title, clients, url, at, collaborators } = data.markdownRemark.frontmatter
  return (
    <StyledPage>
      <Container className='collide'>
        <StyledH1 className='collide'>{title}</StyledH1>
        <Metadata className='collide'>
          {collaborators && (
            <p>
              with{' '}
              {collaborators.map((collaborator, i) => (
                <span key={`collaborator-${i}`}>
                  {i > 0 ? (i >= collaborators.length - 1 ? ' and ' : ', ') : ''}
                  <a target="_blank" href={collaborator.url}>
                    {collaborator.name}
                  </a>
                </span>
              ))}
            </p>
          )}
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
        <div className='collide' dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
        collaborators {
          name
          url
        }
      }
    }
  }
`
