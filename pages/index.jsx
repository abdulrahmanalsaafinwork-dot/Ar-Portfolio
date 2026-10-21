import { motion } from "framer-motion";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import ResumeBtn from "../components/ResumeBtn";
import Avatar from "../components/Avatar";

import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full">
      {/* text */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">

          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Refining Chaos <br /> Into{" "}
            <span className="text-accent">Clear Insights</span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            I am a Full-Stack Developer, Data Analyst, and Hardware Systems
            Builder who specializes in turning complex technical problems into
            streamlined, reliable solutions. From crafting modern web
            interfaces and architecting backend databases to organizing,
            cleaning, and analyzing messy spreadsheet data, I transform raw
            noise into actionable results. Off the screen, I bring the same
            analytical precision to physical engineering, custom building PC
            setups, and prototyping smart hardware with Arduino.
          </motion.p>

          {/* buttons - mobile */}
          <div className="flex justify-center xl:hidden relative z-20 gap-6">
            <ProjectsBtn />
            <ResumeBtn />
          </div>

          {/* buttons - desktop */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex gap-6 relative z-20"
          >
            <ProjectsBtn />
            <ResumeBtn />
          </motion.div>
        </div>
      </div>

      {/* image */}
      <div className="w-[1280px] h-full absolute right-0 bottom-0">

        {/* bg img */}
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />

        {/* particles */}
        <ParticlesContainer />

        {/* avatar */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;