
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  
  const text = "Connect.";

  const SOCIAL_LINKS = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/harsh-gupta-21b9551b9/' },
    { name: 'GitHub', url: 'https://www.github.com/githarsh108' },
    { name: 'Leetcode', url: 'https://leetcode.com/u/kr__harsh_108/' },
    { name: 'Resume', url: 'https://drive.google.com/file/d/1DKPNAiJR-Rf_5dcjqbY80ameMW1FHdex/view?usp=sharing' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Connect text reveal animation
      gsap.from(".connect-text-wrapper", {
        scale: 0.95,
        opacity: 0,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".connect-text-wrapper",
          start: "top 95%",
        }
      });

      // Social links stagger
      gsap.from(".social-link", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".social-links-container",
          start: "top 95%",
        }
      });

      // Spotlight tracking logic
      const container = textContainerRef.current;
      const maskLayer = maskLayerRef.current;
      
      if (container && maskLayer) {
        // High performance CSS variable updates
        const xTo = gsap.quickTo(container, "--mask-x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(container, "--mask-y", { duration: 0.4, ease: "power3.out" });
        const sizeTo = gsap.quickTo(container, "--mask-size", { duration: 0.6, ease: "back.out(1.7)" });

        // Initialize size to 0
        container.style.setProperty('--mask-size', '0px');

        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          xTo(x);
          yTo(y);
        };

        const handleMouseEnter = () => {
          sizeTo(120); // Circle radius
        };

        const handleMouseLeave = () => {
          sizeTo(0);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col items-center text-center py-24">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-gray-600 font-black mb-16">04 — Get In Touch</h2>
          
          <div 
            ref={textContainerRef}
            className="connect-text-wrapper relative group will-animate cursor-none select-none"
            style={{
              // Set initial CSS variables
              ['--mask-x' as any]: '-100%',
              ['--mask-y' as any]: '-100%',
              ['--mask-size' as any]: '0px'
            }}
          >
            {/* Base layer: White text on Black background */}
            <a 
              href="mailto:harshgupta06625@gmail.com" 
              className="text-[15vw] md:text-[13vw] font-black uppercase tracking-tighter leading-none inline-flex text-white interactive transition-opacity duration-500 group-hover:opacity-40"
              data-cursor-type="connect"
            >
              {text}
            </a>

            {/* Spotlight Layer: Black text on White background, clipped to a circle */}
            <div 
              ref={maskLayerRef}
              className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden"
              style={{
                // Masking ensures this layer is only visible within the circle radius
                maskImage: 'radial-gradient(circle var(--mask-size) at var(--mask-x) var(--mask-y), black 100%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle var(--mask-size) at var(--mask-x) var(--mask-y), black 100%, transparent 100%)'
              }}
            >
               {/* This inner div provides the white "spotlight" background */}
               <div className="w-full h-full bg-white flex items-center justify-center">
                  <span className="text-[15vw] md:text-[13vw] font-black uppercase tracking-tighter leading-none text-black">
                    {text}
                  </span>
               </div>
            </div>
          </div>
          
          <div className="social-links-container mt-24 flex flex-wrap justify-center gap-10 md:gap-20">
            {SOCIAL_LINKS.map((social, i) => (
              <a 
                key={i}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link text-[10px] uppercase tracking-[0.4em] font-black text-gray-500 hover:text-white transition-colors interactive will-animate"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] uppercase tracking-[0.5em] font-black text-gray-700">
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center">
            <p>© 2026 HARSH GUPTA</p>
            <p>LOCATED IN RANCHI, INDIA</p>
          </div>
          <p className="text-gray-800">CRAFTED WITH PRECISION</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
