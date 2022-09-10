import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikeTo, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDeleteButton = { display: blog.user?.username === user?.username ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      </div>
      <div  className='fullblog' style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes}
        <button onClick={addLikeTo}>like</button> <br />
        {blog.user?.username} <br />
        <button onClick={deleteBlog} style={showDeleteButton}>remove</button>
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikeTo: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object
}

export default Blog