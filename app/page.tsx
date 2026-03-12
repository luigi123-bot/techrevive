"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="main-page">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatBot />
      <FloatingWhatsApp />

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          background: #050810;
          color: #f0f4ff;
          font-family: 'Inter', sans-serif;
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        /* Utility classes that were useful */
        .section-padding {
          padding: 100px 0;
        }

        @media (max-width: 768px) {
          .section-padding {
            padding: 60px 0;
          }
        }
      `}</style>
    </main>
  );
}
