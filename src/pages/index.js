import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allPosts.edges
    console.log(posts)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Notion Gatsby Blog" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.title || node.fields.slug
          return (
            <article key={node.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.create_time}</small>
              </header>
              <section style={{ fontSize: "14px" }}>
                <span>{node.publish_date.startDate}</span>
                <span style={{ padding: "0 10px" }}>/</span>
                {node.tags.map(tag => (
                  <span
                    style={{
                      background: "#f6f6f6",
                      padding: "2px 5px",
                      marginRight: "5px",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </section>
              <section>
                {node.description && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.description,
                    }}
                  />
                )}
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allPosts(
      filter: { status: { eq: "publish" } }
      sort: { fields: publish_date___startDate, order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          tags
          title
          slug
          publish_date {
            startDate(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`
