import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import { FunctionComponent } from 'react'
import CollapsibleList from '../components/CollapsibleList'
import Page from '../components/Page'
import { uiColors } from '../styles/variables'

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
  padding-left:1.3rem;
  bottom: -0.5rem;
  :before {
    position: absolute;
    bottom: 0.5rem;
    left:0;
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

const Menu: FunctionComponent<MenuProps> = ({ onClickLink, data, ...props }) => {
  const StyledLink = (props: any) => (
    <Link
      activeStyle={{
        background: uiColors.active.background,
        color: uiColors.active.text
      }}
      css={css`
        background: ${uiColors.internalLink.background};
        color: ${uiColors.internalLink.text};
      `}
      onClick={onClickLink}
      {...props}
    />
  )
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
      render={data => {
        return (
          <Page {...props}>
            {/* <div><StyledImg fixed={data.luuk.childImageSharp.fixed} /></div> */}
            <Section>
              This is the portfolio of Luuk Schipperheijn, a creative developer.
            </Section>
            <Section>
              <CollapsibleList label="work">
                <StyledUl>
                  <StyledLi><StyledLink to="/projects/internew/">the internew</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/apartheid-revisited/">apartheid revisited</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/seev/">seev</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/goudenkoets/">goudenkoets.nl</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/modular-covert-camera/">modular covert camera</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/nike-manifesto-wall/">nike manifesto wall</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/touch-me-please/">touch me please</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/mgnt/">mgnt</StyledLink></StyledLi>
                  <StyledLi><StyledLink to="/projects/openr/">openr</StyledLink></StyledLi>
                </StyledUl>
              </CollapsibleList>
            </Section>
            <Section>
              <StyledLink to="/about">about</StyledLink>
            </Section>

          </Page>
        )
      }}
    />
  )
}

export default Menu
