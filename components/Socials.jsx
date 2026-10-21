import Link from "next/link";

import {
  RiGithubLine,
  RiLinkedinLine,
  RiMailLine,
} from "react-icons/ri";

export const socialData = [

  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/abdulrahman-alsaafin-357898441/",
    Icon: RiLinkedinLine,
  },
  {
    name: "Email",
    link: "mailto:abdulrahmahman.alsaafin.work@gmail.com",
    Icon: RiMailLine,
  },
    {
    name: "Github",
    link: "https://github.com/abdulrahmanalsaafinwork-dot",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target={social.name === "Email" ? "_self" : "_blank"}
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-[5px] hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;