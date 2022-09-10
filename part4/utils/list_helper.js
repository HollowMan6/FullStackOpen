const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length !== 0) {
        const mostLikes = blogs.reduce((most, blog) => {
            return most.likes > blog.likes ? most : blog
        })

        return {
            title: mostLikes.title,
            author: mostLikes.author,
            likes: mostLikes.likes
        }
    } else {
        return null
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length !== 0) {
        const authors = blogs.map(blog => blog.author)
        const uniqueAuthors = [...new Set(authors)]
        
        const authorBlogs = uniqueAuthors.map(author => {
            return {
                author: author,
                blogs: blogs.filter(blog => blog.author === author).length,
            }
        })

        const mostBlogs = authorBlogs.reduce((most, author) => {
            return most.blogs > author.blogs ? most : author
        })

        return {
            author: mostBlogs.author,
            blogs: mostBlogs.blogs
        }
    } else {
        return null
    }
}

const mostLikes = (blogs) => {
    if (blogs.length !== 0) {
        const authors = blogs.map(blog => blog.author)
        const uniqueAuthors = [...new Set(authors)]

        const authorLikes = uniqueAuthors.map(author => {
            return {
                author: author,
                likes: blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0),
            }
        })

        const mostLikes = authorLikes.reduce((most, author) => {
            return most.likes > author.likes ? most : author
        })

        return {
            author: mostLikes.author,
            likes: mostLikes.likes
        }
    } else {
        return null
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
