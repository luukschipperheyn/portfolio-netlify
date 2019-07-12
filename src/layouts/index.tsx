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

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const StyledMenu = styled(Menu)`
  width: 200px;
  @media screen and (max-width: ${breakpoints.md}px) {
    width: 100%;
  }
`
const StyledLayoutMain = styled(LayoutMain)`
  flex: 1;
`

const IndexLayout: React.FC = ({ children, location }) => (
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
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords }
          ]}
        />
        <StyledMenu location={location} />
        <StyledLayoutMain>{children}</StyledLayoutMain>
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
