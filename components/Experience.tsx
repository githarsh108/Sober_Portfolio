import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-item", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-10">03 / EXPERIENCE</h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {EXPERIENCES.map(exp => (
            <div key={exp.id} className="exp-item grid grid-cols-1 md:grid-cols-3 py-12 group hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg will-animate interactive">
              <div className="text-gray-500 font-medium mb-4 md:mb-0 uppercase tracking-widest text-xs group-hover:text-white transition-colors">
                {exp.period}
              </div>
              <div className="col-span-1">
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">{exp.company}</h3>
                <p className="text-gray-400 italic mb-4 md:mb-0">{exp.role}</p>
              </div>
              <div className="text-gray-500 leading-relaxed max-w-md group-hover:text-gray-300 transition-colors">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;