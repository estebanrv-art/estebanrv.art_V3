"use client";

import { useLanguage } from "@/lib/language-context";

interface Project {
  id: string;
  titleEs: string;
  title: string;
  descriptionEs: string;
  description: string;
  year: string;
  tags: string[];
  githubUrl?: string;
  externalUrl?: string;
}

const projects: Project[] = [
  // Add your projects here
  // Example:
  // {
  //   id: "p01",
  //   titleEs: "Mi Proyecto",
  //   title: "My Project",
  //   descriptionEs: "Una breve descripción del proyecto.",
  //   description: "A brief description of the project.",
  //   year: "2024",
  //   tags: ["JavaScript", "React"],
  //   githubUrl: "https://github.com/...",
  //   externalUrl: "https://...",
  // }
];

function ProjectCard({ project, onOpenUrl }: { project: Project; onOpenUrl: (url: string) => void }) {
  const { language } = useLanguage();
  const title = language === "es" ? project.titleEs : project.title;
  const description = language === "es" ? project.descriptionEs : project.description;

  return (
    <div
      className="rounded-[2rem] border border-[rgba(250,248,245,0.05)] bg-surface overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[rgba(67,179,174,0.15)] hover:-translate-y-0.5"
    >
      <div className="px-5 py-4">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <h3 className="font-serif italic text-[0.95rem] text-fg leading-snug">
            {title}
          </h3>
          <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/30 shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-[0.875rem] font-light text-fg/50 mb-4 leading-[1.6] min-h-[2.8rem]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
              style={{ background: "rgba(67,179,174,0.1)", color: "rgba(67,179,174,0.8)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <button
              onClick={() => onOpenUrl(project.githubUrl!)}
              className="text-[0.8rem] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border border-fg/20 text-fg/60 hover:text-fg hover:border-fg/40 transition-colors duration-200"
            >
              {language === "es" ? "GitHub" : "GitHub"}
            </button>
          )}
          {project.externalUrl && (
            <button
              onClick={() => onOpenUrl(project.externalUrl!)}
              className="text-[0.8rem] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full bg-accent/20 text-accent hover:bg-accent/30 border border-accent/40 transition-colors duration-200"
            >
              {language === "es" ? "Visitar" : "Visit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { language, t } = useLanguage();

  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section id="projects" className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent">
            {t("projects_heading")}
          </h2>
          <p className="text-[0.875rem] font-light text-fg/40 max-w-[300px] text-right leading-[1.6] shrink-0 hidden md:block">
            {t("projects_sub")}
          </p>
        </div>

        <p className="text-sm font-light text-fg/40 mb-10 md:hidden">
          {t("projects_sub")}
        </p>

        {projects.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-[0.875rem] font-light text-fg/40 text-center">
              {language === "es"
                ? "Próximamente: tus proyectos y herramientas aquí."
                : "Coming soon: your projects and tools will appear here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenUrl={handleOpenUrl} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
