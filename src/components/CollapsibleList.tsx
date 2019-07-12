import styled from '@emotion/styled'
import * as React from 'react'
import { colors } from '../styles/variables'

const StyledUl = styled.ul`
  padding-left: 0;
`
const Label = styled.span`
  background: ${colors.pink};
  color: ${colors.black};
  cursor: pointer;
`
type Props = {
  className?: string
  label: string
  initiallyOpen?: boolean
}

const CollapsibleList: React.FunctionComponent<Props> = ({ className, label, children, initiallyOpen = false }) => {
  const [open, setOpen] = React.useState(initiallyOpen)

  return (
    <StyledUl className={className}>
      <Label onClick={() => setOpen(!open)}>{label}</Label>
      {open && children}
    </StyledUl>
  )
}

export default CollapsibleList
