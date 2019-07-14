import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import Menu from '../components/Menu'
import styled from '@emotion/styled'
import { breakpoints } from '../styles/variables'
import { colors } from '../styles/colors'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
`

const IndexLayout: React.FC = ({ children, location }) => {
  console.log('location', location)
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={(data: StaticQueryProps) => (
        <LayoutRoot>
          <Container>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: data.site.siteMetadata.description },
                { name: 'keywords', content: data.site.siteMetadata.keywords }
              ]}
            />
            <Menu />
            <LayoutMain>{children}</LayoutMain>
          </Container>
        </LayoutRoot>
      )}
    />
  )
}

export default IndexLayout
