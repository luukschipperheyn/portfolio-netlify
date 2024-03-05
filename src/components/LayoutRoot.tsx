import * as React from 'react'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import normalize from '../styles/normalize'
import { colors, uiColors } from '../styles/variables'

const StyledLayoutRoot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${uiColors.background};
  color: ${colors.white};
  overflow: hidden;
  h3 {
    background: none;
    color: ${colors.white};
  }
  strong {
    background: ${colors.lightGrey};
    color: ${colors.darkGrey};
  }
`

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps & React.PropsWithChildren> = ({ children, className }) => (
  <>
    <Global styles={() => css(normalize)} />
    <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
  </>
)

export default LayoutRoot
