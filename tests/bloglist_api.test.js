const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.data) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('returns blog posts in JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns the correct number of blog posts', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.data.length)
})

test('identifier property is located in "id" of blog posts', async () => {
  const res = await api.get('/api/blogs')
  for (let blog of res.body) {
    expect(blog.id).toBeDefined()
  }
})

test('saves blog post to database', async () => {
  const newBlog = {
    title: 'Example Blog',
    author: 'Foo Bar',
    url: 'https://example.com',
    likes: 3
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.data.length + 1)
  expect(finalBlogs).toContainEqual(newBlog)
})

test('defaults "likes" property to 0 if missing from request', async () => {
  const newBlog = {
    title: 'Example Blog',
    author: 'Foo Bar',
    url: 'https://example.com'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const blogs = res.body.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url,
      likes
    }
  })

  expect(blogs).toContainEqual()
})


afterAll(() => {
  mongoose.connection.close()
})