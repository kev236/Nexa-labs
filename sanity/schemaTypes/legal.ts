import { defineType, defineField } from 'sanity'

export const legal = defineType({
  name: 'legal',
  title: 'Juridische Pagina\'s',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'lastUpdated', title: 'Laatst bijgewerkt', type: 'date' }),
    defineField({ name: 'content', title: 'Inhoud', type: 'array', of: [{ type: 'block' }] }),
  ],
})