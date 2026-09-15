import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote / Beoordeling', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'authorName', title: 'Naam Klant', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'authorRole', title: 'Functie', type: 'string' }),
    defineField({ name: 'company', title: 'Bedrijfsnaam', type: 'string' }),
    defineField({ name: 'avatar', title: 'Avatar / Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'rating', title: 'Score (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5) }),
  ],
  preview: {
    select: {
      title: 'authorName',
      company: 'company',
      quote: 'quote',
      media: 'avatar',
    },
    prepare({ title, company, quote, media }) {
      return {
        title: title || 'Naamloze testimonial',
        subtitle: company ? `${company} — ${quote}` : quote,
        media,
      }
    },
  },
})