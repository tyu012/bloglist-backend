const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// refactored using async/await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
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
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const result = await blog.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
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