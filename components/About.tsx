import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".about-title", {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 90%",
        }
      });

      // Paragraph stagger
      gsap.from(".about-text", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-container",
          start: "top 80%",
        }
      });

      // Skills stagger
      gsap.from(".skill-item", {
        opacity: 0,
        x: -20,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-56 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-black mb-12">01 — About Me</h2>
            <div className="sticky top-32 overflow-hidden">
              <p className="about-title text-4xl md:text-6xl font-bold leading-[1.1] tracking-tighter will-animate">
                A minimalist at heart, I build <span className="text-gray-500">performant</span> web solutions.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-7 pt-0 lg:pt-24 flex flex-col space-y-16 about-text-container">
            <div className="space-y-8">
              <p className="about-text text-xl md:text-2xl text-gray-400 leading-relaxed font-light will-animate">
                I'm Harsh Gupta, a software engineer with a deep passion for clean interfaces and seamless user interactions. I believe that code is as much a craft as it is a science.
              </p>
              <p className="about-text text-xl md:text-2xl text-gray-400 leading-relaxed font-light will-animate">
                With a background in both engineering and design thinking, I bridge the gap between complex backend architectures and beautiful frontend implementations.
              </p>
            </div>
            
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-black mb-8">Capabilities</h3>
              <div className="skills-grid flex flex-wrap gap-x-12 gap-y-6">
                {SKILLS.map(skill => (
                  <div key={skill.id} className="skill-item group relative overflow-hidden interactive will-animate">
                    <span className="text-xl md:text-2xl font-bold group-hover:text-gray-500 transition-colors duration-300">
                      {skill.name}
                    </span>
                    <div className="w-0 group-hover:w-full h-[1px] bg-white transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;