import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blogposts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'author', title: 'Auteur', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'mainImage', title: 'Hoofdafbeelding', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'categories', title: 'Categorieën', type: 'array', of: [{ type: 'reference', to: { type: 'category' } }] }),
    defineField({ name: 'publishedAt', title: 'Publicatiedatum', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Korte Samenvatting', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Inhoud', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ],
})