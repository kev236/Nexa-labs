import { defineType, defineField } from 'sanity'
import { LockIcon } from '@sanity/icons/Lock'

/**
 * Leads from the public Clip Scoring API request-access form
 * (components/ApiAccessRequestForm.tsx, app/api/request-api-access).
 * Separate from `waitlist` because this needs a use-case field the
 * generic waitlist doesn't have — billing here is manual, so the owner
 * reads this list and issues a key from Nexa AI's own admin dashboard,
 * this document is just the record of the request.
 */
export const apiAccessRequest = defineType({
  name: 'apiAccessRequest',
  title: 'API Access Requests',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({ name: 'email', title: 'E-mailadres', type: 'string', readOnly: true }),
    defineField({ name: 'useCase', title: 'Use case', type: 'text', readOnly: true }),
    defineField({ name: 'createdAt', title: 'Aanvraagdatum', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'useCase',
      date: 'createdAt',
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('nl-NL') : 'Onbekend'
      return {
        title: title || 'Geen e-mailadres',
        subtitle: `${subtitle || 'Clip Scoring API'} • ${formattedDate}`,
        media: LockIcon,
      }
    },
  },
})
