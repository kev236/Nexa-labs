import { defineField, defineType } from 'sanity'

export const changelog = defineType({
  name: 'changelog',
  title: 'Changelog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Update Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version (optional, e.g. v1.0.2)',
      type: 'string',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Update Type',
      type: 'string',
      options: {
        list: ['Feature', 'Improvement', 'Fix', 'Announcement'],
      },
      initialValue: 'Feature',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'version',
    },
  },
})