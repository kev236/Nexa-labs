import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact — Nexa Labs',
  description: 'Get in touch with the Nexa Labs team.',
}

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
          Contact
        </span>
        <h1 className="text-4xl font-bold mt-2 text-white">Let&apos;s talk.</h1>
        <p className="text-gray-400 mt-4">
          Heb je een vraag, feedback of wil je samenwerken? Vul het onderstaande formulier in en we reageren zo snel mogelijk.
        </p>
      </div>

      <ContactForm />
    </main>
  )
}