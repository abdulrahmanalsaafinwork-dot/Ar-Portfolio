import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight, BsGithub } from "react-icons/bs";

import workProjects from "../../data/workProjects";

const ProjectDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [currentImage, setCurrentImage] = useState(0);

  const liveProject =
    typeof slug === "string" ? workProjects[slug] : undefined;

  // Keep the last valid project so the page doesn't blank out during the exit animation
  const lastProject = useRef(null);
  if (liveProject) lastProject.current = liveProject;
  const project = liveProject ?? lastProject.current;

  useEffect(() => {
    // Only reset when a real slug arrives, not when leaving the page
    if (typeof slug === "string") setCurrentImage(0);
  }, [slug]);

  useEffect(() => {
    if (router.isReady && typeof slug === "string" && !workProjects[slug]) {
      router.replace("/work");
    }
  }, [router.isReady, router, slug]);

  const previousImage = () => {
    if (!project?.images?.length) return;

    setCurrentImage(
      (index) => (index - 1 + project.images.length) % project.images.length
    );
  };

  const nextImage = () => {
    if (!project?.images?.length) return;

    setCurrentImage((index) => (index + 1) % project.images.length);
  };

  if (!project) {
    return <main className="min-h-screen w-full bg-primary" />;
  }

  return (
    <main className="relative min-h-screen w-full bg-primary/30 text-white">
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] lg:gap-10">
          {/* Screenshot gallery */}
          <div className="w-full min-w-0">
            <div className="relative h-[50vh] min-h-[360px] max-h-[850px] w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 sm:h-[60vh] lg:h-[68vh] lg:min-h-[540px] xl:min-h-[600px]">
              <Image
                key={project.images[currentImage]}
                src={project.images[currentImage]}
                alt={`${project.title} screenshot ${currentImage + 1}`}
                fill
                priority={currentImage === 0}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain p-2 sm:p-3"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 transition hover:bg-accent sm:h-10 sm:w-10"
                  >
                    <BsArrowLeft className="text-lg" />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 transition hover:bg-accent sm:h-10 sm:w-10"
                  >
                    <BsArrowRight className="text-lg" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs text-white/90">
                {currentImage + 1} / {project.images.length}
              </div>
            </div>

            <p className="pt-3 text-center text-xs text-white/40">
              Use the arrows to explore the project screenshots
            </p>
          </div>

          {/* Project information */}
          <aside className="flex min-w-0 flex-col justify-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-accent sm:text-sm">
              {project.category}
            </p>

            <h1 className="mb-4 break-words text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              {project.title}
              <span className="text-accent">.</span>
            </h1>

            <p className="mb-6 text-sm leading-relaxed text-white/65 sm:text-base">
              {project.description}
            </p>

            {/* Technologies used */}
            <div className="mb-6">
              <h2 className="mb-3 text-sm uppercase tracking-[0.18em] text-white/90">
                Technologies Used
              </h2>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/75 sm:text-sm"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub and Back to Work */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold transition hover:bg-accent/80 sm:px-6"
              >
                <BsGithub className="text-xl" />
                GitHub Repository
              </a>

              <Link
                href="/work"
                scroll={false}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm transition hover:border-accent hover:text-accent sm:px-6"
              >
                Back to Work
              </Link>
            </div>

            <p className="mt-8 text-xs text-white/35">
              {String(currentImage + 1).padStart(2, "0")} —{" "}
              {String(project.images.length).padStart(2, "0")} screenshots
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;