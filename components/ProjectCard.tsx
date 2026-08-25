import React from "react";
import Image from "next/image";
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string; // We'll use a CSS gradient/placeholder if we don't have images
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, className = "", style, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`absolute top-1/2 left-1/2 w-[280px] sm:w-[340px] md:w-[400px] aspect-[4/5] -ml-[140px] sm:-ml-[170px] md:-ml-[200px] -mt-[175px] sm:-mt-[212px] md:-mt-[250px] bg-paper border border-ink/10 rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-colors hover:border-ink/30 will-change-transform ${className}`}
        style={style}
      >
        {/* Image / Visual Area */}
        <div className="relative w-full h-[65%] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 280px, 400px"
            />
          ) : (
            <>
              {/* Subtle grid pattern for UI feel fallback */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #8a8a8a 1px, transparent 1px), linear-gradient(to bottom, #8a8a8a 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Mock UI elements */}
              <div className="absolute top-4 left-4 right-4 h-32 bg-paper rounded-lg shadow-sm" />
              <div className="absolute bottom-4 left-4 w-1/2 h-8 bg-paper rounded-md shadow-sm" />
              <div className="absolute bottom-4 right-4 w-1/3 h-8 bg-paper rounded-md shadow-sm" />
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-end p-6 h-[35%] bg-paper">
          <p className="text-[10px] uppercase tracking-widest text-ash mb-1">
            {project.category}
          </p>
          <h3 className="text-lg font-bold text-ink leading-tight">
            {project.title}
          </h3>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-smoke flex items-center justify-center">
              <span className="block w-1.5 h-1.5 rounded-full bg-ink" />
            </div>
            <span className="text-xs text-ink/60 font-medium">View Case Study</span>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
