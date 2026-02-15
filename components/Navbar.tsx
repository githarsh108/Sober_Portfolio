
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Navbar Push-up Animation on Scroll
      // We animate the container to create a clean 'pushed up' exit
      gsap.to(containerRef.current, {
        yPercent: -100,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "300 top", // Ends after 300px of scrolling
          scrub: 0.8, // Slight delay for a smoother, heavier 'push' feel
          invalidateOnRefresh: true,
        }
      });

      // 2. Magnetic Effect for individual items
      const items = containerRef.current?.querySelectorAll('.magnetic-item');
      
      items?.forEach((item: any) => {
        const xTo = gsap.quickTo(item, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(item, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
          const { left, top, width, height } = item.getBoundingClientRect();
          const centerX = left + width / 2;
          const centerY = top + height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;
          
          xTo(distanceX * 0.3);
          yTo(distanceY * 0.3);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        item.addEventListener('mousemove', handleMouseMove);
        item.addEventListener('mouseleave', handleMouseLeave);
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="relative w-full z-[100] mix-blend-difference overflow-hidden">
      <div 
        ref={containerRef} 
        className="w-full px-6 py-8 md:px-12 md:py-10 will-animate"
      >
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="magnetic-item w-9 h-9 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110 duration-300">
              <span className="text-black text-[10px] font-black tracking-tighter">HG</span>
            </div>
            <a href="/" className="magnetic-item text-lg font-bold tracking-tighter hover:opacity-60 transition-opacity interactive">
              Harsh Gupta
            </a>
          </div>
          
          <div className="hidden md:flex space-x-12 items-center">
            <a href="#work" className="magnetic-item text-[11px] uppercase tracking-[0.3em] font-bold hover:opacity-60 transition-opacity interactive">Work</a>
            <a href="#about" className="magnetic-item text-[11px] uppercase tracking-[0.3em] font-bold hover:opacity-60 transition-opacity interactive">About</a>
            <a href="#contact" className="magnetic-item text-[11px] uppercase tracking-[0.3em] font-bold px-7 py-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 interactive">Connect</a>
          </div>

          <div className="md:hidden flex flex-col space-y-1.5 group cursor-pointer interactive p-2">
            <div className="w-6 h-[1px] bg-white group-hover:w-4 transition-all"></div>
            <div className="w-6 h-[1px] bg-white"></div>
            <div className="w-6 h-[1px] bg-white group-hover:w-5 transition-all"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
