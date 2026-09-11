import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const waitlist = defineType({
  name: 'waitlist',
  title: 'Waitlist Leads',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'email', title: 'E-mailadres', type: 'string', readOnly: true }),
    defineField({ name: 'productName', title: 'Product', type: 'string', readOnly: true }),
    defineField({ name: 'createdAt', title: 'Inschrijfdatum', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'productName',
      date: 'createdAt',
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('nl-NL') : 'Onbekend'
      return {
        title: title || 'Geen e-mailadres',
        subtitle: `${subtitle || 'General Waitlist'} • ${formattedDate}`,
        media: UsersIcon,
      }
    },
  },
})