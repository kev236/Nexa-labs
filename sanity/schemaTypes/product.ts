import { defineType, defineField } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Beta', value: 'beta' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
      },
      initialValue: 'coming-soon',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Drives the filter tabs on /products — pick an existing one where it fits, or type a new one.',
      options: {
        list: ['Sales', 'Finance', 'SEO & Performance', 'Developer Tools'],
      },
    }),
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name shown on the product card (e.g. search, file-text, receipt). Falls back to a generic box icon if left blank or unrecognized.',
      options: {
        list: ['search', 'file-text', 'receipt'],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'price',
      title: 'Price (€)',
      type: 'number',
    }),
    defineField({
      name: 'features',
      title: 'Features / Capabilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add key capabilities for this product',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'image',
    },
  },
})