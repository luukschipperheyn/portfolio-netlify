import * as React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import normalize from '../styles/normalize'
import { colors, breakpoints } from '../styles/variables'

const StyledLayoutRoot = styled.div`
  min-height: 100vh;
  background: ${colors.darkGrey};
  color: ${colors.white};
  display: flex;
  flex-direction: row;

  h3 {
    background: none;
    color: ${colors.white};
  }

  @media screen and (max-width: ${breakpoints.md}px) {
    display: block;
  }
`

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => (
  <>
    <Global styles={() => css(normalize)} />
    <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
  </>
)

export default LayoutRoot
