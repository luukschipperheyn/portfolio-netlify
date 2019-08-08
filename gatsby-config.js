'use strict'

module.exports = {
  siteMetadata: {
    title: 'luuk.computer',
    description: 'Portfolio website of Luuk Schipperheyn. Freelance full-stack creative developer.',
    keywords:
      'freelance full-stack creative developer full stack javascript react native android python django vue supercollider max/msp processing creative coding interactive installation',
    siteUrl: 'https://www.luuk.computer/',
    author: {
      name: 'Luuk Schipperheyn',
      url: 'https://luuk.computer/',
      email: 'luukschipperheyn@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/assets/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    `gatsby-plugin-layout`,
    'gatsby-transformer-json',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
