import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="work" className="py-32 md:py-56 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-black mb-12">02 — Selected Works</h2>
        </div>
        
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;