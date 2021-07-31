const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
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

  test('responds with 400 if title is not in GET request', async () => {
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

  test('responds with 400 if url is not in GET request', async () => {
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
  test('responds with 204 when removing a single blog', async () => {
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

describe('updating a single blog', () => {
  test('updates the number of likes of a blog', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToUpdate = initialBlogs[0]
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()

    expect(finalBlogs).toHaveLength(initialBlogs.length)
    expect(finalBlogs).toContainEqual(updatedBlog)
  }, 10000)

  test('responds with 400 if title is not in PUT request', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToUpdate = initialBlogs[0]
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1, title: undefined }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()

    expect(finalBlogs).toHaveLength(initialBlogs.length)
    expect(finalBlogs).toContainEqual(blogToUpdate)
  })

  test('responds with 400 if url is not in PUT request', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToUpdate = initialBlogs[0]
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1, url: undefined }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()

    expect(finalBlogs).toHaveLength(initialBlogs.length)
    expect(finalBlogs).toContainEqual(blogToUpdate)
  })
})

describe('user authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  describe('creating users', () => {
    test('creates new users', async () => {
      const initialUsers = await helper.usersInDb()

      const newUser = {
        username: 'foobar',
        name: 'Foo Bar',
        password: 'notsofast'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const finalUsers = await helper.usersInDb()

      expect(finalUsers).toHaveLength(initialUsers.length + 1)
      expect(finalUsers.map(u => u.username)).toContain('foobar')
    })

    test('fails when username is not given', async () => {
      const initialUsers = await helper.usersInDb()

      const newUser = {
        name: 'Foo Bar',
        password: 'notsofast'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const finalUsers = await helper.usersInDb()

      expect(initialUsers).toHaveLength(finalUsers.length)
    })

    test('fails when password is not given', async () => {
      const initialUsers = await helper.usersInDb()

      const newUser = {
        username: 'foobar',
        name: 'Foo Bar'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const finalUsers = await helper.usersInDb()

      expect(initialUsers).toHaveLength(finalUsers.length)
    })

    test('fails when username is less than 3 characters long', async () => {
      const initialUsers = await helper.usersInDb()

      const newUser = {
        username: 'fo',
        name: 'Foo Bar',
        password: 'notsofast'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const finalUsers = await helper.usersInDb()

      expect(initialUsers).toHaveLength(finalUsers.length)
    })

    test('fails when password is less than 3 characters long', async () => {
      const initialUsers = await helper.usersInDb()

      const newUser = {
        username: 'foobar',
        name: 'Foo Bar',
        password: 'no'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const finalUsers = await helper.usersInDb()

      expect(initialUsers).toHaveLength(finalUsers.length)
    })

    test('fails when username is not unique', async () => {
      const initialUsers = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Foo Bar',
        password: 'notsofast'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const finalUsers = await helper.usersInDb()

      expect(initialUsers).toHaveLength(finalUsers.length)
    })
  })

  describe('retrieving users', () => {
    test('returns users in JSON format', async () => {
      const usersFromApi = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersInDb = await helper.usersInDb()

      expect(usersFromApi.body).toHaveLength(usersInDb.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})