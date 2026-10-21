import Image from "next/image";
import { HiArrowDown } from "react-icons/hi2";

const ResumeBtn = () => {
  return (
    <div className="mx-auto xl:mx-0 relative z-20">
      <a
        href="/resume.pdf"
        download="Abdulrahman_Alsaafin_Resume.pdf"
        className="relative w-[185px] h-[185px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group cursor-pointer"
      >
        <Image
          src="/rounded-resume.png"
          alt="download resume"
          width={185}
          height={188}
          className="animate-spin-slow w-full h-full max-w-[185px] max-h-[188px] pointer-events-none select-none"
        />

        <HiArrowDown
          className="absolute text-4xl group-hover:translate-y-2 transition-all duration-300 pointer-events-none"
          aria-hidden
        />
      </a>
    </div>
  );
};

export default ResumeBtn;