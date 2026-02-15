
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.fromTo(imageRef.current, 
        { y: -30, scale: 1.1 },
        { 
          y: 30, 
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Entry reveal
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, { scale: 1.05, duration: 1.2, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 20, duration: 0.6, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 1.2, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 0, duration: 0.6, ease: "power2.out" });
  };

  return (
    <a 
      ref={containerRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row gap-8 md:gap-16 py-16 border-b border-white/5 last:border-0 interactive will-animate no-underline decoration-transparent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="VIEW"
      data-cursor-type="project"
    >
      <div className="md:w-1/12 flex md:flex-col justify-between text-gray-600 text-[10px] font-black tracking-[0.4em] uppercase">
        <span>0{index + 1}</span>
        <span className="hidden md:block rotate-90 origin-left mt-12">Project</span>
      </div>

      <div className="md:w-7/12 overflow-hidden rounded-sm bg-[#111] relative">
        <img 
          ref={imageRef}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full aspect-[16/9] object-cover transition-transform duration-700 will-animate"
        />
      </div>

      <div className="md:w-4/12 flex flex-col justify-between py-2">
        <div>
          <h3 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 transition-transform duration-500 will-animate text-white"
          >
            {project.title}
          </h3>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-black">{project.category}</p>
        </div>
        
        <div className="mt-8 flex items-center gap-4 group-hover:translate-x-4 opacity-40 group-hover:opacity-100 transition-all duration-500">
          <div className="w-8 h-[1px] bg-white"></div>
          <span className="text-xs uppercase tracking-widest font-bold text-white">View Case Study</span>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;