//const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
  if (blogs)
    return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) {
    return 0
  }

  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) {
    return {}
  }
  return blogs.reduce((favorite_blog, blog) => {
    if (blog.likes > favorite_blog.likes) {
      blog
    }
    else {
      favorite_blog
    }
  })
}

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) {
    return {}
  }
  const groupBlogs = _.groupBy(blogs, (blog) => blog.author)
  const blogAuthors = _.mapValues(groupBlogs, (e) => e.length)
  const mostBlog = Object.entries(blogAuthors).reduce((a, b) => a[1] > b[1] ? a : b)
  return { 'author': mostBlog[0], 'blogs': mostBlog[1] }
}

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) {
    return {}
  }
  const groupBlogs = _.groupBy(blogs, (blog) => blog.author)
  const blogLikes = _.mapValues(groupBlogs, totalLikes)
  const mostLikes = Object.entries(blogLikes).reduce((a, b) => a[1] > b[1] ? a : b)
  return { 'author': mostLikes[0], 'likes': mostLikes[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}