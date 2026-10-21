import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import workProjects from "../data/workProjects";

const WorkSlider = () => {
  const projects = Object.entries(workProjects);

  // Divide projects into groups of four DIFFERENT projects.
  const slides = [];

  for (let i = 0; i < projects.length; i += 4) {
    slides.push(projects.slice(i, i + 4));
  }

  return (
    <Swiper
      spaceBetween={10}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="work-slider h-[280px] sm:h-[480px]"
    >
      {slides.map((slide, slideIndex) => (
        <SwiperSlide key={`projects-slide-${slideIndex}`}>
          <div className="grid h-full grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
            {slide.map(([slug, project]) => (
              <Link
                key={slug}
                href={`/work/${slug}`}
                className="relative min-h-0 min-w-0 overflow-hidden rounded-lg group"
              >
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} project thumbnail`}
                  fill
                  sizes="(max-width: 768px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#4a22bd] via-[#e838cc]/30 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-90" />

                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 text-white">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/80">
                    {project.category}
                  </p>

                  <p className="mt-1 text-xs sm:text-sm font-semibold leading-snug line-clamp-2">
                    {project.title}
                  </p>

                  <p className="mt-1 text-xs text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Project →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;