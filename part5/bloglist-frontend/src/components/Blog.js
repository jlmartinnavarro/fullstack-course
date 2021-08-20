import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = { display: visible ? '' : 'none' }
  const toggleNonVisible = { display: visible ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} - {blog.author}
        <div style={toggleNonVisible}>
          <button onClick={() => setVisible(!visible)}>View</button>
        </div>
        <div className='info' style={toggleVisible}>
          <a href={blog.url}>{blog.url}</a>
          <br />
          {blog.likes} likes
          <button onClick={() => updateHandler(blog)}>Like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={() => deleteHandler(blog)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
  }),
}
export default Blog