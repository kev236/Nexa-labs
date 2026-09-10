import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Producten',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Productnaam', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Korte Omschrijving', type: 'text', rows: 3 }),
    defineField({ name: 'price', title: 'Prijs (€)', type: 'number' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Beta', value: 'beta' },
          { title: 'Live', value: 'live' },
        ],
      },
    }),
    defineField({ name: 'icon', title: 'Icooenaam (Lucide Icon)', type: 'string' }),
    defineField({ name: 'image', title: 'Afbeelding', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Uitgebreide Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
})