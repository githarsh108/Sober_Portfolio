import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Initial state hide
      gsap.set(".reveal-item", { y: "100%", opacity: 0 });
      gsap.set(".hero-info", { y: 40, opacity: 0 });

      tl.to(".reveal-item", {
        y: "0%",
        opacity: 1,
        duration: 1.8,
        stagger: 0.1,
        delay: 0.5
      })
      .to(".hero-info", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2
      }, "-=1.2");

      // Floating animation for the "Digital" outline text
      gsap.to(".text-outline-white", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Subtle mouse movement effect on the headline
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(headlineRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col h-full py-20">
        <div className="mt-auto">
          <div className="overflow-hidden">
            <h1 ref={headlineRef} className="text-[14vw] md:text-[13vw] leading-[0.9] font-black uppercase flex flex-col will-animate">
              <span className="reveal-item block tracking-tight">
                Craf<span className="inline-block ml-[0.08em]">t</span>ing
              </span>
              <span className="reveal-item block text-outline-white text-transparent ml-[4vw] tracking-tighter">Digital</span>
              <span className="reveal-item block tracking-tighter">Elegance.</span>
            </h1>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="hero-info max-w-xl">
            <p className="text-xl md:text-3xl text-gray-400 font-light leading-tight tracking-tight">
              Independent software engineer and digital designer based in Ranchi, India. Specializing in high-performance web systems.
            </p>
          </div>
          
          <div className="hero-info flex flex-col space-y-4 md:text-right">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-black">Status</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white font-bold flex items-center md:justify-end gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                Open for Collaboration
              </span>
            </div>
          </div>
        </div>

        <div className="hero-info absolute bottom-0 left-0 flex items-center gap-6 pb-4">
          <div className="w-[1px] h-20 bg-white/10"></div>
          <span className="text-[9px] uppercase tracking-[0.6em] text-gray-600 font-bold vertical-text">Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;