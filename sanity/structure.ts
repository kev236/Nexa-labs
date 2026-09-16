import { StructureBuilder } from 'sanity/structure'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { UsersIcon } from '@sanity/icons/Users'
import { UserIcon } from '@sanity/icons/User'
import { PackageIcon } from '@sanity/icons/Package'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { LockIcon } from '@sanity/icons/Lock'
import { EditIcon } from '@sanity/icons/Edit'
import { TagIcon } from '@sanity/icons/Tag'
import { StarFilledIcon } from '@sanity/icons/StarFilled'
import { HelpCircleIcon } from '@sanity/icons/HelpCircle'
import { CalendarIcon } from '@sanity/icons/Calendar'

// Every document type registered in schemaTypes/index.ts must have a way
// to reach it from here — a custom structure() replaces Sanity's default
// full type list rather than adding to it, so anything left out of this
// tree is invisible in the Studio even though it's a real, editable
// document type. (Previously true of post/author/category/testimonial/
// faq/changelog — none had a way in from this sidebar.)
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Nexa Labs Control Center')
    .items([
      // Products & Ecosystem
      S.listItem()
        .title('Products & Ecosystem')
        .icon(PackageIcon)
        .child(
          S.documentTypeList('product')
            .title('Products')
        ),

      S.divider(),

      // Blog & Editorial
      S.listItem()
        .title('Blog & Editorial')
        .icon(EditIcon)
        .child(
          S.list()
            .title('Blog & Editorial')
            .items([
              S.listItem()
                .title('Posts')
                .icon(EditIcon)
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .title('Changelog')
                .icon(CalendarIcon)
                .child(S.documentTypeList('changelog').title('Changelog')),
              S.listItem()
                .title('Authors')
                .icon(UserIcon)
                .child(S.documentTypeList('author').title('Authors')),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('category').title('Categories')),
            ])
        ),

      S.divider(),

      // Trust & Social Proof
      S.listItem()
        .title('Trust & Social Proof')
        .icon(StarFilledIcon)
        .child(
          S.list()
            .title('Trust & Social Proof')
            .items([
              S.listItem()
                .title('Testimonials')
                .icon(StarFilledIcon)
                .child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem()
                .title('FAQ')
                .icon(HelpCircleIcon)
                .child(S.documentTypeList('faq').title('FAQ')),
            ])
        ),

      S.divider(),

      // Leads & Inkomende Berichten
      S.listItem()
        .title('Leads & Inquiries')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Inbound Submissions')
            .items([
              S.listItem()
                .title('Waitlist Leads')
                .icon(UsersIcon)
                .child(S.documentTypeList('waitlist').title('Waitlist Leads')),
              S.listItem()
                .title('Contact Messages')
                .icon(EnvelopeIcon)
                .child(S.documentTypeList('contactMessage').title('Contact Messages')),
            ])
        ),

      S.divider(),

      // Content & Legal Pagina's
      S.listItem()
        .title('Pages & Legal')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Site Content')
            .items([
              S.listItem()
                .title('Legal Documents')
                .icon(LockIcon)
                .child(S.documentTypeList('legal').title('Legal Pages')),
              S.listItem()
                .title('General Pages')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('page').title('Pages')),
            ])
        ),
    ])
