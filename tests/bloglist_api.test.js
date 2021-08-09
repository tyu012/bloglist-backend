const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlhdCI6MTYyNzc3ODU1Mn0.y7Nbbu8aDLNlwwNClx9YscDSe3RnBYEvU-950nf2GRY'
// const auth = `Bearer ${token}`

let auth

beforeEach(async () => {

  await Blog.deleteMany({})

  for (let blog of helper.data) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})

  const users = await helper.generateUsers()

  for (let user of users) {
    let userObject = new User(user)
    await userObject.save()
  }

  auth = `Bearer ${await helper.getToken()}`
}, 50000)

describe('blog post storage and retrieval', () => {
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

    test('user property of blog posts is defined', async () => {
      const res = await api.get('/api/blogs')
      for (let blog of res.body) {
        expect(blog.user).toBeDefined()
      }
    })

    test('user information of blog posts is populated', async () => {
      const res = await api.get('/api/blogs')
      for (let { user } of res.body) {
        expect(user.username).toBeDefined()
        expect(user.id).toBeDefined()
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
        .set('Authorization', auth)
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
        .set('Authorization', auth)
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
        .set('Authorization', auth)
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
        .set('Authorization', auth)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('saved blog contains "user" property', async () => {
      const newBlog = {
        title: 'Example Blog',
        author: 'Foo Bar',
        url: 'https://example.com',
        likes: 3
      }

      await api
        .post('/api/blogs')
        .set('Authorization', auth)
        .send(newBlog)

      const blogs = await helper.blogsInDb()
      const targetBlog = blogs.find(b => b.title === newBlog.title)
      expect(targetBlog.user).toBeDefined()
    })

    test('saved blog appears in the user\'s "blogs" property', async () => {
      const newBlog = {
        title: 'Example Blog',
        author: 'Foo Bar',
        url: 'https://example.com',
        likes: 3
      }

      await api
        .post('/api/blogs')
        .set('Authorization', auth)
        .send(newBlog)

      const targetBlog = (await helper.blogsInDb())
        .find(b => b.title === newBlog.title)
      const targetBlogUser = (await helper.usersInDb())
        .find(u => u.id === targetBlog.user.toString())
      const userBlogs = targetBlogUser.blogs.map(b => b.toString())

      expect(userBlogs).toContain(targetBlog.id)
    })

    test('responds with 401 if no valid authorization header is provided', async () => {
      const newBlog = {
        title: 'Example Blog',
        author: 'Foo Bar',
        url: 'https://example.com',
        likes: 3
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const finalBlogs = await helper.blogsInDb()

      expect(finalBlogs)
        .toHaveLength(helper.data.length)
      expect(finalBlogs.map(helper.removeExtraneousProperties))
        .not.toContainEqual(newBlog)
    })
  })

  describe('deleting a single blog', () => {
    test('responds with 401 when removing a single blog without authentication', async () => {
      const initialBlogs = await helper.blogsInDb()
      const blogToDelete = initialBlogs[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const finalBlogs = await helper.blogsInDb()

      expect(finalBlogs).toHaveLength(initialBlogs.length)
      expect(finalBlogs).toContainEqual(blogToDelete)
    })

    test('responds with 204 when removing a single blog with authentication', async () => {
      const newBlog = {
        title: 'Example Blog',
        author: 'Foo Bar',
        url: 'https://example.com',
        likes: 3
      }

      const blogInDb = await api
        .post('/api/blogs')
        .set('Authorization', auth)
        .send(newBlog)
      
      await api
        .delete(`/api/blogs/${blogInDb.body.id}`)
        .set('Authorization', auth)
        .expect(204)

      const finalBlogs = await helper.blogsInDb()

      expect(finalBlogs).toHaveLength(helper.data.length)
      expect(finalBlogs).not.toContainEqual(blogInDb)
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
})

describe('user management', () => {
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

    test('fails with 400 when username is not given', async () => {
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

    test('fails with 400 when password is not given', async () => {
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

    test('fails with 400 when username is less than 3 characters long', async () => {
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

    test('fails with 400 when password is less than 3 characters long', async () => {
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

    test('fails with 400 when username is not unique', async () => {
      const initialUsers = await helper.usersInDb()

      const newUser = {
        username: 'hellas',
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

    test('displays the ids of the blogs they added', async () => {
      const users = await api.get('/api/users')

      for (let user of users.body) {
        expect(user.blogs).toBeDefined()
      }
    })

    test('displays populated data of the blogs they added', async () => {
      const users = await api.get('/api/users')

      for (let { blogs } of users.body) {
        for (let blog of blogs) {
          expect(blog.title).toBeDefined()
          expect(blog.url).toBeDefined()
        }
      }
    })
  })

  describe('user authentication', () => {
    test('successful authentication returns a token', async () => {

      const authentication = {
        username: 'hellas',
        password: 'secret',
      }

      const res = await api
        .post('/api/login')
        .send(authentication)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(res.body.token).toBeDefined()
    }, 100000)
  })
})


afterAll(() => {
  mongoose.connection.close()
})