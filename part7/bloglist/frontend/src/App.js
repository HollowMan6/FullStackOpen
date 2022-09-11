import { useState, useEffect, useRef } from 'react'

import { Blog, BlogDetails } from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}

const BlogList = ({ blogs, user, likeBlog, removeBlog }) => {
  return (
    <div id='blogs'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const byLikes = (b1, b2) => b2.likes > b1.likes ? 1 : -1

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(byLikes))
    )
  }, [])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === Number(match.params.id))
    : null

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      setUser(user)
      userService.setUser(user)
      notify(`${user.name} logged in!`)
    }).catch(() => {
      notify('wrong username/password', 'alert')
    })
  }

  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify('good bye!')
  }

  const createBlog = async (blog) => {
    blogService.create(blog).then(createdBlog => {
      notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
    }).catch(error => {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find(b => b.id === id)

    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs
        .filter(b => b.id !== id)
        .sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
      const updatedBlogs = blogs
        .map(b => b.id === id ? updatedBlog : b)
        .sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (user === null) {
    return <>
      <Notification notification={notification} />
      <LoginForm onLogin={login} />
    </>
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <Menu />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlogForm
          onCreate={createBlog}
        />
      </Togglable>

      <Routes>
        {/* <Route path="/users/:id" element={<BlogDetails
          blog={blog}
          visible={true}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          own={blog.user && user.username === blog.user.username} />} /> */}
        {/* <Route path="/users" element={<AnecdoteList anecdotes={anecdotes} />} /> */}
        <Route path="/blogs/:id" element={<BlogDetails
          blog={blog}
          visible={true}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          own={blog && blog.user && user.username === blog.user.username} />} />
        <Route path="/blogs" element={<BlogList blogs={blogs} user={user} likeBlog={likeBlog} removeBlog={removeBlog}></BlogList>} />
        <Route path="/" element={<BlogList blogs={blogs} user={user} likeBlog={likeBlog} removeBlog={removeBlog}></BlogList>} />
      </Routes>

    </div>
  )
}

export default App
