const listHelper = require('../utils/list_helper')

// Test data
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
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
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

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('of empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('of 1 blog list is equal to the likes of that blog', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
  })
  test('of list with no likes is 0', () => {
    expect(listHelper.totalLikes(listWithNoLikes)).toBe(0)
  })
  test('of 6 blog list is equal to the sum of the likes of all 6 blogs', () => {
    expect(listHelper.totalLikes(listWithSixBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })
  /* toStrictEqual is necessary for avoiding the 'serializes to the same string
   * error.
   */
  test('of 1 blog list is the single containing blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toStrictEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    })
  })
  test('of 6 blog list is the blog with the most likes', () => {
    expect(listHelper.favoriteBlog(listWithSixBlogs)).toStrictEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
  test('of list with many favorites is the first blog with the most likes', () => {
    expect(listHelper.favoriteBlog(listWithTwoFavorites)).toStrictEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    })
  })
})