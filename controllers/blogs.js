const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// refactored using async/await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    likes: 0,
    ...request.body
  })
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter