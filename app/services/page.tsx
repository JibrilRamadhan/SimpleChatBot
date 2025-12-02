'use client';

import { Palette, Package, ShieldCheck, PenTool, Layers, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeatureCard } from '../components/reactbits/grid-feature-cards';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Creative Design',
    icon: Palette,
    description: 'Membuat desain grafis yang unik dan profesional untuk memperkuat identitas brand.',
  },
  {
    title: 'Premium Packaging',
    icon: Package,
    description: 'Kemasan berkualitas tinggi yang mendukung tampilan dan nilai produk Anda.',
  },
  {
    title: 'Brand Protection',
    icon: ShieldCheck,
    description: 'Menjaga konsistensi visual dan memastikan keaslian identitas perusahaan.',
  },
  {
    title: 'Custom Artwork',
    icon: PenTool,
    description: 'Setiap desain dikembangkan secara eksklusif sesuai kebutuhan bisnis Anda.',
  },
  {
    title: 'Collaboration',
    icon: Layers,
    description: 'Berkolaborasi dengan percetakan besar untuk hasil cetak yang optimal.',
  },
  {
    title: 'Future Ready',
    icon: Sparkles,
    description: 'Mengikuti tren terbaru untuk branding yang modern dan selalu relevan.',
  },
];

export default function DemoOne() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Header animation
    if (headerRef.current) {
      const headerChildren = Array.from(headerRef.current.children);
      gsap.fromTo(
        headerChildren,
        { filter: 'blur(4px)', y: -8, opacity: 0 },
        {
          filter: 'blur(0px)',
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'restart none none reverse',
          },
        }
      );
    }

    // Grid container animation
    gsap.fromTo(
      gridRef.current,
      { filter: 'blur(4px)', y: -8, opacity: 0 },
      {
        filter: 'blur(0px)',
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'restart none none reverse',
        },
      }
    );

    // Individual card animations
    const cards = gridRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        { scale: 0.95, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'restart none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold text-white">
            Creative Packaging & Branding
          </h2>
          <p className="text-gray-300 mt-4 text-sm tracking-wide text-balance md:text-base">
            Solusi desain grafis, packaging, dan printing yang profesional untuk memperkuat identitas bisnis Anda.
          </p>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} className="feature-card" />
          ))}
        </div>
      </div>

        {/* Social Proof Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-auto pb-8"
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Tools we trust for design creation
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {/* Photoshop */}
            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(29,155,240,0.6)] transition-all duration-300">
              <img
                src="https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg"
                alt="Adobe Photoshop"
                className="h-8 object-contain"
              />
            </div>

            {/* CorelDRAW */}
            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(0,200,83,0.6)] transition-all duration-300">
              <img
                src="../img/corel.png"
                alt="CorelDRAW"
                className="h-8 object-contain"
              />
            </div>

            {/* Adobe Illustrator */}
            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(255,153,0,0.6)] transition-all duration-300">
              <img
                src="../img/adobeicon.png"
                alt="Adobe Illustrator"
                className="h-8 object-contain"
              />
            </div>

            {/* Figma */}
            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
              <img
                src="../img/figma.png"
                alt="Figma"
                className="h-8 object-contain"
              />
            </div>

            {/* Canva */}
            <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(0,200,255,0.6)] transition-all duration-300">
              <img
                src="../img/canva.jpeg"
                alt="Canva"
                className="h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>

  );
}
