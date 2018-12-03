module.exports = {
  siteMetadata: {
    title: "Christopher Hernandez"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "chrishernandez.io",
        short_name: "chrishernandez",
        start_url: "/",
        background_color: "#222",
        theme_color: "#937341",
        display: "minimal-ui",
        icon: "src/images/icon.png"
      }
    },
    "gatsby-plugin-offline"
  ]
};
