import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import * as React from 'react'
import { uiColors, colors } from '../styles/variables'

const StyledUl = styled.ul`
  padding-left: 0;
  position: relative;
`

type LabelProps = {
  open: boolean
}
const Label = styled.span`
  background: ${(props: LabelProps) => (props.open ? uiColors.collapsible.background : uiColors.expandable.background)};
  color: ${(props: LabelProps) => (props.open ? uiColors.collapsible.text : uiColors.expandable.text)};
  cursor: pointer;
`
const bounce = keyframes`
  from, 11%, 13%, 15%, 17%, 19%, 21%, to {
    transform: translate3d(0,0,0);
  }
  12%, 16%, 20% {
    transform: translate3d(0, -10px, 0);
  }
  3%, 25% {
    opacity: 1;
  }
  from, 27%, to {
    opacity: 0;
  }
`

const Hint = styled.div`
  position: absolute;
  bottom: -1rem;
  left: 50%;
  animation: ${bounce} 10s ease infinite;
  pointer-events: none;
  z-index: 1;
  ::after {
    content: 'unfold';
    text-align: center;
    font-size: 11px;
    position: absolute;
    display: block;
    padding: 4px;
    word-break: initial;
    padding: 2px 4px;
    background: ${colors.lightGrey};
    color: ${colors.black};
    transform: translateX(-50%);
  }
  ::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: ${colors.lightGrey};
    position: absolute;
    left: calc(50% - 5px);
    top: -5px;
    transform: rotate(45deg);
  }
`

type Props = {
  className?: string
  label: string
  initiallyOpen?: boolean
  showHint?: boolean
  absolute?: boolean
  onOpen?: () => void
}

const CollapsibleList: React.FunctionComponent<Props & React.PropsWithChildren> = ({
  className,
  label,
  children,
  initiallyOpen = false,
  showHint = false,
  absolute = false,
  onOpen
}) => {
  const [open, setOpen] = React.useState(false)
  const [hasBeenOpened, setHasBeenOpened] = React.useState(false)
  return (
    <StyledUl className={className}>
      <Label
        open={open}
        onClick={() => {
          setOpen(!open)
          onOpen && onOpen()
          setHasBeenOpened(true)
        }}
      >
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
      {!hasBeenOpened && showHint && <Hint />}
    </StyledUl>
  )
}

export default CollapsibleList
