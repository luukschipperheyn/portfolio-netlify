import * as React from 'react'
import styled from '@emotion/styled'

import { dimensions } from '../styles/variables'
import { colors } from '../styles/colors'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${dimensions.containerPadding.v}rem ${dimensions.containerPadding.h}rem ;
  max-width: 100%;
  // border-right: 1px solid ${colors.grey};
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps & React.PropsWithChildren> = ({ children, className }) => <StyledPage className={className}>{children}</StyledPage>

export default Page
