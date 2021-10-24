const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sumLikes, next) => sumLikes + next.likes, 0)
}

const _readableFormat = blog => {
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const favoriteBlog = blogs => {
  return blogs.length === 0
    ? null
    : blogs.reduce((favorite, next) => {
      return next.likes > favorite.likes
        ? _readableFormat(next)
        : favorite
    }, _readableFormat(blogs[0]))
}

const mostBlogs = blogs => {
  if (blogs.length === 0) { return null }

  const authorCount = _.countBy(blogs, 'author')
  const mappedAuthorCount = _.map(authorCount, (numBlogs, authorName) => ({
    author: authorName,
    blogs: numBlogs,
  }))
  const sortedAuthorCount = _.sortBy(mappedAuthorCount, ['blogs', 'author'])

  return sortedAuthorCount[sortedAuthorCount.length - 1]
}

const mostLikes = blogs => {
  if (blogs.length === 0) { return null }

  const likesByBlog = _.map(blogs, blog => {
    return {
      author: blog.author,
      likes: blog.likes
    }
  })
  const likesByAuthor = _.groupBy(likesByBlog, 'author')
  const sumLikesByAuthor = _.map(likesByAuthor, (likesArray, authorName) => {
    return {
      author: authorName,
      likes: likesArray.reduce((sumLikes, nextBlog) => sumLikes + nextBlog.likes, 0)
    }
  })
  const sortedLikesByAuthor = _.sortBy(sumLikesByAuthor, ['likes', 'author'])

  return sortedLikesByAuthor[sortedLikesByAuthor.length - 1]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}