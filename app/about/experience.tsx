"use client";

import React from "react";
import { motion } from "framer-motion";

// Define interfaces for the data structure
interface PSIStatement {
  problem: string;
  solution: string;
  impact: string;
}

interface ExperienceDetail {
  type: 'psi' | 'text'; // 'psi' for Problem-Solution-Impact, 'text' for general text
  content: string | PSIStatement;
}

interface ExperienceEntry {
  role: string;
  company: string;
  locationAndDates: string;
  summary?: string; // Optional summary line
  details: ExperienceDetail[];
  keyTechnologies?: string;
  majorAchievements?: ExperienceDetail[]; // For specific achievements/additional sections
  additionalText?: string; // For special text like "Beyond CAD, I also managed local IT support:"
  keyResults?: string; // For key results summary
}

// Data for professional experience
const experienceData: ExperienceEntry[] = [
  {
    role: "SENIOR .NET DEVELOPER | AI | CAD SME",
    company: "Habasit America",
    locationAndDates: "Suwannee, GA (2024 – Present)",
    summary: "Industry-leading manufacturing transformation: Orchestrated end-to-end digitalization of engineering workflows, quadrupling output, and setting a new standard for product data automation.",
    details: [
      { type: 'psi', content: { problem: "Manual engineering workflows resulted in low drawing throughput.", solution: "Spearheaded digital transformation of special build plastic modular belt engineering, leveraging .NET, C#, and SolidWorks API.", impact: "Quadrupled drawing throughput (from 8 to 30+ per day), setting a new benchmark for efficiency." }},
      { type: 'psi', content: { problem: "Manual data entry errors and inconsistent drawing packs.", solution: "Built and deployed a Blazor-based Drawing Number Generator and automated request processing tools.", impact: "Reduced manual entry errors and standardized drawing packs, improving data accuracy and consistency." }},
      { type: 'psi', content: { problem: "Repetitive manual extraction of drawing parameters from CRM and emails.", solution: "Integrated AI-powered parsing (LLM/ChatGPT) to automate parameter extraction.", impact: "Eliminated repetitive data entry, significantly accelerating the design process." }},
      { type: 'psi', content: { problem: "Lack of clear visibility into process bottlenecks and efficiency.", solution: "Designed custom dashboards (Power BI, Chart.js) for KPI reporting and bottleneck analysis.", impact: "Drove measurable efficiency gains and informed continuous process improvement initiatives." }},
      { type: 'psi', content: { problem: "Poor traceability and data governance with existing ERP system.", solution: "Led database migration and integration projects with Epicor ERP.", impact: "Improved traceability and data governance, ensuring more reliable and accessible enterprise data." }},
      { type: 'psi', content: { problem: "Inconsistent CAD and PDM standards hindering future migrations.", solution: "Collaborated with IT and engineering management to set and enforce CAD and PDM standards.", impact: "Supported a smoother future PDM migration and ensured consistency across design processes." }},
    ],
  },
  {
    role: "Senior Software Architect",
    company: "1path Systems",
    locationAndDates: "Atlanta, GA (Sep 2022 – Mar 2023)",
    summary: "Legacy ERP modernizer: Delivered modular API-first architecture and technical leadership that halved project delivery time for a mission-critical platform.",
    details: [
      { type: 'psi', content: { problem: "Mission-critical legacy ERP system (\"Atlas\") required modernization.", solution: "Led design and development of new modules and features, partnering closely with a compact team of 3 developers.", impact: "Successfully modernized and extended a crucial system, ensuring its continued relevance and functionality." }},
      { type: 'psi', content: { problem: "Outdated .NET Framework WinForms and ASP.NET Web Forms applications.", solution: "Modernized existing applications, introducing robust, scalable features.", impact: "Enhanced the system's ability to support evolving business needs and improve performance." }},
      { type: 'psi', content: { problem: "Disconnected enterprise systems and complex user access.", solution: "Engineered secure Web API integrations with single sign-on (SSO).", impact: "Streamlined user access across platforms and connected Atlas to other critical enterprise systems." }},
      { type: 'psi', content: { problem: "High technical debt and poor app performance due to legacy code.", solution: "Refactored legacy code and optimized SQL Server-backed data flows.", impact: "Significantly reduced technical debt and improved overall application performance." }},
      { type: 'psi', content: { problem: "Suboptimal user productivity and inconsistent UI/UX.", solution: "Implemented advanced UI/UX components (Infragistics).", impact: "Improved user productivity and interface consistency, enhancing the overall user experience." }},
      { type: 'psi', content: { problem: "Lack of clear documentation for onboarding and maintenance.", solution: "Authored comprehensive technical documentation in Markdown.", impact: "Streamlined onboarding for new developers and supported ongoing maintenance efforts." }},
      { type: 'psi', content: { problem: "Inefficient collaboration and release management processes.", solution: "Facilitated efficient collaboration and release management with Git, SourceTree, Code Compare, and Microsoft Teams.", impact: "Streamlined development workflows, including offshore coordination, for faster and more reliable releases." }},
      { type: 'psi', content: { problem: "Manual production deployments and hotfix management.", solution: "Managed production deployments, hotfixes, and customer-facing release notes.", impact: "Ensured minimal downtime and timely resolution of user issues, maintaining high system availability." }},
    ],
    keyTechnologies: "C#, VB.NET, .NET Framework 4.6.2, WinForms, ASP.NET Web Forms, Web APIs, SQL Server, JavaScript, TypeScript, jQuery, Infragistics, Git, SourceTree, Visual Studio, Teams.",
  },
  {
    role: "Sr. IT Applications Developer",
    company: "Daikin Applied",
    locationAndDates: "Minneapolis, MN (December 2021 – June 2022)",
    summary: "Industrial software guardian: Maintained, refactored, and API-enabled global legacy platforms, unlocking new automation for 500+ engineering users.",
    details: [
      { type: 'psi', content: { problem: "Complex suite of legacy .NET WinForms applications (\"Daikin Tools\") required primary ownership and development.", solution: "Served as primary owner and lead developer for these applications supporting critical engineering workflows.", impact: "Ensured the continuity and effective operation of business-critical tools." }},
      { type: 'psi', content: { problem: "Unreliable and difficult-to-maintain legacy codebases.", solution: "Modernized, refactored, and documented legacy codebases.", impact: "Improved reliability, performance, and maintainability of critical business applications used across the company." }},
      { type: 'psi', content: { problem: "Lack of secure and streamlined user access to applications.", solution: "Developed, maintained, and enhanced custom APIs and Web Forms integrations, introducing secure single sign-on (SSO).", impact: "Enabled streamlined user access and enhanced security for global users." }},
      { type: 'psi', content: { problem: "Managing on-premises SQL Server databases and IIS deployments.", solution: "Managed these critical infrastructure components and built data-driven features.", impact: "Supported engineering, operations, and analytics needs with reliable data services." }},
      { type: 'psi', content: { problem: "Inefficient CAD licensing management and library workflows.", solution: "Coordinated Autodesk (CAD) licensing management and introduced automation features for CAD library workflows.", impact: "Quickly ramped up on unfamiliar platforms (including VectorWorks) to drive efficiency for 500+ engineering users." }},
      { type: 'psi', content: { problem: "Production application issues causing downtime and user frustration.", solution: "Led troubleshooting, debugging, and hotfix delivery for production applications.", impact: "Ensured minimal downtime and fast resolution of user issues, maintaining business continuity." }},
      { type: 'psi', content: { problem: "Difficulty in translating operational needs into technical requirements.", solution: "Collaborated cross-functionally with business analysts, engineers, and directors.", impact: "Successfully translated operational needs into clear technical requirements and deliverables, ensuring alignment with business goals." }},
      { type: 'psi', content: { problem: "Need for full-lifecycle development and support with diverse technologies.", solution: "Leveraged C#, VB.NET, ASP.NET, JavaScript, TypeScript, DevExpress UI, Visual Studio, TortoiseSVN, and SourceTree.", impact: "Provided comprehensive development and support across the application lifecycle." }},
      { type: 'psi', content: { problem: "Need to foster team growth and knowledge sharing.", solution: "Provided mentorship to junior developers and facilitated team knowledge sharing.", impact: "Contributed to skill development and a collaborative environment in hybrid and remote settings." }},
    ],
    keyResults: "Achieved significant reduction in legacy app errors and improved uptime through targeted refactoring. Rolled out new API endpoints enabling smoother integrations and automation with engineering/CAD tools. Delivered on tight timelines for critical features and production fixes, earning positive feedback from stakeholders.",
  },
  {
    role: "Operations Technology Specialist",
    company: "Fry Reglet Corporation",
    locationAndDates: "Alpharetta, GA (Mar 2019 – Sep 2021)",
    summary: "AEC digital catalyst: Drove cloud-first business process automation across operations, enabling rapid estimation-to-delivery for national projects.",
    details: [
      { type: 'psi', content: { problem: "Inefficient manual processes across operations, engineering, and estimation.", solution: "Championed digital transformation initiatives, officially transitioning from CAD to .NET and cloud application development.", impact: "Enabled rapid estimation-to-delivery for national projects and significantly improved overall operational efficiency." }},
      { type: 'psi', content: { problem: "Lack of custom tools to automate unique business processes.", solution: "Led the full software development lifecycle for custom business apps, collaborating with Georgia Tech’s Twin Engines group and D3 Technologies (TX).", impact: "Designed, prototyped, and delivered scalable process automation tools." }},
      { type: 'psi', content: { problem: "Inconsistent code quality and collaborative development practices.", solution: "Pioneered collaborative programming and code reviews using GitHub and paired programming.", impact: "Built a foundation for a modern, agile dev team within the organization and fostered a culture of code collaboration." }},
      { type: 'psi', content: { problem: "Disconnected teams and inefficient implementation of technology solutions.", solution: "Partnered with cross-functional teams (sales, PM, engineering, customer service) to ideate, scope, and implement technology solutions.", impact: "Drove measurable gains in efficiency and project throughput across departments." }},
      { type: 'psi', content: { problem: "Lack of best practices for internal tool design, deployment, and support.", solution: "Transitioned from the engineering department into Information Systems.", impact: "Established best practices for internal tool design, deployment, and support, improving reliability and consistency." }},
    ],
    keyTechnologies: "C#, Python, Azure, Git, SQL, Autodesk Inventor, AutoCAD, Visual Studio, .NET, and cloud-first architectures.",
  },
  {
    role: "CAD Technical Manager",
    company: "Fry Reglet Corporation",
    locationAndDates: "Alpharetta, GA (Aug 2018 – Mar 2019)",
    summary: "Manufacturing automation leader: Drove design-library and automation standards for large-scale infrastructure projects.",
    details: [
      { type: 'psi', content: { problem: "Need for advanced design automation and custom CAD libraries for complex manufacturing projects.", solution: "Directed a team of designers and developers to deliver these solutions for projects (e.g., wall panel systems, airport renovations).", impact: "Significantly improved design efficiency and accuracy for large-scale infrastructure projects." }},
      { type: 'psi', content: { problem: "Inconsistent technical standards for 3D assembly modeling and data integration.", solution: "Oversaw technical standards for 3D assembly modeling, drawing automation, and data integration between engineering and manufacturing systems.", impact: "Ensured consistency and accuracy across design and production workflows." }},
      { type: 'psi', content: { problem: "Discrepancy between production requirements and CAD output.", solution: "Developed robust automation solutions using C#, VB.NET, and Python.", impact: "Ensured alignment between production requirements and CAD output, reducing errors and rework." }},
    ],
  },
  {
    role: "CAD Designer & Automation",
    company: "Fry Reglet Corporation",
    locationAndDates: "Alpharetta, GA (Aug 2017 – Aug 2018)",
    summary: "Production design automation specialist: Delivered high-precision CAD and laid the technical foundation for all future digital initiatives.",
    details: [
      { type: 'psi', content: { problem: "Manual creation of detailed 3D models and production drawings.", solution: "Delivered high-precision 3D models and production drawings for large-scale commercial and architectural projects.", impact: "Ensured accuracy and efficiency in complex design projects." }},
      { type: 'psi', content: { problem: "Repetitive manual drafting and drawing tasks.", solution: "Automated routine drafting and drawing tasks using Inventor iLogic, AutoCAD, VB.NET, and Excel VBA.", impact: "Laid the groundwork for process automation initiatives adopted company-wide, significantly increasing efficiency." }},
      { type: 'psi', content: { problem: "Lack of alignment between engineering, fabrication, and estimation teams.", solution: "Collaborated directly with these teams.", impact: "Ensured accurate, on-time project delivery by facilitating clear communication and coordination." }},
    ],
    majorAchievements: [
      { type: 'psi', content: { problem: "Ad-hoc engineering tools leading to inefficiencies.", solution: "Drove transition from ad-hoc engineering tools to standardized, cloud-integrated business apps.", impact: "Resulted in faster estimates and project launches." }},
      { type: 'psi', content: { problem: "Limited code collaboration and outdated software practices.", solution: "Fostered a culture of code collaboration and agile development.", impact: "Upskilled the department in modern software practices, improving team efficiency and code quality." }},
      { type: 'psi', content: { problem: "Siloed departmental solutions.", solution: "Successfully delivered cross-departmental solutions.", impact: "Solutions were adopted by sales, project management, and operations teams, improving overall business workflow." }},
    ],
  },
  {
    role: "Junior CAD Designer",
    company: "Fascinate LLC",
    locationAndDates: "Duluth, GA (2016 – 2017)",
    details: [
      { type: 'psi', content: { problem: "Needing efficient design and optimization for high-profile clients.", solution: "Designed and optimized product lines using AutoCAD, Inventor, and Mastercam for clients like Carnival Corporation and Samsung.", impact: "Reduced project lead times by 20% and ensured high-quality deliverables." }},
      { type: 'psi', content: { problem: "Translating creative concepts into manufacturable designs for live events.", solution: "Played a key role in set and stage design projects for live events and broadcast productions, leveraging creative fabrication and automation.", impact: "Enabled custom installations that met client specifications and safety requirements." }},
      { type: 'psi', content: { problem: "Ensuring designs were manufacturable and production workflows were efficient.", solution: "Worked closely with engineering and carpentry teams to translate design concepts into manufacturable products.", impact: "Enhanced production workflows and ensured designs met client specifications and safety requirements." }},
      { type: 'psi', content: { problem: "Need for custom components in quick-turnaround projects.", solution: "Assisted in fabricating custom components by detailing drawings for CNC and metalworking techniques (MIG/TIG welding, plasma cutting).", impact: "Met the specific needs of high-energy, quick-turnaround projects." }},
      { type: 'psi', content: { problem: "Inconsistent project documentation and drawing distribution.", solution: "Developed project documentation and distributed 2D and 3D drawings to internal teams and clients.", impact: "Ensured alignment between design and fabrication teams." }},
      { type: 'psi', content: { problem: "Maintaining consistency in project delivery with new designers.", solution: "Trained new CAD designers in company-specific design processes and software tools.", impact: "Maintained consistency and quality in project delivery." }},
    ],
  },
  {
    role: "CAD Drafter, Local FOB Administrator, Local IT Administrator",
    company: "Interroll Group",
    locationAndDates: "Hiram, GA (November 2015 – September 2016)",
    details: [
      { type: 'psi', content: { problem: "Need for accurate 2D drawings and 3D models.", solution: "Created detailed 2D drawings using AutoCAD Mechanical 2015 and developed 3D models and assemblies in Inventor 2015.", impact: "Provided precise visual and technical documentation for projects." }},
      { type: 'psi', content: { problem: "Inconsistent part and project tracking.", solution: "Developed part and project numbers using Product Stream and SYACC (ERP System).", impact: "Ensured accurate tracking of parts and projects." }},
      { type: 'psi', content: { problem: "Gaps in communication between engineering and production.", solution: "Collaborated closely with the engineering team to communicate project plans to production workers.", impact: "Ensured alignment between design and manufacturing, reducing errors." }},
      { type: 'psi', content: { problem: "Inefficient drawing archiving and distribution.", solution: "Converted DWG drawings to PDF files for archiving on the network drive and distribution.", impact: "Improved accessibility and distribution to internal teams and customers." }},
      { type: 'psi', content: { problem: "Inconsistent design standards with new drafters.", solution: "Trained new drafters and designers on software tools and company design standards.", impact: "Maintained consistency and quality in project delivery." }},
      { type: 'psi', content: { problem: "Ensuring parts met safety requirements.", solution: "Created parts to meet building safety requirements, such as electrical outlet covers.", impact: "Ensured compliance with safety regulations." }},
      { type: 'psi', content: { problem: "Distributing drawings to customers and providing technical support.", solution: "Distributed drawings to customers via email, answering questions and providing technical support.", impact: "Enhanced customer satisfaction and understanding of product designs." }},
    ],
    additionalText: "Beyond CAD, I also managed local IT support:",
    majorAchievements: [
      { type: 'psi', content: { problem: "Local user computer/network issues impacting productivity.", solution: "Provided IT administration services including network troubleshooting and hardware installation.", impact: "Managed and resolved local user computer/network issues, minimizing downtime." }},
      { type: 'psi', content: { problem: "Inefficient new employee onboarding for technology setup.", solution: "Imaged computers, installed user-specific software, and handled new employee orientations.", impact: "Ensured proper onboarding and technology setup for new hires." }},
      { type: 'psi', content: { problem: "Unmanaged building entry system.", solution: "Managed the local FOB system for building entry.", impact: "Created, deactivated, and distributed FOBS for employees, enhancing building security." }},
      { type: 'psi', content: { problem: "Inefficient budget tracking for IT procurement.", solution: "Retrieved quotes from vendors and confirmed receipts with finance and accounting.", impact: "Ensured accurate budget tracking for IT expenditures." }},
      { type: 'psi', content: { problem: "Suboptimal building security.", solution: "Implemented an 18+ camera surveillance system.", impact: "Significantly enhanced building security." }},
      { type: 'psi', content: { problem: "Need for continuous process improvement in production.", solution: "Assisted in implementing Kaizen process improvement strategies.", impact: "Optimized production workflows and improved overall efficiency." }},
    ],
  },
  {
    role: "CAD Technician, Engineering Department Assistant, Website Designer/Manager",
    company: "Carson Tool & Mold",
    locationAndDates: "Kennesaw, GA (February 2014 – December 2014)",
    details: [
      { type: 'psi', content: { problem: "Need for precise plastic part and mold designs.", solution: "Designed plastic parts and molds, creating 3D and 2D dimensional drawings for customer approval.", impact: "Ensured manufacturability and cost savings in design." }},
      { type: 'psi', content: { problem: "Complex manufacturing processes requiring high-precision molds.", solution: "Created high-precision molds using Pro/E Wildfire (PTC Creo).", impact: "Supported complex manufacturing processes with accurate designs." }},
      { type: 'psi', content: { problem: "Legacy 2D AutoCAD data hindering modern workflows.", solution: "Translated and converted legacy 2D AutoCAD data into SolidWorks/Pro E parts and drawings.", impact: "Streamlined data for CNC/EDM programmers and operators." }},
      { type: 'psi', content: { problem: "Optimizing design efficiency and production quality.", solution: "Conducted Undercut Analysis and Mold Flow Analysis.", impact: "Improved design efficiency and production quality." }},
      { type: 'psi', content: { problem: "Coordinating materials and supplies for prototype production.", solution: "Led prototype creation efforts, coordinating materials and supplies.", impact: "Ensured smooth and timely prototype creation." }},
      { type: 'psi', content: { problem: "Ensuring compliance with industry quality standards.", solution: "Contributed to an ISO 9001 audit.", impact: "Ensured compliance with industry standards." }},
      { type: 'psi', content: { problem: "Outdated company website and manual forms.", solution: "Managed and maintained the company’s website, developing new content and creating company forms and documents.", impact: "Improved online presence and operational efficiency." }},
      { type: 'psi', content: { problem: "Need for various machinery operations to support production.", solution: "Operated various machinery including mills, grinders, sandblasters, and \"hole poppers.\"", impact: "Supported production needs effectively." }},
      { type: 'psi', content: { problem: "Toolmakers and machinists struggling with CAD drawing interpretation.", solution: "Provided IT support, organized project files with Dropbox, upgraded software/OS, and assisted toolmakers/machine shop workers in interpreting CAD drawings.", impact: "Ensured precise execution and improved workflow." }},
      { type: 'psi', content: { problem: "Lack of professional marketing materials.", solution: "Created marketing materials including an ad for the American Mold Builder Association catalog and improved the Carson Tool & Mold PowerPoint presentation.", impact: "Enhanced company's professional image and marketing outreach." }},
      { type: 'psi', content: { problem: "Inefficient document accessibility and distribution.", solution: "Converted company documents into PDF forms.", impact: "Improved accessibility and distribution." }},
    ],
  },
  {
    role: "CAD Technician, Website Manager, IT Technician, Project Assistant Manager, Website Designer",
    company: "Essential Dental Care & Sapian R&D",
    locationAndDates: "Grand Prairie, TX (November 2012 – January 2014)",
    details: [
      { type: 'psi', content: { problem: "Developing surgical dental instruments.", solution: "Designed CAD models for surgical dental instruments using SolidWorks.", impact: "Played a key role in the development of the Sapian Root Remover Kit, a recognized dental tool." }},
      { type: 'psi', content: { problem: "Ensuring design, production, assembly, and fulfillment adhere to regulatory compliance.", solution: "Communicated with manufacturers.", impact: "Ensured compliance and smooth product delivery." }},
      { type: 'psi', content: { problem: "Need for rapid prototype creation.", solution: "Led prototype creation efforts.", impact: "Supported the development of cutting-edge dental tools." }},
      { type: 'psi', content: { problem: "Maintaining smooth office operations and data security.", solution: "Provided IT support, managed the office's data backup system.", impact: "Ensured smooth operations of all technical systems and data integrity." }},
      { type: 'psi', content: { problem: "Limited online presence and customer engagement.", solution: "Developed and maintained the company's websites, Essentialdentalcare.com and Sapianrd.com.", impact: "Improved online presence and customer engagement." }},
      { type: 'psi', content: { problem: "Managing research and development data.", solution: "Managed and maintained a custom database used to oversee Sapian Research and Development.", impact: "Supported R&D efforts for a recognized dental product." }},
      { type: 'psi', content: { problem: "Coordinating with cross-functional teams for project completion.", solution: "Contributed to project management by coordinating with cross-functional teams.", impact: "Ensured timely completion of tasks and smooth project flow." }},
    ],
  },
  {
    role: "CAD Technician, Material Consultant, Project Manager",
    company: "Nimiety Bio Company",
    locationAndDates: "Grand Prairie, TX (November 2012 – 2013)",
    details: [
      { type: 'psi', content: { problem: "Designing specialized instruments for gas testing.", solution: "Specialized in prototype creation using Pro-e Wildfire 5 and SolidWorks 2012.", impact: "Successfully designed specialized instruments to test gases in substances." }},
      { type: 'psi', content: { problem: "Leading a small team on complex design projects.", solution: "Led a team of 3 employees.", impact: "Oversaw the design and development of specialized instruments for gas testing projects." }},
      { type: 'psi', content: { problem: "Ensuring proper material selection and efficient project workflow.", solution: "Responsible for material selection, sourcing manufacturers, and managing project files.", impact: "Ensured organized and efficient workflow and optimal material choices." }},
      { type: 'psi', content: { problem: "Guiding projects to completion effectively.", solution: "Played a key role in guiding the project to completion.", impact: "Successfully managed timelines, resources, and technical deliverables." }},
    ],
  },
  {
    role: "AI, AGENTIC SYSTEMS & EMERGING TECHNOLOGIES",
    company: "Self-Study & Open Source",
    locationAndDates: "(2020 – Present)",
    details: [
      { type: 'psi', content: { problem: "Rapid evolution of AI/LLM technologies requires continuous learning and practical application.", solution: "Dedicated 1,000+ hours to independent study and rapid prototyping across the latest AI, LLM, and automation trends.", impact: "Translated self-learning into real-world results and cutting-edge awareness." }},
      { type: 'psi', content: { problem: "Implementing and improving AI workflows with various models.", solution: "Researched, implemented, and iteratively improved workflows using OpenAI (GPT-3/4, DALL·E), Google Gemini, Grok, Anthropic Claude, RAG (Retrieval-Augmented Generation), and agentic orchestration frameworks.", impact: "Developed practical expertise in leveraging diverse AI models for complex tasks." }},
      { type: 'psi', content: { problem: "Applying generative AI to practical business and creative problems.", solution: "Designed and deployed hobby and experimental projects leveraging LLMs and generative AI for document automation, code generation, image synthesis, data extraction, and process optimization.", impact: "Demonstrated ability to apply theoretical AI knowledge to tangible, impactful solutions." }},
      { type: 'psi', content: { problem: "Orchestrating multi-step AI workflows for intelligent automation.", solution: "Built, tuned, and benchmarked agentic multi-step workflows, integrating LLMs with custom code, MCP servers, and cloud APIs.", impact: "Achieved intelligent automation across business and creative use cases." }},
      { type: 'psi', content: { problem: "Staying current with rapid advancements in AI research and tooling.", solution: "Applied knowledge from dozens of technical books, research papers, and online coursework.", impact: "Drove continuous growth and maintained hands-on familiarity with bleeding-edge tools, SDKs, custom RAG pipelines, and LLM deployment strategies." }},
    ],
  },
  {
    role: "Cashier, Membership Desk, Greeter, Warehouse Associate",
    company: "Costco Wholesale",
    locationAndDates: "Gaithersburg, MD (April 2011 – June 2012)",
    details: [
      { type: 'psi', content: { problem: "Adapting to diverse retail operations.", solution: "Trained across multiple departments.", impact: "Demonstrated adaptability and a fast-learning curve in varied customer service and operational roles." }},
      { type: 'psi', content: { problem: "Ensuring quick and positive customer interactions.", solution: "Delivered speedy customer service as a front-end cashier and food court cashier.", impact: "Ensured a positive experience for all customers, even in high-volume environments." }},
      { type: 'psi', content: { problem: "Assisting customers with membership services.", solution: "Assisted customers with membership services, including renewals, replacing lost cards, and addressing inquiries.", impact: "Provided comprehensive support, enhancing member satisfaction." }},
      { type: 'psi', content: { problem: "Maintaining organized and stocked warehouse shelves.", solution: "Stocked the warehouse after hours.", impact: "Ensured shelves were well-organized and prepared for the next day’s operations." }},
      { type: 'psi', content: { problem: "Welcoming and assisting customers upon entry.", solution: "Acted as a greeter.", impact: "Created a welcoming environment and provided necessary assistance, improving initial customer experience." }},
    ],
  },
];

export default function Experience() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardHoverEffect = {
    scale: 1.03,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  const renderPSI = (item: ExperienceDetail) => {
    if (item.type === 'psi' && typeof item.content !== 'string') {
      const psi = item.content as PSIStatement; // Cast to PSIStatement
      return (
        <div className="mb-4 last:mb-0"> {/* Group PSI statements and provide spacing */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            <span className="text-red-300 font-semibold">Problem:</span> {psi.problem}
          </p>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            <span className="text-green-300 font-semibold">Solution:</span> {psi.solution}
          </p>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            <span className="text-[#05c8fb] font-semibold">Impact:</span> {psi.impact}
          </p>
        </div>
      );
    }
    // If there's a 'text' type detail, render it as a paragraph within a list item
    if (item.type === 'text' && typeof item.content === 'string') {
      return (
        <li className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {item.content}
        </li>
      );
    }
    return null;
  };

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-white mb-4">Professional Experience & Key Roles</h3>
        {experienceData.map((exp, index) => (
          <motion.div
            key={index} // Using index as key for now, consider a unique ID if data is stable
            className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition flex flex-col justify-between group"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div>
              <h4 className="font-semibold text-lg mb-2">{exp.role}</h4>
              <p className="text-xs text-gray-400 mb-4">{exp.company} — {exp.locationAndDates}</p>
              {exp.summary && (
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                  <span className="font-semibold">{exp.summary.split(':')[0]}:</span>
                  {exp.summary.split(':')[1] ? exp.summary.split(':')[1] : ''}
                </p>
              )}
              {/* Main details section */}
              {exp.details && (
                <ul className="list-none space-y-2 mb-2"> {/* Removed list-disc here */}
                  {exp.details.map((detail, detailIndex) => (
                    <React.Fragment key={detailIndex}>
                      {detail.type === 'psi' ? (
                        renderPSI(detail)
                      ) : (
                        <li className="text-sm sm:text-base text-gray-300 leading-relaxed"> {/* Added li for text type */}
                           {detail.content as string}
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              )}

              {exp.majorAchievements && (
                <>
                  <p className="text-xs text-gray-400 font-semibold mt-4">Major Achievements:</p>
                  <ul className="list-none space-y-2 mb-2"> {/* Removed list-disc here */}
                    {exp.majorAchievements.map((achievement, achIndex) => (
                      <React.Fragment key={`ach-${achIndex}`}>
                        {achievement.type === 'psi' ? (
                          renderPSI(achievement)
                        ) : (
                          <li className="text-sm sm:text-base text-gray-300 leading-relaxed"> {/* Added li for text type */}
                            {achievement.content as string}
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </>
              )}
              {exp.additionalText && (
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                  <span className="font-semibold">{exp.additionalText}</span>
                </p>
              )}
              {exp.keyTechnologies && (
                <p className="text-xs text-gray-400">Key Technologies: {exp.keyTechnologies}</p>
              )}
              {exp.keyResults && (
                <p className="text-xs text-gray-400">Key Results: {exp.keyResults}</p>
              )}
            </div>
          </motion.div>
        ))}
     
    </div>
  );
}
