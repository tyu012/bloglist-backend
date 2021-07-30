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

describe('retrieving blog posts', () => {
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
})

describe('saving posts to database', () => {
  test('saves blog post to database', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'Foo Bar',
      url: 'https://example.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()

    expect(finalBlogs)
      .toHaveLength(helper.data.length + 1)
    expect(finalBlogs.map(helper.removeExtraneousProperties))
      .toContainEqual(newBlog)
  })

  test('defaults "likes" property to 0 if missing from request', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'Foo Bar',
      url: 'https://example.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()

    expect(finalBlogs)
      .toHaveLength(helper.data.length + 1)
    expect(finalBlogs.map(helper.removeExtraneousProperties))
      .toContainEqual({ ...newBlog, likes: 0 })
  })

  test('responds with 400 if title is not in request', async () => {
    const newBlog = {
      author: 'Foo Bar',
      url: 'https://example.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('responds with 400 if url is not in request', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'Foo Bar',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deleting a single blog', () => {
  test('removes a blog with a specific id from database', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const finalBlogs = await helper.blogsInDb()
    
    expect(finalBlogs).toHaveLength(initialBlogs.length - 1)
    expect(finalBlogs).not.toContainEqual(blogToDelete)
  })
})

afterAll(() => {
  mongoose.connection.close()
})