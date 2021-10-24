/* eslint-disable no-unused-vars */
const _ = require('lodash')

const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]
const listWithNoLikes = [
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  }
]
const listWithSixBlogs = [
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const listWithTwoFavorites = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    __v: 0
  }
]
const listWithTwoFavoriteAuthors = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 17,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
]

/* 1 */
// const mostBlogs = blogs => {
//   if (blogs.length === 0) { return null }
//   console.log('blogs', blogs)

//   const authorCount = _.countBy(blogs, 'author')
//   console.log('authorCount', authorCount)

//   const mappedAuthorCount = _.map(authorCount, (numBlogs, authorName) => ({
//     author: authorName,
//     blogs: numBlogs,
//   }))
//   console.log('mappedAuthorCount', mappedAuthorCount)

//   const sortedAuthorCount = _.sortBy(mappedAuthorCount, 'blogs')
//   console.log('sortedAuthorCount', sortedAuthorCount)

//   const result = sortedAuthorCount[sortedAuthorCount.length - 1]
//   console.log(result)

//   return result
// }

// mostBlogs(listWithSixBlogs)

/* 2 */
// const mostLikes = blogs => {
//   if (blogs.length === 0) { return null }

//   const likesByBlog = _.map(blogs, blog => {
//     return {
//       author: blog.author,
//       likes: blog.likes
//     }
//   })
//   console.log(likesByBlog)

//   const likesByAuthor = _.groupBy(likesByBlog, 'author')
//   console.log(likesByAuthor)

//   const sumLikesByAuthor = _.map(likesByAuthor, (likesArray, authorName) => {
//     return {
//       author: authorName,
//       likes: likesArray.reduce((sumLikes, nextBlog) => sumLikes + nextBlog.likes, 0)
//     }
//   })
//   console.log(sumLikesByAuthor)

//   const sortedLikesByAuthor = _.sortBy(sumLikesByAuthor, ['likes', 'author'])
//   console.log(sortedLikesByAuthor)

//   return sortedLikesByAuthor[sortedLikesByAuthor.length - 1]
// }

// mostLikes(listWithSixBlogs)

const obj = {
  a: 1,
  b: 2,
  c: 3,
}

console.log({ ...obj, a: 0 })
console.log({ a: 0, ...obj })