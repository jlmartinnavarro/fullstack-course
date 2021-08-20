import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'
import './App.css'



const App = () => {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const blogRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes-a.likes)
      setBlogs( blogs )
    }
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        text: `Welcome ${user.name}!`,
        type: 'success'
      })
    } catch (exception) {
      setMessage({
        text: 'wrong credentials',
        type: 'error'
      })
    }
  }
  const loginForm = () => (
    <Toggle buttonLabel="Login">
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}/>
    </Toggle>
  )
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setMessage({
      text: 'Logout was succesful',
      type: 'success'
    })
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      blogRef.current.toggleVisibility()
      const response = await blogService.create({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({
        text: `a new blog ${title} by ${author} added`,
        type: 'success'
      })
    } catch (exception) {
      setMessage({
        text: `a new blog ${title} by ${author} not added`,
        type: 'error'
      })
    }
  }


  const userInfo = () => (
    <div>
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  )
  const blogForm = () => (
    <Toggle buttonLabel="New blog" ref={blogRef}>
      <BlogForm
        handleAddBlog={handleAddBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl} />
    </Toggle>
  )
  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ):(
        <div>
          <h2>Blogs</h2>
          {userInfo()}
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App