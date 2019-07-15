import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import Menu from '../components/Menu'
import styled from '@emotion/styled'
import { colors } from '../styles/colors'
import { Location, LocationProps } from '@reach/router'
import { LocationState } from 'history'
import { breakpoints } from '../styles/variables'
import css from '@emotion/css'
import MdMenu from 'react-ionicons/lib/MdMenu'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const Container = ({ menuOpen, ...props }: any) => (
  <div
    css={css`
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      word-wrap: break-word;
      word-break: break-word;
      height: 100%;
      @media screen and (max-width: ${breakpoints.md}px) {
        width: calc(200% - 76px);
        position: relative;
        left: ${menuOpen ? '0%' : 'calc(-100% + 76px)'};
        transition: left 0.4s ease-in-out;
      }
    `}
    {...props}
  />
)

const StyledMdMenu = ({ show, ...props }: any) => (
  <MdMenu
    css={css`
      display: none;
      @media screen and (max-width: ${breakpoints.md}px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        padding: 24px 8px;
        opacity: ${show ? 1 : 0};
        transition: opacity 0.4s ease-in-out;
        box-sizing: content-box;
      }
    `}
    {...props}
  />
)

const MenuContainer = styled.div`
  flex: 1;
  border-right: 1px solid ${colors.grey};
  overflow-y: auto;
  height: 100%;
  position: relative;
`

const StyledMenu = ({ show, ...props }: any) => (
  <Menu
    css={css`
      position: relative;
      left: ${show ? 0 : '-64px'};
      transition: left 0.6s ease-in-out;
    `}
    {...props}
  />
)

const PageContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`

type Props = {
  location: LocationState
}

const IndexLayout: React.FC<Props> = ({ children, location }) => {
  const pathname = location ? location.pathname : '/'
  const [menuOpen, setMenuOpen] = React.useState(pathname === '/')
  React.useEffect(() => {
    console.log('yo', pathname)
    setMenuOpen(pathname === '/')
  }, [pathname])
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
          <Container menuOpen={menuOpen}>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: data.site.siteMetadata.description },
                { name: 'keywords', content: data.site.siteMetadata.keywords }
              ]}
            >
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
              <link rel="manifest" href="/site.webmanifest" />
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color={colors.lightBlue} />
              <meta name="msapplication-TileColor" content={colors.pink} />
              <meta name="theme-color" content={colors.pink}></meta>
            </Helmet>
            <MenuContainer onClick={() => setMenuOpen(true)}>
              <StyledMdMenu color={colors.white} show={!menuOpen} />
              <StyledMenu
                show={menuOpen}
                onClickLink={(e: React.SyntheticEvent) => {
                  setMenuOpen(false)
                  e.stopPropagation()
                }}
              />
            </MenuContainer>
            <PageContainer onClick={() => setMenuOpen(false)}>
              <LayoutMain>{children}</LayoutMain>
            </PageContainer>
          </Container>
        </LayoutRoot>
      )}
    />
  )
}

export default IndexLayout
