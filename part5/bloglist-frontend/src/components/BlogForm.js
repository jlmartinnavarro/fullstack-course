import React from 'react'

const blogForm = (handleAddBlog, title, setTitle, author, setAuthor, url, setUrl) => (
  <div>
    <form onSubmit={handleAddBlog}>
      <div>
        title: <input
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: <input
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Add</button>
    </form>
  </div>
)

export default blogForm