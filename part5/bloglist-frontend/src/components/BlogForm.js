import React from 'react'

const blogForm = (handleAddBlog, title, setTitle, author, setAuthor, url, setUrl, likes, setLikes) => (
  <div>
    <form onSubmit={handleAddBlog}>
      <div>
        Title: <input
          id="title"
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author: <input
          id="author"
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url: <input
          id="url"
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        Likes: <input
          id="likes"
          value={likes}
          name='likes'
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button type='submit'>Add</button>
    </form>
  </div>
)

export default blogForm