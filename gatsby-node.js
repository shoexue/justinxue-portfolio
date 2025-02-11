/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

// Add schema customization
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MarkdownRemark implements Node {
      fields: Fields
    }
    type Fields {
      blog: Blog
    }
    type Blog {
      content: String
    }
    type Site {
      siteMetadata: SiteMetadata!
    }
    type SiteMetadata {
      title: String!
      description: String!
      author: String!
    }
  `;

  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  
  // Check if it's a job markdown file (but not a blog post)
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.fileAbsolutePath.includes('/jobs/') &&
    node.fileAbsolutePath.endsWith('/index.md') &&
    !node.fileAbsolutePath.includes('/blog/')
  ) {
    // Try to find a blog directory
    const jobPath = node.fileAbsolutePath.replace('/index.md', '');
    const fs = require('fs');
    const blogPath = path.join(jobPath, 'blog');
    
    if (fs.existsSync(blogPath)) {
      const blogIndexPath = path.join(blogPath, 'index.md');
      if (fs.existsSync(blogIndexPath)) {
        const blogContent = fs.readFileSync(blogIndexPath, 'utf8');
        createNodeField({
          node,
          name: 'blog',
          value: {
            content: blogContent,
          },
        });
      }
    }
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create post detail pages
  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: postTemplate,
      context: {},
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@fonts': path.resolve(__dirname, 'src/styles/fonts'),
      },
    },
  });
};
