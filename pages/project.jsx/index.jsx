
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsChevronDown,
  BsPlayCircleFill,
  BsX,
  BsBoxArrowUpRight,
} from "react-icons/bs";

import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

const projectSections = [
  {
    id: "project1",
    title: "Website Development and Deployment — SneakDup",
    step: "PROJECT 1",
    description:
      "A full-stack streetwear and sneaker e-commerce website featuring product catalogs, customer authentication, an administrative POS system, and Google Gemini AI sales analysis.",
    items: [
      {
        title: "SneakDup E-Commerce Website",
        content: [
          [
            "Project Overview",
            "Explore the SneakDup streetwear and footwear storefront, featuring dynamic product filtering, cart management, user authentication, and staff portals."
          ],
          [
            "Source Code",
            "Inspect the complete application architecture, database schemas, and administrative tooling on GitHub."
          ],
          [
            "Live Website",
            "Visit the deployed SneakDup website to test the responsive interface, store catalog, and user journeys."
          ]
        ],
        links: [
          {
            label: "View Website",
            url: process.env.NEXT_PUBLIC_SNEAKDUP_URL || "https://sneakdup-eight.vercel.app"
          },
          {
            label: "GitHub Repository",
            url: "https://github.com/abdulrahmanalsaafinwork-dot/Sneakdup"
          }
        ]
      }
    ]
  },
  {
    id: "project2",
    title: "Excel Data Cleaning and Analysis — Sales & Inventory",
    step: "PROJECT 2",
    description:
      "An interactive business intelligence analytics dashboard and Excel project showcasing data cleaning, KPIs, stock turnover, and executive findings.",
    items: [
      {
        title: "Professional Sales & Inventory Analyst",
        content: [
          [
            "Project Overview",
            "Explore the interactive analytics dashboard built directly from 500 sales transactions and inventory datasets."
          ],
          [
            "Interactive Dashboard",
            "Launch the web dashboard to interactively filter channels, inspect profit margins, track inventory velocity, and search orders."
          ],
          [
            "Excel Workbook",
            "Download the original formatted Excel workbook containing all raw tables, SUMIFS formulas, and pivot summaries."
          ]
        ],
        links: [
          {
            label: "View Excel",
            url: "/projects/sales-inventory-dashboard",
            internal: true
          },
          {
            label: "Download Excel",
            url: "/Professional_Sales_Inventory_Analyst.xlsx",
            download: true
          }
        ]
      }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Specialization — Equifax Case Study",
    step: "PROJECT 3",
    description:
      "A defensive cybersecurity case study examining the 2017 Equifax data breach, its vulnerabilities, causes, risks, and preventive security practices.",

    items: [
      {
        title: "1. Vulnerability Identification",
        content: [
          [
            "Case Background",
            "In 2017, Equifax, a major credit-reporting company, experienced a large-scale data breach that exposed sensitive personal and financial information belonging to millions of people."
          ],
          [
            "Identified Vulnerability",
            "The primary vulnerability was a known security weakness in Apache Struts, a software framework used by an Equifax web application. A security patch was available, but the affected system remained unpatched."
          ],
          [
            "Additional Weaknesses",
            "The incident also revealed inadequate verification of required security patches and poor protection of certain administrative credentials."
          ],
          [
            "Key Lesson",
            "Identifying vulnerabilities is not enough. Organizations must ensure that security updates are successfully installed and that security controls operate as intended."
          ]
        ]
      },

      {
        title: "2. How the Vulnerability Occurred",
        content: [
          [
            "Root Cause",
            "A known vulnerability in Apache Struts was not successfully remediated, leaving the affected web application exposed to attack."
          ],
          [
            "Failed Patch Management",
            "Equifax had been notified about the Apache Struts vulnerability and instructed its personnel to patch affected systems. However, the company did not properly verify that the patch had been applied to the vulnerable system."
          ],
          [
            "Contributing Factors",
            "Weak patch-management procedures, insufficient verification, and incomplete visibility into installed software can allow known vulnerabilities to remain exploitable."
          ],
          [
            "Key Lesson",
            "IT teams should maintain software inventories, track security updates, verify successful installation, and regularly check systems for unresolved vulnerabilities."
          ]
        ]
      },

      {
        title: "3. Risks and Impacts",
        content: [
          [
            "Scale of the Breach",
            "According to the Federal Trade Commission (FTC), the breach affected approximately 147 million people."
          ],
          [
            "Identity Theft",
            "Stolen personal information can be used for identity theft and other fraudulent activities."
          ],
          [
            "Financial Fraud",
            "Exposed financial or payment-card information may be misused for unauthorized transactions and fraud."
          ],
          [
            "Privacy Loss",
            "Sensitive personal information can be exposed to unauthorized parties, affecting the privacy and security of individuals."
          ],
          [
            "Reputational Damage",
            "Customers may lose confidence in an organization that fails to protect their personal information."
          ],
          [
            "Legal and Financial Consequences",
            "Organizations may face investigations, penalties, lawsuits, and expenses related to remediation and recovery."
          ],
          [
            "Exposed Information",
            "The exposed information included names, dates of birth, Social Security numbers, and payment-card information."
          ]
        ]
      },

      {
        title: "4. How Developers Can Prevent It",
        content: [
          [
            "Apply Security Patches Promptly",
            "Address known vulnerabilities within an appropriate risk-based timeframe to reduce opportunities for exploitation."
          ],
          [
            "Verify Patches",
            "Confirm that updates have actually been installed on every affected system instead of relying only on notifications or reports."
          ],
          [
            "Maintain Software Inventories",
            "Keep an accurate record of applications, frameworks, libraries, and versions running throughout the organization."
          ],
          [
            "Protect Credentials",
            "Never store administrative passwords or other sensitive credentials in plain text. Use appropriate secure storage and access controls."
          ],
          [
            "Apply Least Privilege",
            "Give user accounts and applications only the permissions they need to perform their tasks."
          ],
          [
            "Monitor Systems",
            "Review security logs and network activity to identify unusual behavior and potential intrusions."
          ],
          [
            "Test Security Controls",
            "Perform vulnerability scanning and security assessments regularly to identify weaknesses before attackers can exploit them."
          ]
        ]
      },

      {
        title: "5. Security Best Practices",
        content: [
          [
            "Regular Patch Management",
            "Fix known software vulnerabilities through a documented process for evaluating, applying, and verifying updates."
          ],
          [
            "Vulnerability Scanning",
            "Identify weaknesses in applications, systems, and infrastructure through regular security scans."
          ],
          [
            "Security Testing",
            "Detect security problems during development and before deploying applications into production."
          ],
          [
            "Credential Protection",
            "Protect passwords, keys, tokens, and administrative credentials against unauthorized access."
          ],
          [
            "Least-Privilege Access",
            "Limit the permissions granted to users and applications to reduce the impact of compromised accounts."
          ],
          [
            "Network Segmentation",
            "Separate network resources to reduce an attacker's ability to move through the network after an initial compromise."
          ],
          [
            "Security Monitoring",
            "Monitor systems for suspicious activity, unauthorized access, and potential intrusions."
          ],
          [
            "Incident Response Planning",
            "Establish a clear process for identifying, containing, investigating, and recovering from security incidents."
          ],
          [
            "Regular Security Audits",
            "Verify that security policies and controls are operating effectively and address any identified gaps."
          ],
          [
            "Security Awareness Training",
            "Help employees recognize security risks and understand their responsibilities in protecting organizational information."
          ]
        ]
      },

      {
        title: "6. Conclusion and Key Lessons",
        content: [
          [
            "Main Finding",
            "The 2017 Equifax data breach demonstrates how a known software vulnerability can lead to a major cybersecurity incident when patch management and security verification are inadequate."
          ],
          [
            "Lessons for IT Professionals",
            "Timely patching, vulnerability management, credential protection, least-privilege access, security monitoring, and incident response are essential components of defensive cybersecurity."
          ],
          [
            "Developer Responsibility",
            "Security should be considered throughout the software and system lifecycle rather than only after an incident occurs."
          ],
          [
            "Overall Conclusion",
            "Organizations must combine secure development practices, reliable maintenance procedures, effective monitoring, and regular verification to reduce the likelihood and impact of similar incidents."
          ]
        ]
      }
    ]
  },
  {
    id: "step17",
    title: "Problem-Solving Portfolio",
    step: "STEP 17",
    description:
      "Five IT troubleshooting cases demonstrating systematic diagnosis, solutions, and lessons learned across networking, computer performance, web applications, peripherals, and hardware.",

    items: [
      {
        title: "Case Study 1 — Computer Cannot Connect to Wi-Fi",
        content: [
          [
            "Problem",
            "The computer cannot connect to the available Wi-Fi network, or it connects but cannot access the internet."
          ],
          [
            "Possible Causes",
            "The Wi-Fi adapter may be disabled, the network driver may be outdated, IP or DNS settings may be incorrect, the router may have a problem, or the wireless signal may be weak."
          ],
          [
            "Diagnostic Procedure",
            "Check whether Wi-Fi is enabled and the correct network is selected. Test other devices on the same network, restart the computer or router if appropriate, inspect the adapter in Device Manager, and check IP configuration and connectivity."
          ],
          [
            "Solution",
            "Enable the adapter, reconnect to the correct network, restart the router if necessary, update or reinstall the network driver, and correct IP or DNS settings when required."
          ],
          [
            "Lesson Learned",
            "Determine whether the problem affects one computer or the entire network before changing settings. This helps identify whether the cause is local or network-related."
          ]
        ]
      },

      {
        title: "Case Study 2 — Computer Is Running Very Slowly",
        content: [
          [
            "Problem",
            "The computer takes a long time to start applications, responds slowly, or becomes unresponsive during normal use."
          ],
          [
            "Possible Causes",
            "Too many startup applications, excessive background processes, insufficient RAM, low storage space, malware, overheating, or a failing storage drive."
          ],
          [
            "Diagnostic Procedure",
            "Check CPU, memory, disk, and network usage in Task Manager. Review startup applications, inspect available storage, check cooling if overheating is suspected, run a trusted security scan, and check storage-drive health."
          ],
          [
            "Solution",
            "Disable unnecessary startup programs, close unneeded processes, free storage space, remove unwanted software, update the operating system and drivers, improve cooling if needed, and replace an unhealthy drive when diagnostics confirm failure."
          ],
          [
            "Lesson Learned",
            "Use resource monitoring and diagnostic evidence instead of immediately assuming that the computer needs more RAM."
          ]
        ]
      },

      {
        title: "Case Study 3 — Website or Web Application Will Not Load",
        content: [
          [
            "Problem",
            "A website or locally developed web application does not load correctly, displays an error, or shows a blank page."
          ],
          [
            "Possible Causes",
            "The web server may not be running, project configuration or file paths may be incorrect, the database may be unavailable, a port may be conflicting, application code may contain errors, or browser cache may cause issues."
          ],
          [
            "Diagnostic Procedure",
            "Read the browser error message, verify that the web server is running, inspect terminal and server logs, check the URL and port, test database connectivity when applicable, and inspect browser console and network errors."
          ],
          [
            "Solution",
            "Start the required server, correct configuration or file paths, resolve database connection problems, address port conflicts, fix the identified programming error, and clear cached data only when evidence indicates a browser-side issue."
          ],
          [
            "Lesson Learned",
            "Error messages and logs provide useful diagnostic evidence. Understand the cause before changing code to avoid introducing additional problems."
          ]
        ]
      },

      {
        title: "Case Study 4 — Printer Is Not Printing",
        content: [
          [
            "Problem",
            "A computer sends a document to a printer, but the printer does not print or remains stuck in the print queue."
          ],
          [
            "Possible Causes",
            "The printer may be offline or powered off, the wrong printer may be selected, paper or ink may be unavailable, print jobs may be stuck, the driver may be faulty, or the network connection may have failed."
          ],
          [
            "Diagnostic Procedure",
            "Check power, cables, paper, and printer status. Confirm the selected printer, inspect the print queue, print a test page, check the driver and device status, and verify network communication for network printers."
          ],
          [
            "Solution",
            "Restore the printer connection, correct paper or consumable problems, cancel stuck jobs, restart the print service when appropriate, update or reinstall the correct driver, and reconnect the printer if necessary."
          ],
          [
            "Lesson Learned",
            "Printing problems may involve hardware, software, or networking. Check simple physical causes before moving on to driver and operating-system troubleshooting."
          ]
        ]
      },

      {
        title: "Case Study 5 — Laptop Shows Screen Flickering",
        content: [
          [
            "Problem",
            "A laptop display repeatedly flickers, changes color, briefly goes black, or returns to normal after a few seconds."
          ],
          [
            "Possible Causes",
            "A graphics driver problem, loose or damaged display cable, faulty display panel, incorrect refresh-rate settings, overheating graphics hardware, or a software conflict."
          ],
          [
            "Diagnostic Procedure",
            "Observe whether flickering occurs before Windows loads or only after login. Connect an external monitor, update or roll back the graphics driver if appropriate, check display settings, test in Safe Mode when useful, and arrange qualified hardware inspection if necessary."
          ],
          [
            "Solution",
            "Correct display settings, update or roll back the graphics driver when appropriate, resolve software conflicts, and seek hardware inspection if the issue continues. A damaged cable or panel may require repair or replacement."
          ],
          [
            "Lesson Learned",
            "Testing with an external monitor and checking when flickering occurs can help distinguish software problems from hardware faults."
          ]
        ]
      }
    ]
  },
  {
    id: "step19",
    title: "AI Literacy Evidence",
    step: "STEP 19",
    description:
      "Evidence of responsible AI use, including assistance received, verification, and lessons learned.",
    items: [
      {
        title: "AI Usage Log",
        content: [
          [
            "Purpose",
            "This document records how AI tools supported the development of my portfolio and academic projects. AI was used for brainstorming, explanations, drafting, coding assistance, research organization, document preparation, and revision. Final decisions and verification remained my responsibility.",
          ],
          [
            "September 14, 2026",
            "Data analysis project and hard-copy preparation: AI helped organize the report, explain tables and findings, and prepare the PDF structure. I verified the Excel values, datasets, graphs, tables, findings, and recommendations against the original file.",
          ],
          [
            "September 15–21, 2026",
            "Development methodology, project documentation, data-analysis reports, and academic reviewers: AI helped organize requirements, explain formulas such as COUNTIF, and prepare readable documentation. I checked the content against the original project files and corrected formatting and table issues.",
          ],
          [
            "September 23–28, 2026",
            "Eos game and capstone materials: AI helped develop character descriptions, dialogue, motivations, and project documentation. I reviewed the results and revised content that did not match the intended game concept or character style.",
          ],
          [
            "October 7, 2026",
            "Next.js website development and project file management: AI provided coding explanations, troubleshooting guidance, and advice about managing project files and node_modules. I tested the project, checked the file structure, and decided what to retain in my backup.",
          ],
          [
            "October 8, 2026",
            "Cybersecurity specialization case study: AI helped organize the Equifax data-breach case around the required questions about vulnerabilities, causes, risks, prevention, and security practices. I reviewed the case structure and checked that the recommendations focused on defensive cybersecurity.",
          ],
        ],
      },
      {
        title: "How AI Helped",
        content: [
          [
            "Assistance",
            "AI helped me organize ideas, turn assignment requirements into formal documentation, explain technical concepts, troubleshoot code, prepare academic materials, and structure project information. It also helped me identify possible approaches when I was unsure how to begin a task.",
          ],
          [
            "Portfolio Development",
            "AI supported several portfolio activities, including data analysis, project documentation, website development, cybersecurity research, and the preparation of academic PDFs. This assistance helped me work more efficiently and present information in a clearer format.",
          ],
        ],
      },
      {
        title: "Verification and Limitations",
        content: [
          [
            "Verification",
            "I compared data-analysis values, tables, graphs, and findings with the original Excel file. For coding tasks, I tested the actual project and checked its file structure. For research and cybersecurity content, I reviewed whether the material answered the required questions and whether the recommendations were appropriate. I also checked formatting, wording, and project-specific details.",
          ],
          [
            "Formatting Errors",
            "AI-generated documents may contain excessive spacing, incorrect page breaks, or tables that require adjustment. I reviewed and corrected these issues before using the documents.",
          ],
          [
            "Technical Limitations",
            "AI may provide coding advice that appears correct but does not work in the actual project environment. I addressed this by running the project, observing the results, and checking the code and file structure.",
          ],
          [
            "Factual Limitations",
            "AI can misunderstand requirements, make factual mistakes, or provide information that needs confirmation. I reviewed the generated material and checked whether it matched the assignment requirements and available project information.",
          ],
          [
            "Required Corrections",
            "Some AI-generated content was too general, too detailed, or inconsistent with my intended style. I revised the output and requested corrections when necessary instead of accepting every suggestion automatically.",
          ],
        ],
      },
      {
        title: "Lessons Learned",
        content: [
          [
            "Learning",
            "I learned that AI is most useful as an assistant rather than a replacement for my own judgment. Providing clear instructions, relevant examples, and project details helps produce more useful results. Understanding the reason behind an answer is also important, especially in programming, cybersecurity, research, and data analysis.",
          ],
          [
            "Responsible Use",
            "I remain responsible for the accuracy, relevance, security, and quality of my final work. I review, test, correct, and adapt AI-assisted outputs according to the actual project requirements instead of assuming that every generated answer is correct.",
          ],
          [
            "Conclusion",
            "My experience showed me that responsible AI literacy requires both effective use and critical evaluation. AI can save time and improve understanding, but its outputs require human verification. I will continue using AI to support my learning while maintaining responsibility for my decisions and submissions.",
          ],
        ],
      },
    ],
  },
  {
    id: "step21",
    title: "Conduct the Mock Interview",
    step: "STEP 21",
    description:
      "A formal mock interview demonstrating communication skills, technical problem-solving, work ethic, and career aspirations as a BSIT student. Review the 12 interview questions and answers below, or watch the recorded mock interview video.",
    items: [
      {
        title: "1. Tell me about yourself.",
        content: [
          ["Question", "Tell me about yourself."],
          [
            "My Answer",
            "I am a BSIT student interested in web development, programming, and technology.",
          ],
        ],
      },
      {
        title: "2. Why did you choose BSIT?",
        content: [
          ["Question", "Why did you choose BSIT?"],
          [
            "My Answer",
            "I chose BSIT because I want to develop systems and solve problems using technology.",
          ],
        ],
      },
      {
        title: "3. What are your strongest IT skills?",
        content: [
          ["Question", "What are your strongest IT skills?"],
          [
            "My Answer",
            "My strongest skills are HTML, CSS, JavaScript, PHP, and basic database management.",
          ],
        ],
      },
      {
        title: "4. What is your weakest skill?",
        content: [
          ["Question", "What is your weakest skill?"],
          [
            "My Answer",
            "My weakness is advanced programming, but I am continuously improving through practice.",
          ],
        ],
      },
      {
        title: "5. Tell us about your major project.",
        content: [
          ["Question", "Tell us about your major project."],
          [
            "My Answer",
            "My major project is an e-commerce website for PC components with product, inventory, and order management.",
          ],
        ],
      },
      {
        title: "6. What was your biggest technical problem?",
        content: [
          ["Question", "What was your biggest technical problem?"],
          [
            "My Answer",
            "My biggest problem was connecting the website's frontend, backend, and database.",
          ],
        ],
      },
      {
        title: "7. How did you solve it?",
        content: [
          ["Question", "How did you solve it?"],
          [
            "My Answer",
            "I checked my code, researched solutions, and tested the system to fix errors.",
          ],
        ],
      },
      {
        title: "8. How do you handle deadlines?",
        content: [
          ["Question", "How do you handle deadlines?"],
          [
            "My Answer",
            "I prioritize tasks, manage my time, and complete important requirements first.",
          ],
        ],
      },
      {
        title: "9. How do you work with a team?",
        content: [
          ["Question", "How do you work with a team?"],
          [
            "My Answer",
            "I communicate clearly, share ideas, and respect everyone's responsibilities.",
          ],
        ],
      },
      {
        title: "10. Why should an organization hire you?",
        content: [
          ["Question", "Why should an organization hire you?"],
          [
            "My Answer",
            "I am responsible, willing to learn, and committed to improving my IT skills.",
          ],
        ],
      },
      {
        title: "11. What technology are you currently learning?",
        content: [
          ["Question", "What technology are you currently learning?"],
          [
            "My Answer",
            "I am improving my web development skills and learning more about AI tools and databases.",
          ],
        ],
      },
      {
        title: "12. Where do you want to develop professionally?",
        content: [
          ["Question", "Where do you want to develop professionally?"],
          [
            "My Answer",
            "I want to become a skilled web developer and build reliable, useful systems.",
          ],
        ],
      },
    ],
  },
  {
    id: "step23",
    title: "IT Career Development Plan",
    step: "STEP 23",
    description:
      "A detailed career roadmap focused on cybersecurity, including current skills, learning priorities, certifications, professional milestones, and plans for future master's-level study.",
    items: [
      {
        title: "Career Direction",
        content: [
          [
            "Career Goal",
            "My goal is to become a cybersecurity professional and eventually pursue a master's degree in cybersecurity or a closely related field. After completing my BSIT degree, I plan to gain practical IT and security experience before continuing my academic studies. I want to develop both technical and academic expertise so I can take on more advanced cybersecurity responsibilities in the future.",
          ],
          [
            "Target Position",
            "Entry-level Cybersecurity Analyst or Security Operations Center (SOC) Analyst, with the long-term goal of progressing into advanced cybersecurity roles.",
          ],
          [
            "Target IT Field",
            "Cybersecurity, particularly defensive security, security monitoring, vulnerability management, incident response, and secure systems.",
          ],
        ],
      },
      {
        title: "Current Skills and Areas for Improvement",
        content: [
          [
            "Current Skills",
            "My current skills include basic web development using HTML, CSS, and JavaScript; programming fundamentals; database concepts and SQL; basic networking concepts; troubleshooting; documentation; data analysis; and using AI as a productivity and learning tool.",
          ],
          [
            "Skills to Improve",
            "I plan to improve my knowledge of networking and TCP/IP, Linux administration, system security, vulnerability assessment, incident response, security monitoring, authentication and access control, scripting and automation, and cybersecurity risk management.",
          ],
        ],
      },
      {
        title: "Technologies and Certifications",
        content: [
          [
            "Technologies to Learn",
            "I plan to study Linux, Wireshark, Nmap, SIEM platforms, Python for security automation, Git and GitHub, virtual machines, cloud security fundamentals, firewalls, vulnerability-scanning tools, and security logging and monitoring technologies.",
          ],
          [
            "Certifications to Consider",
            "CompTIA Security+ is one of my initial certification goals. As I gain more knowledge and practical experience, I may consider CompTIA CySA+, ISC2 certifications, or other recognized credentials that match my career direction.",
          ],
          [
            "Practical Learning",
            "I will strengthen my understanding through hands-on labs, security exercises, networking practice, virtual machines, personal projects, and defensive cybersecurity activities. I will focus on understanding and applying security concepts instead of relying only on theoretical study.",
          ],
        ],
      },
      {
        title: "Career Milestones",
        content: [
          [
            "6-Month Goal",
            "Build a stronger cybersecurity foundation by studying networking, Linux, security fundamentals, and defensive security. Complete practical labs and small security exercises, organize a cybersecurity portfolio, and begin preparing for an entry-level security certification.",
          ],
          [
            "1-Year Goal",
            "Obtain or actively pursue an entry-level IT or cybersecurity position or internship. Strengthen my hands-on security experience, complete relevant projects and labs, and prepare for or begin a recognized cybersecurity certification.",
          ],
          [
            "3-Year Professional Goal",
            "Become an established cybersecurity professional with practical work experience and begin or complete a master's degree in cybersecurity or a related field, depending on my career progress and educational opportunities. Develop deeper expertise in security operations, incident response, defensive security, or another specialized area.",
          ],
          [
            "Long-Term Goal",
            "Continue advancing in cybersecurity, take on greater security responsibilities, and pursue master's-level education to develop deeper technical knowledge, research skills, and professional expertise.",
          ],
        ],
      },
      {
        title: "Personal Development Strategy",
        content: [
          [
            "Development Plan",
            "I will follow a gradual career path by strengthening my BSIT foundation, gaining hands-on cybersecurity experience, earning relevant certifications, building professional experience, and eventually pursuing master's-level study.",
          ],
          [
            "Portfolio Development",
            "I will use my portfolio to document cybersecurity projects, practical labs, troubleshooting cases, research, and evidence of my developing technical skills. This will help demonstrate my progress and provide examples of my work when applying for future opportunities.",
          ],
          [
            "Learning Approach",
            "I will prioritize practical understanding rather than collecting certifications without experience. I will continuously evaluate my progress, identify weaknesses, and adjust my learning plan according to industry requirements and my professional interests.",
          ],
        ],
      },
      {
        title: "Career Vision",
        content: [
          [
            "Professional Vision",
            "My ultimate goal is to become a knowledgeable and capable cybersecurity professional who can protect systems, identify security risks, respond to incidents, and help organizations improve their security practices.",
          ],
          [
            "Future Education",
            "Pursuing a master's degree in cybersecurity or a related field will support my long-term goals by helping me develop deeper technical knowledge, research ability, and advanced professional skills.",
          ],
          [
            "Conclusion",
            "I understand that building a career in cybersecurity requires continuous learning, practical experience, patience, and adaptability. By improving my current IT skills, completing hands-on security activities, gaining professional experience, and pursuing further education, I aim to build a sustainable career in cybersecurity.",
          ],
        ],
      },
    ],
  },
  {
    id: "step24",
    title: "Final Reflection",
    step: "STEP 24",
    description:
      "A personal reflection on my BSIT journey, the projects I completed, the challenges I overcame, the skills I developed, and my future career goals.",
    items: [
      {
        title: "My Learning Journey",
        content: [
          [
            "Where I Started",
            "Before entering the BSIT program, my understanding of Information Technology was mostly centered on computers, software, websites, and the basic use of technology. I knew that IT involved programming and computer systems, but I did not fully understand how many different areas were connected. I had a general interest in technology, but I had not yet experienced the complete process of planning, developing, troubleshooting, documenting, and presenting IT projects.",
          ],
          [
            "What I Learned",
            "One of the most important things I learned during BSIT is that IT is much broader than programming. I gained knowledge in databases, web development, networking, data analysis, system troubleshooting, cybersecurity, project development, documentation, and responsible technology use. I also learned to approach problems systematically by identifying the issue, considering possible causes, gathering evidence, testing solutions, and verifying the results. This problem-solving mindset is one of the most valuable skills I gained from the program.",
          ],
        ],
      },
      {
        title: "Major Projects and Experiences",
        content: [
          [
            "Web Development",
            "The project experience that taught me the most was web development because it required me to combine several technical skills. Building and improving websites helped me understand how frontend components, backend logic, databases, project files, and development tools work together. I also learned about managing dependencies, troubleshooting errors, checking project structures, and making sure that changes worked correctly.",
          ],
          [
            "Project Development",
            "Working on different IT projects taught me that creating an application involves more than writing code. A successful project requires planning, testing, organization, documentation, and continuous improvement. I learned to pay attention to project requirements and make adjustments when the actual results did not match what I intended to achieve.",
          ],
          [
            "Skills Applied",
            "Throughout my projects, I applied programming fundamentals, web development, database concepts, troubleshooting, technical documentation, research, and project organization. These experiences helped me connect what I learned in class with practical development tasks and made me more comfortable working with unfamiliar technologies.",
          ],
        ],
      },
      {
        title: "Challenges and Solutions",
        content: [
          [
            "Technical Challenges",
            "One of my biggest challenges was troubleshooting problems in development projects. Sometimes an issue was not caused by the part of the code I was currently examining. Finding the actual cause required checking configurations, dependencies, files, and the development environment. These situations could be frustrating, especially when the solution was not immediately clear.",
          ],
          [
            "Problem-Solving Approach",
            "I learned to troubleshoot step by step instead of changing everything at once. I started paying closer attention to error messages, checking related files and configurations, testing possible solutions, and verifying the results after making changes. I realized that error messages can provide useful information that helps identify the source of a problem.",
          ],
          [
            "Lessons from Challenges",
            "These experiences taught me patience, attention to detail, and persistence. I also learned that asking for guidance and using available learning resources can help me understand unfamiliar concepts. However, I still need to examine and test suggested solutions instead of assuming they will automatically work in my project.",
          ],
        ],
      },
      {
        title: "Skills and Personal Development",
        content: [
          [
            "Skills Developed",
            "My skills have improved significantly since I started BSIT. I am now more comfortable with programming concepts, web development, databases, troubleshooting, technical documentation, and project organization. I have also become better at analyzing technical problems, communicating possible solutions, and learning unfamiliar technologies through research and practice.",
          ],
          [
            "Responsible Use of AI",
            "I have learned to use AI tools as assistants for brainstorming, explanations, coding support, troubleshooting guidance, and documentation. At the same time, I understand the importance of verifying the results, testing code, reviewing generated information, and making my own decisions. This experience taught me that AI can support learning, but I remain responsible for the accuracy and quality of my work.",
          ],
          [
            "Areas for Improvement",
            "I still want to strengthen my knowledge of networking, Linux, cybersecurity, scripting, system administration, and security monitoring. I also want to improve my ability to work with larger and more complex systems. I understand that graduating from BSIT does not mean my learning is finished because technology continues to change and requires continuous study and practice.",
          ],
        ],
      },
      {
        title: "Future Career Goals",
        content: [
          [
            "Career Direction",
            "The IT professional I want to become is a cybersecurity professional. I am especially interested in defensive cybersecurity, where I can help protect systems, identify vulnerabilities, monitor threats, respond to incidents, and improve security practices. I want to build the technical knowledge and practical experience needed to contribute to an organization's security.",
          ],
          [
            "Professional Development",
            "I plan to begin with an entry-level IT or cybersecurity position, gain real-world experience, learn from experienced professionals, and continue improving my technical skills. I also intend to study relevant cybersecurity technologies, complete practical exercises, and pursue certifications that align with my career direction.",
          ],
          [
            "Long-Term Education",
            "In the long term, I want to pursue a master's degree in cybersecurity or a closely related field. I believe further education can help me develop deeper technical knowledge, research ability, and specialized expertise. My goal is to combine practical professional experience with continuous learning and advanced study.",
          ],
        ],
      },
      {
        title: "My Final Reflection",
        content: [
          [
            "Personal Reflection",
            "I believe I am now better prepared to begin my IT career because BSIT has given me more than technical knowledge. It has taught me how to learn, troubleshoot, adapt, document my work, and take responsibility for the quality of my results. Although there are still many things I need to learn, I have become more confident in facing technical challenges and finding ways to improve.",
          ],
          [
            "Conclusion",
            "My BSIT journey has provided me with a foundation that I can continue building throughout my professional life. I understand that an IT career requires patience, responsibility, practical experience, and a willingness to keep learning. I am ready to take the next step by gaining professional experience, strengthening my cybersecurity skills, and working toward my long-term goal of becoming a cybersecurity professional with a master's degree. For me, graduation is not the end of learning but the beginning of a new stage of personal and professional development.",
          ],
        ],
      },
    ],
  },

  {
    id: "step25",
    title: "Skills Inventory",
    step: "SKILL LEVELS",
    description:
      "An overview of my current technical skills and self-assessed proficiency levels as a BSIT student.",
    items: [
      {
        title: "View My Technical Skills",
        content: [
          [
            "Overview",
            "This skills inventory presents my current knowledge of programming, web development, databases, cybersecurity, networking, data analysis, development tools, cloud deployment, and AI tools. The proficiency levels represent my current self-assessment and the areas I am continuing to develop."
          ]
        ]
      }
    ]
  },

];

const Project = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setVideoModalOpen(false);
      }
    };
    if (videoModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videoModalOpen]);

  const toggleSection = (id) => {
    setActiveSection((current) => (current === id ? null : id));
    setActiveItem({});
  };

  const toggleItem = (sectionId, itemIndex) => {
    setActiveItem((current) => ({
      ...current,
      [sectionId]: current[sectionId] === itemIndex ? null : itemIndex,
    }));
  };

  return (
    <div className="project-page relative min-h-screen bg-primary/30 py-28 md:py-32">
      <Circles />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            My BSIT Journey
          </p>

          <h1 className="h1 mb-5">
            Project <span className="text-accent">Portfolio.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-white/70">
            Explore my troubleshooting cases, cybersecurity study, project
            documentation, AI literacy, mock interview, career plan, and final reflection.
            Open a section and select a topic to explore its contents.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mx-auto flex max-w-4xl flex-col gap-4"
        >
          {projectSections.map((section, sectionIndex) => {
            const isOpen = activeSection === section.id;

            return (
              <motion.section
                key={section.id}
                layout
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${isOpen
                  ? "border-accent/60 bg-primary/80"
                  : "border-white/10 bg-primary/40 hover:border-white/30"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-xs font-bold tracking-wider text-accent">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {section.step}
                    </span>

                    <span className="block text-base font-semibold text-white sm:text-lg">
                      {section.title}
                    </span>

                    <span className="mt-1 block text-sm text-white/50">
                      {section.items.length} topics
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0 text-accent"
                  >
                    <BsChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="section-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.22 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                        <p className="mb-5 text-sm leading-7 text-white/60">
                          {section.description}
                        </p>

                        <div className="flex flex-col gap-3">
                          {section.items.map((item, itemIndex) => {
                            const itemIsOpen =
                              activeItem[section.id] === itemIndex;

                            return (
                              <div
                                key={item.title}
                                className="overflow-hidden rounded-xl border border-white/10 bg-black/10"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleItem(section.id, itemIndex)
                                  }
                                  aria-expanded={itemIsOpen}
                                  className="flex w-full items-center gap-3 px-4 py-4 text-left"
                                >
                                  <span className="min-w-0 flex-1 text-sm font-medium text-white/90 sm:text-base">
                                    {item.title}
                                  </span>

                                  <motion.span
                                    animate={{
                                      rotate: itemIsOpen ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="shrink-0 text-accent"
                                  >
                                    <BsChevronDown size={16} />
                                  </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                  {itemIsOpen && (
                                    <motion.div
                                      key="item-content"
                                      initial={{
                                        height: 0,
                                        opacity: 0,
                                        y: -6,
                                      }}
                                      animate={{
                                        height: "auto",
                                        opacity: 1,
                                        y: 0,
                                      }}
                                      exit={{
                                        height: 0,
                                        opacity: 0,
                                        y: -6,
                                      }}
                                      transition={{
                                        height: {
                                          duration: 0.28,
                                          ease: "easeInOut",
                                        },
                                        opacity: { duration: 0.2 },
                                        y: { duration: 0.2 },
                                      }}
                                      className="overflow-hidden"
                                    >
                                      <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-4">
                                        {item.content.map(([label, text]) => (
                                          <div
                                            key={label}
                                            className="flex flex-col gap-1 sm:flex-row sm:gap-5"
                                          >
                                            <h4 className="w-full shrink-0 text-xs font-semibold uppercase tracking-wider text-accent sm:w-36">
                                              {label}
                                            </h4>

                                            <p className="min-w-0 flex-1 text-sm leading-6 text-white/65">
                                              {text}
                                            </p>
                                          </div>
                                        ))}

                                        {item.links &&
                                          item.links.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-3">
                                              {item.links.map((link) =>
                                                link.internal ? (
                                                  <Link
                                                    key={link.label}
                                                    href={link.url}
                                                    className="inline-flex items-center justify-center rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                                                  >
                                                    {link.label}
                                                  </Link>
                                                ) : (
                                                  <a
                                                    key={link.label}
                                                    href={link.url}
                                                    target={link.download ? undefined : "_blank"}
                                                    rel="noopener noreferrer"
                                                    download={
                                                      link.download
                                                        ? true
                                                        : undefined
                                                    }
                                                    className="inline-flex items-center justify-center rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                                                  >
                                                    {link.label}
                                                  </a>
                                                )
                                              )}
                                            </div>
                                          )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>

                        {/* Download PDF button for Project 3 */}
                        {section.id === "cybersecurity" && (
                          <div className="mt-6 flex justify-center">
                            <a
                              href="/Project_3_Cybersecurity_Equifax_Case_Study.pdf"
                              download
                              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                            >
                              Download Full Case Study PDF
                            </a>
                          </div>
                        )}

                        {section.id === "step17" && (
                          <div className="mt-6 flex justify-center">
                            <a
                              href="/Step_17_Problem_Solving_Portfolio_Abdulrahman_Alsaafin.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                            >
                              View Full Problem-Solving PDF
                            </a>
                          </div>
                        )}
                        {section.id === "step19" && (
                          <div className="mt-6 flex justify-center">
                            <a
                              href="/Step_19_AI_Literacy_Evidence_Abdulrahman_Alsaafin.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                            >
                              View Full AI Literacy PDF
                            </a>
                          </div>
                        )}

                        {section.id === "step21" && (
                          <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => setVideoModalOpen(true)}
                              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                            >
                              <BsPlayCircleFill size={18} />
                              Watch Interview
                            </button>
                          </div>
                        )}

                        {section.id === "step23" && (
                          <div className="mt-6 flex justify-center">
                            <a
                              href="/Step_23_IT_Career_Development_Plan_Abdulrahman_Alsaafin.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                            >
                              View Full Career Plan PDF
                            </a>
                          </div>
                        )}

                        {section.id === "step24" && (
                          <div className="mt-6 flex justify-center">
                            <a
                              href="/Step_24_Final_Reflection_Abdulrahman_Alsaafin.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-accent"
                            >
                              View Full Final Reflection PDF
                            </a>
                          </div>
                        )}

                        {section.id === "step25" && (
                          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-primary/60">
                            <div className="border-b border-white/10 px-4 py-4">
                              <h3 className="text-lg font-bold text-white">
                                Technical Skills <span className="text-accent">Inventory</span>
                              </h3>
                              <p className="mt-1 text-sm leading-6 text-white/50">
                                My current skills and proficiency levels.
                              </p>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[560px] text-left">
                                <thead>
                                  <tr className="border-b border-white/10 bg-white/5">
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-accent">
                                      Area
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-accent">
                                      Skill
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-accent">
                                      Proficiency
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {[
                                    { area: "Programming", skill: "Programming Fundamentals", level: "Intermediate", progress: 65 },
                                    { area: "Web Development", skill: "HTML / CSS", level: "Intermediate", progress: 75 },
                                    { area: "Web Development", skill: "JavaScript", level: "Intermediate", progress: 65 },
                                    { area: "Database", skill: "SQL / MySQL", level: "Intermediate", progress: 65 },
                                    { area: "Tools", skill: "Git / GitHub", level: "Beginner", progress: 25 },
                                    { area: "Cybersecurity", skill: "Security Fundamentals", level: "Intermediate", progress: 65 },
                                    { area: "Networking", skill: "Networking Fundamentals", level: "Beginner", progress: 35 },
                                    { area: "Data Analysis", skill: "Excel / Data Analysis", level: "Intermediate", progress: 85 },
                                    { area: "Cloud", skill: "Deployment / Hosting", level: "Beginner", progress: 35 },
                                    { area: "AI", skill: "AI Tools / Responsible AI Use", level: "Intermediate", progress: 65 },
                                  ].map((item) => (
                                    <tr
                                      key={item.skill}
                                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                                    >
                                      <td className="px-4 py-4 text-sm text-white/60">
                                        {item.area}
                                      </td>

                                      <td className="px-4 py-4 text-sm font-medium text-white">
                                        {item.skill}
                                      </td>

                                      <td className="px-4 py-4">
                                        <div className="min-w-[150px]">
                                          <div className="mb-2 flex items-center justify-between gap-3">
                                            <span
                                              className={`text-xs font-semibold ${item.level === "Intermediate"
                                                ? "text-accent"
                                                : "text-white/60"
                                                }`}
                                            >
                                              {item.level}
                                            </span>

                                            <span className="text-xs text-white/40">
                                              {item.progress}%
                                            </span>
                                          </div>

                                          <div
                                            className="h-2.5 w-full overflow-hidden rounded-full bg-white/10"
                                            role="progressbar"
                                            aria-label={`${item.skill} proficiency`}
                                            aria-valuenow={item.progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                          >
                                            <div
                                              className="h-full rounded-full bg-accent transition-all duration-500"
                                              style={{ width: `${item.progress}%` }}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="border-t border-white/10 px-4 py-3">
                              <p className="text-xs leading-5 text-white/40">
                                Progress bars are visual representations of self-assessed proficiency,
                                not formal test scores or certifications.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-10 text-center"
        >
          <p className="text-sm text-white/40">
            Learning, troubleshooting, and growing as an IT professional.
          </p>
        </motion.div>
      </div>

      {/* Video Modal for Mock Interview */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-accent/40 bg-[#0e1017] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <BsPlayCircleFill size={22} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      STEP 21 — Mock Interview
                    </span>
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      Mock Interview Video Recording
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/mock.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-all duration-200 hover:border-accent hover:text-white"
                    title="Open video in a new tab"
                  >
                    <BsBoxArrowUpRight size={13} />
                    <span className="hidden sm:inline">New Tab</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white"
                    aria-label="Close video modal"
                  >
                    <BsX size={24} />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative flex flex-1 items-center justify-center bg-black p-2 sm:p-4">
                <video
                  src="/mock.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[62vh] w-full rounded-lg object-contain shadow-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Footer info */}
              <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 bg-primary/40 px-5 py-3 text-xs text-white/60 sm:flex-row sm:px-6">
                <span>BSIT Mock Interview — 12 Technical & Behavioral Questions</span>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="font-semibold text-accent hover:underline"
                >
                  Close Video
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;