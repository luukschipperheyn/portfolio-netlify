import React, { FunctionComponent } from 'react'
import Page from '../components/Page'
import CollapsibleList from '../components/CollapsibleList'
import styled from '@emotion/styled-base'
import css from '@emotion/css'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

const CL = styled(CollapsibleList)`
  display: inline;
  margin-left: 0.1rem;
  ul {
    display: inline;
  }
`

const I = styled((props: any) => <div {...props} />)``

const HorizontalScrollContainer = styled((props: any) => <div {...props} />)`
  overflow-x: auto;
`

type LuukPageProps = {
  data: any
}

const LuukPage: FunctionComponent<LuukPageProps> = ({ data }) => {
  console.log(data)
  return (
    <Page>
      <HorizontalScrollContainer css={css``}>
        Hi, I'm{'   '}
        <CL label="Luuk">
          , A{' '}
          <CL label="guy">
            {' '}
            (<Img fixed={data.luuk.childImageSharp.fixed} />){' '}
          </CL>{' '}
          who{' '}
          <CL label="makes">
            , usually by doing{' '}
            <CL label="some kind of programming">
              , using various technologies, like JavaScript, TypeScript, React, Redux, React Native, Vue, NodeJS, Python, Django, Java,
              Android, Arduino, Max/MSP and Supercollider
            </CL>
            ,
          </CL>{' '}
          <CL label="stuff">
            {' '}
            - like{' '}
            <CL label="websites">
              , such as <Link to="/projects/henk/">Apartheid Revisited</Link>
            </CL>
            ,{' '}
            <CL label="apps">
              , like <Link to="/projects/henk/">Openr</Link>
            </CL>{' '}
            and{' '}
            <CL label="interactive installations">
              , like <Link to="/projects/henk/">MGNT</Link>
            </CL>{' '}
            -
          </CL>{' '}
          on his computer
        </CL>
        . You can reach me at <a href="mailto:luukschipperheyn@gmail.com">luukschipperheyn@gmail.com</a>
      </HorizontalScrollContainer>
    </Page>
  )
}

// export default LuukPage

export default () => <Page></Page>

export const query = graphql`
  query {
    luuk: file(relativePath: { eq: "assets/images/luuk.png" }) {
      childImageSharp {
        fixed(width: 28, height: 28) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
