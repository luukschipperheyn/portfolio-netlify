import React, { FunctionComponent } from 'react'
import Page from '../components/Page'
import CollapsibleList from '../components/CollapsibleList'
import styled from '@emotion/styled-base'
import css from '@emotion/css'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import { colors } from '../styles/colors'
import { uiColors } from '../styles/variables'

const CL = styled(CollapsibleList)`
  display: inline;
  margin-left: 0.1rem;
  ul {
    display: inline;
  }
`
const StyledImg = styled(Img)`
  position: relative;
  top: 0.25rem;
`

const StyledLink = (props: any) => (
  <Link
    activeStyle={{
      background: uiColors.active.background,
      color: uiColors.active.text
    }}
    {...props}
  />
)

const I = styled((props: any) => <div {...props} />)``

const HorizontalScrollContainer = styled((props: any) => <div {...props} />)`
  overflow-x: auto;
`

type MenuProps = {
  data: any
}

const Menu: FunctionComponent<MenuProps> = data => {
  return (
    <Page
      css={css`
        border-right: 1px solid ${colors.grey};
      `}
    >
      <HorizontalScrollContainer css={css``}>
        Hi, I'm{' '}
        <CL label="Luuk" hint={true}>
          , A{' '}
          <CL label="guy">
            {' '}
            ( <StyledImg fixed={data.luuk.childImageSharp.fixed} /> )
          </CL>{' '}
          who makes{' '}
          <CL label="stuff">
            {' '}
            - like{' '}
            <CL label="websites">
              , such as <StyledLink to="/projects/apartheid-revisited/">Apartheid Revisited</StyledLink>
            </CL>
            ,{' '}
            <CL label="apps">
              , like <StyledLink to="/projects/openr/">Openr</StyledLink>
            </CL>{' '}
            and{' '}
            <CL label="interactive installations">
              , like <StyledLink to="/projects/mgnt/">MGNT</StyledLink>
            </CL>{' '}
            -
          </CL>{' '}
          on his computer. Usually by doing some kind of{' '}
          <CL label="programming">
            , using various technologies, like JavaScript, TypeScript, React, Redux, React Native, Vue, NodeJS, Python, Django, Java,
            Android, Arduino, Max/MSP and Supercollider
          </CL>
          . You can reach me at <a href="mailto:luukschipperheyn@gmail.com">luukschipperheyn@gmail.com</a>
        </CL>
      </HorizontalScrollContainer>
    </Page>
  )
}

export default () => (
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
    render={Menu}
  />
)
