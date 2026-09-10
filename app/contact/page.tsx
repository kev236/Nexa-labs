"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, connect API/email service here
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 min-h-screen">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's talk.</h1>
        <p className="text-gray-400 text-lg mb-12">
          Have a question about our products, or want to discuss a partnership? Send us a message.
        </p>

        {submitted ? (
          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-8 text-center flex flex-col items-center">
            <CheckCircle className="text-green-500 mb-4" size={48} />
            <h3 className="text-2xl font-semibold mb-2">Message sent</h3>
            <p className="text-gray-400">We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                <input required type="text" id="name" className="w-full bg-surface border border-surfaceBorder rounded-md px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <input required type="email" id="email" className="w-full bg-surface border border-surfaceBorder rounded-md px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
              <input required type="text" id="subject" className="w-full bg-surface border border-surfaceBorder rounded-md px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="How can we help?" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
              <textarea required id="message" rows={6} className="w-full bg-surface border border-surfaceBorder rounded-md px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Your message..."></textarea>
            </div>

            <button type="submit" className="w-full bg-white text-black py-4 rounded-md font-semibold hover:bg-gray-200 transition-colors">
              Send message
            </button>
          </form>
        )}
      </FadeIn>
    </div>
  );
}