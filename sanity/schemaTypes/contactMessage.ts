import { defineType, defineField } from 'sanity'

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Contact Berichten',
  type: 'document',
  readOnly: true, // Zodat je ze in het CMS niet per ongeluk overschrijft
  fields: [
    defineField({ name: 'name', title: 'Naam', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'subject', title: 'Onderwerp', type: 'string' }),
    defineField({ name: 'message', title: 'Bericht', type: 'text' }),
    defineField({ name: 'status', title: 'Status', type: 'string', initialValue: 'nieuw', options: { list: ['nieuw', 'gelezen', 'beantwoord'] } }),
  ],
})