import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: "Hi There",
    url: "http://localhost:3000/",
    author: "Sl. J.",
    likes: 2,
    user: {
        username: "root",
    }
}

test('default only renders title and author', () => {
    const { container } = render(<Blog blog={blog} />)

    const div1 = container.querySelector('.blog')
    const div2 = container.querySelector('.fullblog')

    expect(div1.style.display).toEqual('')
    expect(div2.style.display).toEqual('none')
})

test('full info when click view', async () => {
    const { container } = render(
        <Blog blog={blog} user={{username: "root"}}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div1 = container.querySelector('.blog')
    const div2 = container.querySelector('.fullblog')

    expect(div1.style.display).toEqual('')
    expect(div2.style.display).toEqual('')
})

test('clicking the button calls event handler twice', async () => {
    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} addLikeTo={mockHandler} user={{username: "root"}}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)

    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
