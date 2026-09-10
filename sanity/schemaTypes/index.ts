import { product } from './product'
import { post } from './post'
import { author } from './author'
import { category } from './category'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { page } from './page'
import { contactMessage } from './contactMessage' // NIEUW
import { waitlist } from './waitlist'           // NIEUW

export const schemaTypes = [
  product, post, author, category, testimonial, faq, page,
  contactMessage, waitlist // NIEUW
]