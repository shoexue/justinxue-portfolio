import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import {
  Layout,
  Hero,
  About,
  Jobs,
  Featured,
  Projects,
  Contact,
  Education,
  Library,
} from '@components';
import styled from 'styled-components';
import { Main } from '@styles';

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

const IndexPage = ({ location, data }) => {
  // Extract the library title from the fetched data
  const libraryTitle = data.libraryTitle.edges[0].node.frontmatter.title;

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero data={data.hero.edges} />
        <About data={data.about.edges} technologiesData={data.technologies.edges} />
        <Jobs data={data.jobs.edges} />
        <Education data={data.education.edges} />
        <Featured data={data.featured.edges} />
        <Projects data={data.projects.edges} />
        {/* <Library title={libraryTitle} images={data.libraryImages.edges} /> */}
        <Contact data={data.contact.edges} />
      </StyledMainContainer>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            title
            name
            subtitle
          }
          html
        }
      }
    }
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            avatar {
              childImageSharp {
                fluid(maxWidth: 3000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          html
        }
      }
    }
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/jobs/[^/]+/index\\.md$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            location
            range
          }
          fields {
            blog {
              content
            }
          }
          html
        }
      }
    }
    featured: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/featured/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 700, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            tech
            github
            external
          }
          html
        }
      }
    }

    projects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { showInProjects: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tech
            github
            external
          }
          html
        }
      }
    }
    contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          frontmatter {
            title
            buttonText
          }
          html
        }
      }
    }
    technologies: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/technologies/" } }) {
      edges {
        node {
          frontmatter {
            title
            technologies
          }
          html
        }
      }
    }
    education: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/education/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            school
            location
            range
          }
          html
        }
      }
    }
    libraryTitle: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/books/index.md/" } }) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
    libraryImages: allFile(
      filter: { relativeDirectory: { eq: "books" }, extension: { regex: "/(jpg|jpeg|png)/" } }
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          childImageSharp {
            original {
              src
            }
          }
          publicURL
        }
      }
    }
  }
`;
