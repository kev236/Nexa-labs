import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Vraag', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Antwoord', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Categorie (optioneel)', type: 'string' }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
})