import styled from '@emotion/styled'
import { graphql, StaticQuery } from 'gatsby'
// import { LocationState } from 'history'
import 'modern-normalize'
import * as React from 'react'
import Helmet from 'react-helmet'
import MdMenu from 'react-ionicons/lib/Menu'
import LayoutMain from '../components/LayoutMain'
import LayoutRoot from '../components/LayoutRoot'
import Menu from '../components/Menu'
import { colors } from '../styles/colors'
import '../styles/normalize'
import { breakpoints } from '../styles/variables'
import { HLocation, Location, LocationProps } from '@reach/router'
import { css } from '@emotion/react'
import { Background } from '../components/Background'

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
      /* max-width: 1200px; */
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      word-wrap: break-word;
      word-break: break-word;
      height: 100%;
      background: #7777a0;
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
        cursor: pointer;
      }
    `}
    {...props}
  />
)

const ScrollContainer = ({ pointer, ...props }: any) => (
  <div
    css={css`
      flex: 1;
      overflow-y: auto;
      height: 100%;
      display: flex;
      @media screen and (max-width: ${breakpoints.md}px) {
        cursor: ${pointer};
      }
    `}
    {...props}
  />
)

const MenuScrollContainer = styled(ScrollContainer)`
  justify-content: flex-end;
  border-right: 1px solid ${colors.grey};
`

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`

const StyledMenu = ({ show, ...props }: any) => (
  <Menu
    css={css`
      position: relative;
      @media screen and (max-width: ${breakpoints.md}px) {
        left: ${show ? 0 : '-64px'};
        transition: left 0.6s ease-in-out;
      }
    `}
    {...props}
  />
)

type Props = {
  location: HLocation
}

const IndexLayout: React.FC<Props & React.PropsWithChildren> = ({ children, location }) => {
  const pathname = location ? location.pathname : '/'
  const [menuOpen, setMenuOpen] = React.useState(pathname === '/')
  React.useEffect(() => setMenuOpen(pathname === '/'), [pathname])
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
            <MenuScrollContainer
              css={css`
                @media screen and (max-width: ${breakpoints.md}px) {
                  cursor: ${menuOpen ? 'auto' : 'pointer'};
                }
              `}
            >
              <InnerContainer onClick={() => setMenuOpen(true)}>
                <StyledMdMenu color={colors.white} show={!menuOpen} />
                <StyledMenu
                  show={menuOpen}
                  onClickLink={(e: React.SyntheticEvent) => {
                    setMenuOpen(false)
                    e.stopPropagation()
                  }}
                />
              </InnerContainer>
            </MenuScrollContainer>
            <ScrollContainer
              className="scroll-container"
              css={css`
                @media screen and (max-width: ${breakpoints.md}px) {
                  cursor: ${!menuOpen ? 'auto' : 'pointer'};
                }
              `}
            >
              <InnerContainer onClick={() => setMenuOpen(false)}>
                <LayoutMain>{children}</LayoutMain>
              </InnerContainer>
            </ScrollContainer>
          </Container>
        </LayoutRoot>
      )}
    />
  )
}

export default IndexLayout
