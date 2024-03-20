import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import React, { FunctionComponent, PropsWithChildren, useState } from 'react'
import CollapsibleList from '../components/CollapsibleList'
import Page from '../components/Page'
import { uiColors } from '../styles/variables'

import { useLocation } from '@reach/router'

const StyledImg = styled(Img)`
  position: relative;
  top: 0.25rem;
  margin-top: -12px;
`

type MenuProps = {
  data: any
  onClickLink: () => void
}

const StyledLi = styled.li`
  position: relative;
  padding-left: 1.3rem;
  bottom: -0.5rem;
  :before {
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1px;
    margin-right: 5px;
    border-bottom: 1px solid white;
  }
`
const StyledUl = styled.ul`
  margin-left: 0.5rem;
  border-left: 1px solid white;
  padding: 0;
  margin-bottom: 0.5rem;
`

const Section = styled.div`
  margin-bottom: 1rem;
`

const FilterContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
  border-left: 1px solid white;
`

const typeColors = {
  web: {
    background: '#009427',
    hover: '#69ff91',
    text: '#ffffff'
  },
  app: {
    background: '#335577',
    hover: '#3a8cdf',
    text: '#ffffff'
  },
  installation: {
    background: '#993366',
    hover: '#ff379b',
    text: '#ffffff'
  },
  product: {
    background: '#997722',
    hover: '#ffcd4f',
    text: '#ffffff'
  }
}

const TypeLabel = styled.div<{ type: keyof typeof typeColors; selected?: boolean }>`
  display: inline-block;
  background: ${(props) => (props.selected ? typeColors[props.type].hover : typeColors[props.type].background)};
  color: ${(props) => typeColors[props.type].text};
  font-size: 0.5rem;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? typeColors[props.type].background : 'transparent')};
  &:hover {
    background: ${(props) => typeColors[props.type].hover};
  }
`

const Menu: FunctionComponent<MenuProps> = ({ onClickLink, data, ...props }) => {
  const location = useLocation()
  const [selectedType, setSelectedType] = useState<null | keyof typeof typeColors>(null)
  const [hoveredType, setHoveredType] = useState<null | keyof typeof typeColors>(null)

  const typeClicked = (type: keyof typeof typeColors) => {
    setSelectedType((selectedType) => {
      if (selectedType === type) {
        return null
      }
      return type
    })
  }

  const StyledLink = (props: any) => (
    <Link
      activeStyle={{
        background: uiColors.active.background,
        color: uiColors.active.text
      }}
      css={css`
        background: ${uiColors.internalLink.background};
        color: ${uiColors.internalLink.text};
        margin-right: 0.3rem;
      `}
      onClick={onClickLink}
      {...props}
    />
  )

  const TypeItem: React.FC<PropsWithChildren & { type: keyof typeof typeColors }> = ({ type, children, ...props }) => {
    const StyledDot = styled.div`
      box-sizing: content-box;
      width: 4px;
      height: 4px;
      display: inline-block;
      border: 2px solid ${typeColors[type].background};
      position: relative;
      bottom: 2px;
      background: ${selectedType === type || hoveredType === type ? typeColors[type].hover : typeColors[type].background};
      color: ${typeColors[type].text};
      cursor: pointer;
      &:hover {
        background: ${typeColors[type].hover};
      }
    `
    if (selectedType === null || selectedType === type) {
      return (
        <StyledLi {...props}>
          {children}
          <StyledDot
            title={type}
            onClick={() => typeClicked(type)}
            onMouseOver={() => setHoveredType(type)}
            onMouseOut={() => setHoveredType(null)}
          />
        </StyledLi>
      )
    }
    return null
  }
  const TypeButton: React.FC<{ type: keyof typeof typeColors }> = ({ type }) => {
    return (
      <TypeLabel
        selected={type === selectedType}
        type={type}
        onClick={() => typeClicked(type)}
        onMouseOver={() => setHoveredType(type)}
        onMouseOut={() => setHoveredType(null)}
      >
        {type}
      </TypeLabel>
    )
  }
  return (
    <StaticQuery
      query={graphql`
        query {
          luuk: file(relativePath: { eq: "assets/images/luuk.png" }) {
            childImageSharp {
              fixed(width: 28, height: 28) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={(data) => {
        return (
          <Page {...props}>
            {/* <div><StyledImg fixed={data.luuk.childImageSharp.fixed} /></div> */}
            <Section className="collide">
              This is the portfolio of Luuk Schipperheijn,<br></br>a creative developer.
            </Section>
            <Section className="collide">
              <CollapsibleList label="work" initiallyOpen={location.pathname === '/' ? false : true}>
                <FilterContainer>
                  <TypeButton type="web" />
                  <TypeButton type="installation" />
                  <TypeButton type="app" />
                  <TypeButton type="product" />
                </FilterContainer>
                <StyledUl>
                  <TypeItem type="web">
                    <StyledLink to="/projects/apartheid-revisited/">apartheid revisited</StyledLink>
                  </TypeItem>
                  <TypeItem type="web">
                    <StyledLink to="/projects/li-ma/">li-ma</StyledLink>
                  </TypeItem>
                  <TypeItem type="app">
                    <StyledLink to="/projects/seev/">seev</StyledLink>
                  </TypeItem>
                  <TypeItem type="installation">
                    <StyledLink to="/projects/touch-me-please/">touch me please</StyledLink>
                  </TypeItem>
                  <TypeItem type="installation">
                    <StyledLink to="/projects/imu/">i m u</StyledLink>
                  </TypeItem>
                  <TypeItem type="installation">
                    <StyledLink to="/projects/internew/">the internew</StyledLink>
                  </TypeItem>
                  <TypeItem type="web">
                    <StyledLink to="/projects/goudenkoets/">goudenkoets.nl</StyledLink>
                  </TypeItem>
                  <TypeItem type="installation">
                    <StyledLink to="/projects/nike-manifesto-wall/">nike manifesto wall</StyledLink>
                  </TypeItem>
                  <TypeItem type="product">
                    <StyledLink to="/projects/modular-covert-camera/">modular covert camera</StyledLink>
                  </TypeItem>
                  <TypeItem type="installation">
                    <StyledLink to="/projects/mgnt/">mgnt</StyledLink>
                  </TypeItem>
                  <TypeItem type="app">
                    <StyledLink to="/projects/openr/">openr</StyledLink>
                  </TypeItem>
                </StyledUl>
              </CollapsibleList>
            </Section>
            <Section className="collide">
              <StyledLink to="/about">about</StyledLink>
            </Section>
          </Page>
        )
      }}
    />
  )
}

export default Menu
