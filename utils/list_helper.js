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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}