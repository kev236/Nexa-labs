import { product } from './product'
import { post } from './post'
import { author } from './author'
import { category } from './category'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { page } from './page'
import { contactMessage } from './contactMessage'
import { waitlist } from './waitlist'
import { legal } from './legal' // NIEUW
import { changelog } from './changelog'
import { apiAccessRequest } from './apiAccessRequest'

export const schemaTypes = [
  product, post, author, category, testimonial, faq, page,
  contactMessage, waitlist, legal, changelog, apiAccessRequest
]