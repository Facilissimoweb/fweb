import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import ImageBanner from '../components/ImageBanner';

const BANNER_IMAGES_WEB_CRAFT = [
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541462608141-275d72e2302a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
];

const BANNER_IMAGES_BRAND_ART = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80',
];

const BANNER_IMAGES_SOCIAL_STRATEGY = [
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
];

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ImageBanner images={BANNER_IMAGES_WEB_CRAFT} direction="left" />
      <Portfolio />
      <About />
      <ImageBanner images={BANNER_IMAGES_BRAND_ART} direction="right" />
      <Testimonials />
      <Blog />
      <ImageBanner images={BANNER_IMAGES_SOCIAL_STRATEGY} direction="left" />
      <Contact />
    </>
  );
}
