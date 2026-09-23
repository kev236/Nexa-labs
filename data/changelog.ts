import { client } from '@/sanity/lib/client'
import type { ComponentProps } from 'react'
import type { PortableText } from '@portabletext/react'

export type ChangelogEntry = {
  _id: string
  title: string
  version?: string
  releaseDate: string
  type: 'Feature' | 'Improvement' | 'Fix' | 'Announcement'
  content?: ComponentProps<typeof PortableText>['value']
}

const CHANGELOG_PROJECTION = `{ _id, title, version, releaseDate, type, content }`

/**
 * Shared with app/changelog/page.tsx and the homepage's recent-activity
 * strip, so both read the exact same real entries rather than drifting
 * copies of this query.
 */
export async function getChangelog(): Promise<ChangelogEntry[]> {
  return client.fetch<ChangelogEntry[]>(
    `*[_type == "changelog"] | order(releaseDate desc) ${CHANGELOG_PROJECTION}`
  )
}
