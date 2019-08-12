import styled from '@emotion/styled-base'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import React, { FunctionComponent, useEffect, useState } from 'react'
import CollapsibleList from '../components/CollapsibleList'
import Page from '../components/Page'
import { uiColors } from '../styles/variables'
import { useDebouncedCallback } from 'use-debounce'
import css from '@emotion/css'

const StyledImg = styled(Img)`
  position: relative;
  top: 0.25rem;
  margin-top: -12px;
`

type MenuProps = {
  data: any
  onClickLink: () => void
}

const CL = styled(CollapsibleList)`
  display: inline;
  margin-left: 0.1rem;
  ul {
    display: inline;
  }
`

const Menu: FunctionComponent<MenuProps> = ({ onClickLink, data, ...props }) => {
  const [showHints, setShowHints] = useState(false)
  const [listsOpened, setListsOpened] = useState(0)
  const [debouncedShowHints] = useDebouncedCallback(() => {
    if (listsOpened < 2) {
      setShowHints(true)
    }
  }, 10000)
  useEffect(() => {
    const showHintsTimeout = setTimeout(() => {
      if (listsOpened < 1) {
        setShowHints(true)
      }
    }, 5000)
    return () => clearTimeout(showHintsTimeout)
  }, [])
  useEffect(() => {
    setShowHints(false)
    debouncedShowHints()
  }, [listsOpened])
  const StyledLink = (props: any) => (
    <Link
      activeStyle={{
        background: uiColors.active.background,
        color: uiColors.active.text
      }}
      css={css`
        background: ${uiColors.link.background};
        color: ${uiColors.link.text};
      `}
      onClick={onClickLink}
      {...props}
    />
  )
  const handleListOpen = () => {
    setListsOpened(listsOpened + 1)
  }
  return (
    <StaticQuery
      query={graphql`
        query {
          luuk: file(relativePath: { eq: "assets/images/luuk.png" }) {
            childImageSharp {
              fixed(width: 28, height: 28) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <Page {...props}>
            Hi, I'm{' '}
            <CL showHint={showHints} onOpen={handleListOpen} label="Luuk">
              , A{' '}
              <CL showHint={showHints} onOpen={handleListOpen} label="guy">
                {' '}
                ( <StyledImg fixed={data.luuk.childImageSharp.fixed} /> )
              </CL>{' '}
              who makes{' '}
              <CL showHint={showHints} onOpen={handleListOpen} label="stuff">
                {' '}
                - like{' '}
                <CL showHint={showHints} onOpen={handleListOpen} label="websites">
                  , such as <StyledLink to="/projects/apartheid-revisited/">Apartheid Revisited</StyledLink>
                </CL>
                ,{' '}
                <CL showHint={showHints} onOpen={handleListOpen} label="apps">
                  , like <StyledLink to="/projects/openr/">Openr</StyledLink>
                </CL>{' '}
                and{' '}
                <CL showHint={showHints} onOpen={handleListOpen} label="interactive installations">
                  , like <StyledLink to="/projects/mgnt/">MGNT</StyledLink>
                </CL>{' '}
                -
              </CL>{' '}
              on his computer. Usually by doing some kind of{' '}
              <CL showHint={showHints} onOpen={handleListOpen} label="programming">
                , using JavaScript, TypeScript, React, Redux, React Native, Vue, NodeJS, Python, Django, Java, Android, Arduino, Particle,
                Max/MSP and Supercollider
              </CL>
              . You can reach me at <a href="mailto:luukschipperheyn@gmail.com">luukschipperheyn@gmail.com</a>
            </CL>
          </Page>
        )
      }}
    />
  )
}

export default Menu
