import * as React from 'react'
import Container from '../components/Container'
import Page from '../components/Page'
import { Link } from 'gatsby'
import css from '@emotion/css'
import CollapsibleList from '../components/CollapsibleList'
import List from '../components/List'
import styled from '@emotion/styled'
import { colors } from '../styles/variables'

const StyledLi = styled.li`
  color: ${colors.blue};
`

const IndexPage = () => (
  <Page>
    <Container>
      <div>
        <h1>Hi, I'm Luuk</h1>
      </div>
      <div>
        <h3
          css={css`
            margin: 16px 0 32px;
          `}
        >
          I make stuff on the computer
        </h3>
      </div>
      <p>
        It usually involves programming; like <Link to="/">websites</Link> and <Link to="/">apps</Link>. Sometimes it's also tinkering and
        soldering; for <Link to="/">interactive installations</Link>.
      </p>
      <p>
        My work style is characterized by experimentation. Using code as a sketching tool, I develop concepts parallel to their technical
        implementation. I like to technology in a new and unconventional way. godver wat haat ik schrijven!
      </p>
      <CollapsibleList label="Some technologies I work with" initiallyOpen={true}>
        <List>
          <StyledLi>JavaScript</StyledLi>
          <StyledLi>TypeScript</StyledLi>
          <StyledLi>React</StyledLi>
          <StyledLi>Redux</StyledLi>
          <StyledLi>Python</StyledLi>
          <StyledLi>Django</StyledLi>
        </List>
      </CollapsibleList>
    </Container>
  </Page>
)

export default IndexPage
