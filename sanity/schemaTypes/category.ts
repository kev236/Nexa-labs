import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Categorie',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Omschrijving', type: 'text' }),
  ],
})