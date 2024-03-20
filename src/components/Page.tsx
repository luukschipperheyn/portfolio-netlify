import * as React from 'react'
import styled from '@emotion/styled'

import { dimensions } from '../styles/variables'
import { colors } from '../styles/colors'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${dimensions.containerPadding.v}rem ${dimensions.containerPadding.h}rem 2rem};
  max-width: 100%;
  // border-right: 1px solid ${colors.grey};
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps & React.PropsWithChildren> = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query IndexLayoutQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <StyledPage className={className}>
      <Helmet
        title={data.site.siteMetadata.title}
        htmlAttributes={{
          lang: 'en'
        }}
      >
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color={colors.lightBlue} />
        <meta name="msapplication-TileColor" content={colors.pink} />
        <meta name="theme-color" content={colors.pink}></meta>
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="keywords" content={data.site.siteMetadata.keywords} />
      </Helmet>

      {children}
    </StyledPage>
  )
}

export default Page
