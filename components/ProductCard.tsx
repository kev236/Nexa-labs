"use client";

import Link from "next/link";
import { ArrowRight, FileText, Mail, Activity, LucideIcon } from "lucide-react";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

const iconMap: Record<Product['iconName'], LucideIcon> = {
  FileText,
  Mail,
  Activity,
};

export default function ProductCard({ product }: { product: Product }) {
  const Icon = iconMap[product.iconName] || FileText;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col bg-surface border border-surfaceBorder rounded-2xl p-8 h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6">
        <span className="text-xs font-semibold px-3 py-1 bg-surfaceBorder text-gray-300 rounded-full">
          {product.status}
        </span>
      </div>
      
      <div className="h-12 w-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
        <Icon size={24} />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3">{product.name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
        {product.description}
      </p>
      
      <Link 
        href={`/products/${product.slug}`}
        className="inline-flex items-center text-sm font-medium text-white group-hover:text-accent transition-colors"
      >
        Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}