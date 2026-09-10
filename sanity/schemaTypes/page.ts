import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pagina\'s',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Paginatitel', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'pageBuilder',
      title: 'Pagina Opbouw',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroBlock',
          title: 'Hero Sectie',
          fields: [
            { name: 'heading', title: 'Hoofdtitel', type: 'string' },
            { name: 'subheading', title: 'Subtitel', type: 'text' },
            { name: 'ctaText', title: 'Button Tekst', type: 'string' },
            { name: 'ctaLink', title: 'Button Link', type: 'string' },
          ],
        },
        {
          type: 'object',
          name: 'featureGridBlock',
          title: 'Feature Grid',
          fields: [
            { name: 'title', title: 'Sectietitel', type: 'string' },
            { name: 'items', title: 'Features', type: 'array', of: [{ type: 'string' }] },
          ],
        },
        {
          type: 'object',
          name: 'ctaBlock',
          title: 'Call to Action Block',
          fields: [
            { name: 'title', title: 'Titel', type: 'string' },
            { name: 'buttonText', title: 'Button Tekst', type: 'string' },
            { name: 'buttonLink', title: 'Button Link', type: 'string' },
          ],
        },
      ],
    }),
  ],
})