import Joi from 'joi'

export const email = Joi.string().email().trim().required()
.messages({
    'any.required': 'Email is required'
})

export const  movie = Joi.string().trim().required()
.messages({
   'any.required': 'Movie name is required'
})