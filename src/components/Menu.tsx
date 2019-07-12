import styled from '@emotion/styled'
import { Link, StaticQuery, graphql } from 'gatsby'
import * as React from 'react'
import { colors, breakpoints } from '../styles/variables'
import CollapsibleList from './CollapsibleList'
import Container from './Container'
import { ClassNames, css } from '@emotion/core'
import List from './List'

const StyledMenu = styled.aside`
  padding: 16px;
  background-color: ${colors.darkerGrey};
  color: ${colors.white};
`

const MenuInner = (props: any) => (
  <Container
    css={css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;
      @media screen and (max-width: ${breakpoints.md}px) {
        display: ${props.open ? 'flex' : 'none'};
      }
    `}
    {...props}
  />
)

const MenuToggle = styled.span`
  display: none;
  background: ${colors.white};
  color: ${colors.black};
  @media screen and (max-width: ${breakpoints.md}px) {
    display: inline-block;
  }
`

const StyledLi = styled.li``

const MenuLink = (props: any) => (
  <ClassNames>
    {({ css, cx }) => (
      <Link
        activeClassName={css`
          background: ${colors.green};
          color: ${colors.black};
        `}
        {...props}
      />
    )}
  </ClassNames>
)
type Props = {
  className?: string
}

interface StaticQueryProps {
  allProjectsJson: {
    edges: [
      {
        node: {
          title: string
          fields: {
            slug: string
          }
        }
      }
    ]
  }
}

const Menu: React.FunctionComponent<Props> = ({ className }) => (
  <StaticQuery
    query={graphql`
      {
        allProjectsJson {
          edges {
            node {
              title
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => {
      const [open, setOpen] = React.useState(false)
      return (
        <StyledMenu className={className}>
          <MenuToggle onClick={() => setOpen(!open)}>{open ? 'close' : 'menu'}</MenuToggle>
          <MenuInner open={open}>
            <CollapsibleList label="work" initiallyOpen={true}>
              <List>
                {data.allProjectsJson.edges.map((edge, i) => (
                  <StyledLi key={`menu-project-${i}`}>
                    <MenuLink to={edge.node.fields.slug}>{edge.node.title}</MenuLink>
                  </StyledLi>
                ))}
              </List>
            </CollapsibleList>
            <MenuLink to="/">about</MenuLink>
            <MenuLink to="/luuk/">luuk</MenuLink>
          </MenuInner>
        </StyledMenu>
      )
    }}
  />
)

export default Menu
