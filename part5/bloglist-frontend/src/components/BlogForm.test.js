
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByPlaceholderText('write here blog title')
    const author = screen.getByPlaceholderText('write here blog author')
    const url = screen.getByPlaceholderText('write here blog url')
    const sendButton = screen.getByText('create')

    const user = userEvent.setup()
    await user.type(title, 'Hi There')
    await user.type(author, 'Sl. J.')
    await user.type(url, 'http://localhost:3000/')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Hi There')
    expect(createBlog.mock.calls[0][0].author).toBe('Sl. J.')
    expect(createBlog.mock.calls[0][0].url).toBe('http://localhost:3000/')
})
