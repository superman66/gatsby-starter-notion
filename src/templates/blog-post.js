import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.posts
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          // description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h3
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
                marginTop: rhythm(0.5),
              }}
            >
              <span>{post.publish_date.startDate}</span>
              <span style={{ padding: "0 10px" }}>/</span>
              {post.tags.map(tag => (
                <span
                  style={{
                    background: "#f6f6f6",
                    padding: "2px 5px",
                    marginRight: "5px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    posts(slug: { eq: $slug }) {
      id
      title
      tags
      html
      publish_date {
        startDate(formatString: "YYYY-MM-DD")
      }
    }
  }
`
