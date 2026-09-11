import { StructureBuilder } from 'sanity/structure'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { UsersIcon } from '@sanity/icons/Users'
import { PackageIcon } from '@sanity/icons/Package'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { LockIcon } from '@sanity/icons/Lock'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Nexa Labs Control Center')
    .items([
      // Producten & Ecosysteem
      S.listItem()
        .title('Products & Ecosystem')
        .icon(PackageIcon)
        .child(
          S.documentTypeList('product')
            .title('Products')
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