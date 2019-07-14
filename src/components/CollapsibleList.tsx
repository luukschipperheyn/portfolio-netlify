import styled from '@emotion/styled'
import * as React from 'react'
import { colors, uiColors } from '../styles/variables'
import css from '@emotion/css'

const StyledUl = styled.ul`
  padding-left: 0;
  position: relative;
`
const Label = (props: any) => (
  <span
    css={css`
      background: ${props.open ? uiColors.collapsible.background : uiColors.expandable.background};
      color: ${props.open ? uiColors.collapsible.text : uiColors.expandable.text};
      cursor: pointer;
    `}
    {...props}
  />
)

type Props = {
  className?: string
  label: string
  initiallyOpen?: boolean
  hint?: boolean
  abslute?: boolean
}

const CollapsibleList: React.FunctionComponent<Props> = ({
  className,
  label,
  children,
  initiallyOpen = false,
  hint = false,
  absolute = false
}) => {
  const [open, setOpen] = React.useState(initiallyOpen)

  return (
    <StyledUl className={className}>
      <Label open={open} onClick={() => setOpen(!open)}>
        {label}
      </Label>
      <span
        css={css`
          display: ${open ? 'inline' : 'none'};
          ${absolute &&
            `
          position: absolute;
          top: 1rem;
          left: 0;
          height: auto;
          width: auto;`}
        `}
      >
        {children}
      </span>
    </StyledUl>
  )
}

export default CollapsibleList
