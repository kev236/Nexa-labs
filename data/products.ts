import { FileText, Mail, Activity, LucideIcon } from 'lucide-react';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: 'Coming soon' | 'Live' | 'Beta';
  icon: LucideIcon;
};

export const products: Product[] = [
  {
    id: 'prod_1',
    slug: 'quoteflow',
    name: 'QuoteFlow',
    description: 'Create professional business quotes in seconds.',
    status: 'Coming soon',
    icon: FileText,
  },
  {
    id: 'prod_2',
    slug: 'invoicechaser',
    name: 'InvoiceChaser',
    description: 'Make following up on unpaid invoices effortless.',
    status: 'Coming soon',
    icon: Mail,
  },
  {
    id: 'prod_3',
    slug: 'siteaudit',
    name: 'SiteAudit',
    description: "Understand what's holding your website back.",
    status: 'Coming soon',
    icon: Activity,
  },
];