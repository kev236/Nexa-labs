import { defineType, defineField } from 'sanity'

export const waitlist = defineType({
  name: 'waitlist',
  title: 'Waitlist Leads',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'product', title: 'Voor Product', type: 'string' }),
    defineField({ name: 'date', title: 'Inschrijfdatum', type: 'datetime' }),
  ],
})