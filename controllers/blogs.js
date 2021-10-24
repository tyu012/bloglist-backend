const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')

// refactored using async/await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 }, User)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  if (!user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!body.title) {
    response.status(400).send({ error: 'title missing' })
    return
  }
  if (!body.url) {
    response.status(400).send({ error: 'url missing' })
    return
  }

  const userInDb = await User.findById(user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: userInDb._id,
  })
  const result = await blog.save()
  userInDb.blogs = userInDb.blogs.concat(result._id)
  await userInDb.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const user = request.user

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  if (!user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const target = await Blog.findById(request.params.id)

  if (target.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'incorrect user'})
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.title) {
    response.status(400).send({ error: 'title missing' })
    return
  }
  if (!body.url) {
    response.status(400).send({ error: 'url missing' })
    return
  }

  const blog = new Blog({
    _id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter