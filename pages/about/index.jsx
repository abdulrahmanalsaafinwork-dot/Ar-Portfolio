
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaPython,
  FaReact,
  FaMicrochip,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaAndroid,
} from "react-icons/fa";

import {
  SiHostinger,
  SiMysql,
  SiPhp,
  SiArduino,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiFirebase,
  SiDart,
  SiKotlin,
  SiVercel,
  SiXampp,
  SiAndroidstudio,
  SiFlutter,
  SiPhpmyadmin,
  SiTidb,
} from "react-icons/si";

import { BsBootstrap } from "react-icons/bs";
import { VscVscode } from "react-icons/vsc";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

// Data
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Frontend Development",
        icons: [
          { Icon: FaHtml5, name: "HTML5" },
          { Icon: FaCss3, name: "CSS3" },
          { Icon: FaJs, name: "JavaScript" },
          { Icon: FaReact, name: "React" },
          { Icon: SiTailwindcss, name: "Tailwind CSS" },
          { Icon: BsBootstrap, name: "Bootstrap" },
        ],
      },
      {
        title: "Backend Development",
        icons: [
          { Icon: FaNodeJs, name: "Node.js" },
          { Icon: SiPhp, name: "PHP" },
        ],
      },
      {
        title: "Databases & Database Tools",
        icons: [
          { Icon: SiMysql, name: "MySQL" },
          { Icon: SiPostgresql, name: "PostgreSQL" },
          { Icon: SiPhpmyadmin, name: "phpMyAdmin" },
          { Icon: SiSupabase, name: "Supabase" },
          { Icon: SiFirebase, name: "Firebase" },
          { Icon: SiTidb, name: "TiDB Cloud" },
        ],
      },
      {
        title: "Programming Languages",
        icons: [
          { Icon: FaPython, name: "Python" },
          { Icon: FaJava, name: "Java" },
          { Icon: SiDart, name: "Dart" },
          { Icon: SiKotlin, name: "Kotlin" },
        ],
      },
      {
        title: "Mobile App Development",
        icons: [
          { Icon: SiFlutter, name: "Flutter" },
          { Icon: SiAndroidstudio, name: "Android Studio" },
        ],
      },
      {
        title: "Development Tools",
        icons: [
          { Icon: VscVscode, name: "VS Code" },
          { Icon: FaGithub, name: "GitHub" },
          { Icon: FaGitAlt, name: "Git" },
          { Icon: SiXampp, name: "XAMPP" },
        ],
      },
      {
        title: "Deployment Platforms",
        icons: [
          { Icon: SiVercel, name: "Vercel" },
          { Icon: SiHostinger, name: "Hostinger" },
        ],
      },
      {
        title: "Hardware & IoT",
        icons: [
          { Icon: SiArduino, name: "Arduino" },
          { Icon: FaMicrochip, name: "Microcontrollers" },
        ],
      },
    ],
  },

  {
    title: "certificates",
    info: [
      {
        title: "Automotive Servicing",
        stage: "National Certificate I",
        file: "/nc1.jpg",
      },
      {
        title: "Automotive Servicing",
        stage: "National Certificate II",
        file: "/nc2.jpg",
      },
      {
        title: "AI Privacy and Cybersecurity",
        stage: "on Social Media",
        file: "/cert1.jpg",
      },
      {
        title: "IoT Innovator",
        stage: "Build, Connect and Automate with Arduino",
        file: "/cert2.jpg",
      },
      {
        title: "AI-Powered Multimedia",
        stage: "Certificate",
        file: "/cert3.jpg",
      },
      {
        title: "Connected but Protected",
        stage: "IoT Security Essentials for a Safer World",
        file: "/cert4.jpg",
      },
      {
        title: "The Web Developer Blueprint",
        stage: "Certificate",
        file: "/cert5.jpg",
      },
    ],
  },

  {
    title: "experience",
    info: [
      {
        title: "Teleperformance",
        stage: "Nicholas Holiday Account | Oct 2024 - Dec 2024",
        file: "/coe1.pdf",
      },
      {
        title: "Teleperformance",
        stage: "Byram Healthcare Account | Feb 2025 - Apr 2025",
        file: "/coe2.pdf",
      },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />

      {/* Avatar */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">

        {/* Text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Building{" "}
            <span className="text-accent">skills</span>{" "}
            through learning and real-world experience.
          </motion.h2>

          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
          >
            Professional background in Information Technology with
            hands-on experience in full-stack web development,
            database management, data analysis, and hardware systems.
            Proficient across web technologies, core programming
            languages, relational databases, Arduino development,
            and cloud deployment platforms. Complemented by background
            in the BPO industry, demonstrating strong skills in
            cross-functional communication, technical problem-solving,
            and client-centric service delivery.
          </motion.p>
        </div>

        {/* Information */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] min-h-[480px]"
        >

          {/* Tabs */}
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemI) => (
              <button
                type="button"
                key={itemI}
                onClick={() => setIndex(itemI)}
                className={`capitalize xl:text-lg relative cursor-pointer
                  after:content-[''] after:absolute after:left-0
                  after:-bottom-1 after:h-[2px] after:transition-all
                  after:duration-300
                  ${index === itemI
                    ? "text-accent after:w-full after:bg-accent"
                    : "text-white after:w-8 after:bg-white"
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Information */}
          <div className="py-2 xl:py-6 flex flex-col gap-y-4 xl:gap-y-5 items-center xl:items-start overflow-visible">

            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex flex-col md:flex-row max-w-full gap-x-2 items-center text-center text-white/60"
              >

                {/* Clickable certificate or experience text */}
                {item.file ? (
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.title} - ${item.stage}`}
                    className="group flex flex-col md:flex-row items-center gap-x-2 cursor-pointer transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    <span className="font-light mb-1 md:mb-0 group-hover:underline">
                      {item.title}
                    </span>

                    <span className="hidden md:inline">
                      -
                    </span>

                    <span className="text-sm group-hover:underline">
                      {item.stage}
                    </span>
                  </a>
                ) : (
                  <>
                    {/* Skill category title */}
                    <div className="font-light mb-2 md:mb-0">
                      {item.title}
                    </div>

                    <div className="hidden md:flex">
                      -
                    </div>
                  </>
                )}

                {/* Skill icons */}
                {item.icons && (
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 md:mt-0">
                    {item.icons.map(({ Icon, name }) => (
                      <div
                        key={name}
                        title={name}
                        aria-label={name}
                        className="text-2xl text-white"
                      >
                        <Icon />
                      </div>
                    ))}

                    {/* Antigravity IDE official logo */}
                    {item.extraIcons?.map((tool) => (
                      <div
                        key={tool.name}
                        title={tool.name}
                        aria-label={tool.name}
                        className="flex items-center"
                      >
                        <Image
                          src={tool.image}
                          alt={tool.name}
                          width={24}
                          height={24}
                        />
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
