import * as React from 'react'
import styled from '@emotion/styled'

import { dimensions } from '../styles/variables'
import { colors } from '../styles/colors'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${dimensions.containerPadding}rem;
  margin-bottom: 3rem;

  a {
    background: ${colors.lightBlue};
    color: ${colors.black};
  }
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps> = ({ children, className }) => <StyledPage className={className}>{children}</StyledPage>

export default Page
