import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Contact Berichten',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'name', title: 'Naam', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'E-mailadres', type: 'string', readOnly: true }),
    defineField({ name: 'subject', title: 'Onderwerp', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Bericht', type: 'text', readOnly: true }),
    defineField({ name: 'createdAt', title: 'Ontvangen op', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: {
      title: 'name',
      email: 'email',
      subject: 'subject',
    },
    prepare({ title, email, subject }) {
      return {
        title: `${title || 'Anoniem'} (${email || 'geen mail'})`,
        subtitle: subject || 'Geen onderwerp',
        media: EnvelopeIcon,
      }
    },
  },
})