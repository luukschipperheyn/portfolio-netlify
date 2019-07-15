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
const StyledImg = styled(Img)`
  position: relative;
  top: 0.25rem;
`

type LuukPageProps = {
  data: any
}

const LuukPage: FunctionComponent<LuukPageProps> = ({ data }) => {
  return <Page />
}

export default LuukPage

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
