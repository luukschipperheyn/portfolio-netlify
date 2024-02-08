/* eslint-disable max-len */

export const colors = {
  black: '#000000',
  darkerGrey: '#122',
  darkGrey: '#21252b',
  grey: '#5a5a5a',
  lightGrey: '#eee',
  white: '#ffffff',
  red: '#f44747',
  darkYellow: '#b8b500',
  yellow: '#e2c08d',
  darkGreen: '#004040',
  green: '#4d9e4d',
  turqoise: '#4EC9B0',
  darkBlue: '#000080',
  blue: '#0097fb',
  lightBlue: '#9CDCFE',
  purple: '#6c6cc4',
  pink: '#b267e6',
  brand: '#663399',
  lilac: '#9d7cbf',
  accent: '#ffb238',
  success: '#37b635',
  warning: '#ec1818',
  ui: {
    bright: '#e0d6eb',
    light: '#f5f3f7',
    whisper: '#fbfafc'
  },
  code: '#fcf6f0',
  gray: {
    dark: 'hsla(270, 17.119554496%, 0%, 0.92)',
    copy: 'hsla(270, 15.797828016000002%, 0%, 0.88)',
    calm: 'rgba(0, 0, 0, 0.54)'
  }
}

export const uiColors = {
  active: { background: colors.pink, text: colors.black },
  internalLink: { background: colors.black, text: colors.pink },
  link: { background: colors.black, text: colors.turqoise },
  hoveredLink: { background: colors.black, text: colors.white },
  collapsible: { background: colors.lightBlue, text: colors.black },
  expandable: { background: colors.black, text: colors.lightBlue }
}

export const fonts = {
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  monospace: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace'
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const widths = {
  md: 720,
  lg: 960,
  xl: 1140
}

export const dimensions = {
  fontSize: {
    regular: 16,
    large: 18
  },
  headingSizes: {
    h1: 2.441,
    h2: 1.953,
    h3: 1.563,
    h4: 1.25
  },
  lineHeight: {
    regular: 1.45,
    heading: 1.2
  },
  containerPadding: {
    v: 10,
    h: 1.5
  }
}

export const heights = {
  header: 60
}
