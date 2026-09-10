import { client } from "@/lib/sanity";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: "Coming soon" | "Live" | "Beta";
  iconName: "FileText" | "Mail" | "Activity";
};

export const fallbackProducts: Product[] = [
  {
    id: "prod_1",
    slug: "quoteflow",
    name: "QuoteFlow",
    description: "Create professional business quotes in seconds.",
    status: "Coming soon",
    iconName: "FileText",
  },
  {
    id: "prod_2",
    slug: "invoicechaser",
    name: "InvoiceChaser",
    description: "Make following up on unpaid invoices effortless.",
    status: "Coming soon",
    iconName: "Mail",
  },
  {
    id: "prod_3",
    slug: "siteaudit",
    name: "SiteAudit",
    description: "Understand what's holding your website back.",
    status: "Coming soon",
    iconName: "Activity",
  },
];

export async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    "id": _id,
    "slug": slug.current,
    name,
    description,
    status,
    iconName
  }`;

  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return fallbackProducts;
    }
    const products = await client.fetch<Product[]>(query);
    return products.length > 0 ? products : fallbackProducts;
  } catch (error) {
    console.error("Fout bij ophalen CMS data, fallback ingeschakeld:", error);
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    "id": _id,
    "slug": slug.current,
    name,
    description,
    status,
    iconName
  }`;

  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return fallbackProducts.find((p) => p.slug === slug);
    }
    const product = await client.fetch<Product>(query, { slug });
    return product || fallbackProducts.find((p) => p.slug === slug);
  } catch (error) {
    return fallbackProducts.find((p) => p.slug === slug);
  }
}