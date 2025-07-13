'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'; // For expand/collapse icons
import Image from 'next/image';

export default function AutodeskVaultTroubleshooting() {
  // Define blog post metadata
  const post = {
    title: 'Troubleshooting Autodesk Vault View & Job Processor Issues: Best Practices',
    date: '2025-06-13',
    description:
      'A deep dive into common Autodesk Vault View and Job Processor challenges, offering proven troubleshooting approaches and best practices to ensure seamless PDM operations.',
    image: '/images/blog/inventor-vault.png', // Path to your image in public/images/blog/
    author: 'Thomas Smith',
    tags: [
      'Autodesk Vault',
      'Vault View',
      'Job Processor',
      'Troubleshooting',
      'PDM',
      'Best Practices',
      'CAD',
      'Engineering Workflow',
    ],
  };

  // Framer Motion variants for staggered content entry
  const contentVariants: Variants = {
    // Explicitly type as Variants
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut', // Make sure this is a valid easing string or array!
        staggerChildren: 0.1,
      },
    },
  };

  const textItemVariants: Variants = {
    // Explicitly type as Variants for better type checking
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut', // <--- THIS IS THE CRITICAL CHANGE
      },
    },
  };

  // Function to copy link to clipboard
  const copyLink = async () => {
    const url = window.location.href;
    try {
      // Using document.execCommand('copy') as navigator.clipboard.writeText() might not work in some iframe environments
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!'); // Using alert for simplicity, consider a custom modal/toast notification in a real app
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert("Failed to copy link. Please copy it manually from your browser's address bar.");
    }
  };

  // Helper component for Problem-Solution-Impact blocks
  const PSIBlock: React.FC<{ problem: string; solution: string; impact: string }> = ({
    problem,
    solution,
    impact,
  }) => (
    <motion.div variants={textItemVariants} className="mb-4 last:mb-0 space-y-1">
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
        <span className="text-red-300 font-semibold">Problem:</span> {problem}
      </p>
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
        <span className="text-green-300 font-semibold">Solution:</span> {solution}
      </p>
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
        <span className="text-[#05c8fb] font-semibold">Impact:</span> {impact}
      </p>
    </motion.div>
  );

  // New helper component for consistently styled list items
  const StyledListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.li
      variants={textItemVariants} // Apply animation to each list item
      className="relative p-3 border border-white/10 rounded-xl bg-white/5 text-white/90 shadow-inner group overflow-hidden"
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-[#05c8fb] animate-pulse rounded-r" />
      <span className="text-sm sm:text-base leading-relaxed text-[#cbefff] group-hover:text-white transition">
        {children}
      </span>
    </motion.li>
  );

  // Reusable ExpandableSection component
  const ExpandableSection: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
      <motion.div variants={textItemVariants} className="mb-4 last:mb-0">
        <button
          onClick={toggleOpen}
          className="flex items-center justify-between w-full p-4 bg-white/10 border border-white/15 rounded-lg text-white font-semibold text-left shadow-md hover:bg-white/20 transition-colors"
        >
          <span>{title}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="p-4 border border-white/10 border-t-0 rounded-b-lg bg-white/5 space-y-4">
            {children}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto container min-h-screen">
      <motion.article
        initial="hidden"
        animate="show"
        variants={contentVariants}
        className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg text-gray-300"
      >
        {/* Blog Post Header */}
        <motion.header variants={textItemVariants} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400 mb-2">
            By <span className="text-[#05c8fb]">{post.author}</span> on{' '}
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-base text-gray-300 leading-relaxed mb-4">{post.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#05c8fb]/20 text-[#05c8fb] text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            variants={textItemVariants}
            className="w-full mb-8 rounded-lg overflow-hidden"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden group">
              <Image
                priority
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, 800px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        )}

        {/* Introduction */}
        <motion.p
          variants={textItemVariants}
          className="text-base text-gray-300 leading-relaxed mb-6"
        >
          Welcome to this in-depth guide on troubleshooting Autodesk Vault View and Job Processor
          issues during a base setup. My approach is systematic and follows a logical progression,
          much like how a human expert would operate, ensuring efficient identification and
          resolution of problems.
        </motion.p>

        {/* New Section: Context for this Blog Post */}
        <motion.section
          variants={contentVariants}
          className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg"
        >
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Context for this Blog Post: Addressing Client Inquiries
          </motion.h2>
          <motion.p
            variants={textItemVariants}
            className="text-base text-gray-300 leading-relaxed mb-4"
          >
            This blog post serves as a direct response to a recent inquiry from Nitin Khare at IBM,
            regarding my experience troubleshooting Autodesk Vault View and Job Processor issues. It
            outlines my systematic approach and shares best practices refined over years of working
            with these complex systems.
          </motion.p>
          <motion.p
            variants={textItemVariants}
            className="text-base text-gray-300 leading-relaxed mb-4"
          >
            In 2019, I had the privilege to collaborate closely with{' '}
            <span className="text-[#05c8fb] font-semibold">Daryl Price</span> and{' '}
            <span className="text-[#05c8fb] font-semibold">Chris Rogers</span> of D3 Technologies.
            Together, we developed and implemented a custom web-based configurator solution for my
            then-employer, Fry Reglet (GA and CA users). This robust solution included a local job
            processor, a single Vault server, and nine Vault client instances, dramatically
            streamlining engineering workflows.
          </motion.p>

          <motion.h3 variants={textItemVariants} className="text-xl font-semibold text-white mb-3">
            Solution Overview & Source Code
          </motion.h3>
          <motion.p
            variants={textItemVariants}
            className="text-base text-gray-300 leading-relaxed mb-4"
          >
            To provide deeper insight into my hands-on experience and the architectural approach, I
            am sharing a link to the solution&apos;s source code, along with training notes and an
            implementation video.
          </motion.p>
          <motion.p
            variants={textItemVariants}
            className="text-lg font-semibold text-[#05c8fb] text-center mb-6"
          >
            <a
              href="https://drive.google.com/drive/folders/1hOKgVebC_kJ5E83mpcLrQZcxo7je4eNp?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Access Solution Source Code & Documentation (Google Drive)
            </a>
          </motion.p>
          <motion.p
            variants={textItemVariants}
            className="text-sm text-gray-400 leading-relaxed mb-4"
          >
            Please note: This code is proprietary and is provided for educational purposes only for
            your engineering team. While certain APIs within the solution require a license to run,
            your team will gain valuable insights into the design patterns, architectural choices,
            and the practical approach taken to solve complex CAD and PDM automation challenges.
          </motion.p>

          <motion.h3 variants={textItemVariants} className="text-xl font-semibold text-white mb-3">
            Visualizing the Solution
          </motion.h3>
          <motion.div
            variants={textItemVariants}
            className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md"
          >
            <Image
              src="/images/blog/column-configurator-solution.png"
              alt="Fry Reglet Column Cover Configurator UI"
              width={800} // Provide the intrinsic width of the image
              height={450} // Provide the intrinsic height of the image
              layout="responsive" // Or "intrinsic" if you prefer
              objectFit="cover" // Equivalent to your Tailwind class
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://placehold.co/800x450/2D3748/A0AEC0?text=Configurator+UI';
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Screenshot: Custom Web-based Column Cover Configurator User Interface_
            </p>
          </motion.div>

          <motion.div
            variants={textItemVariants}
            className="mb-6 rounded-lg overflow-hidden border border-white/10 shadow-md"
          >
            <Image
              src="/images/blog/source-code-structure.png"
              alt="D3ColumnCoverConfigurator Source Code Structure"
              width={800} // Provide the intrinsic width of the image
              height={450} // Provide the intrinsic height of the image
              layout="responsive" // Or "intrinsic"
              objectFit="cover" // Equivalent to your Tailwind class
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://placehold.co/800x450/2D3748/A0AEC0?text=Source+Code+Structure';
              }}
            />
            <p className="text-xs text-gray-500 text-center p-2">
              _Screenshot: Project Structure of the D3 Column Cover Configurator Solution_
            </p>
          </motion.div>

          <motion.h3 variants={textItemVariants} className="text-xl font-semibold text-white mb-3">
            Job Processor Code Snippet
          </motion.h3>
          <motion.p
            variants={textItemVariants}
            className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4"
          >
            Below is a snippet of the Job Processor code, demonstrating the entry point for custom
            job execution within the Vault environment.
          </motion.p>
          <motion.div
            variants={textItemVariants}
            className="bg-white/10 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4"
          >
            <pre>
              <code>
                {`using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Engenious.Jobs;

namespace ColumnCoverConfiguratorJobProcessor
{
    class Program
    {
        static void Main(string[] args)
        {
            var processor = new JobProcessor(new ColumnCoverConfiguratorJobProcessorContext());

            // Start watching for jobs
            processor.Start();

            System.Console.WriteLine("Press any key to quit...");
            System.Console.ReadLine();

            // Stop watching for jobs
            processor.Stop();
        }
    }
}`}
              </code>
            </pre>
          </motion.div>
        </motion.section>

        {/* Phase 1: Initial Assessment and Information Gathering */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Phase 1: Initial Assessment and Information Gathering
          </motion.h2>
          <motion.p
            variants={textItemVariants}
            className="text-base text-gray-300 leading-relaxed mb-4"
          >
            This phase is critical for laying the groundwork for effective troubleshooting.
          </motion.p>

          <ExpandableSection title="1. Verify System Requirements">
            <PSIBlock
              problem="Misconfigured or under-resourced systems lead to unpredictable Vault behavior."
              solution="Confirm all components (server, clients, network) meet minimum hardware and software requirements for the specific Vault version being installed."
              impact="Ensures a stable foundation, preventing issues stemming from environmental deficiencies."
            />
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Vault Server:</span> Confirm the server meets
                minimum hardware and software requirements (OS, SQL Server version, RAM, CPU, disk
                space).
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Client Workstations:</span> Ensure client machines
                meet Vault client requirements.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Network:</span> Check network connectivity, DNS
                resolution, and firewall settings between the server and clients, and for the Job
                Processor.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="2. Review Installation Logs">
            <PSIBlock
              problem="Unidentified setup errors create hidden system vulnerabilities."
              solution="Thoroughly examine installation logs for errors or warnings, specifically related to SQL Server, ADMS, Vault Server components (IIS, authentication), and Job Processor registration."
              impact="Pinpoints initial configuration failures, guiding immediate corrective actions and preventing cascading issues."
            />
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              During a base setup, installation logs are crucial. I&apos;d specifically look for
              errors or warnings related to:
            </p>
            <ul className="space-y-4">
              <StyledListItem>SQL Server installation and configuration.</StyledListItem>
              <StyledListItem>Autodesk Data Management Server (ADMS) installation.</StyledListItem>
              <StyledListItem>Vault Server components (IIS, authentication).</StyledListItem>
              <StyledListItem>Job Processor installation and service registration.</StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="3. Understand the Specific Symptoms">
            <PSIBlock
              problem="Vague problem descriptions lead to inefficient, shotgun troubleshooting."
              solution="Gather precise details about the issue's manifestation, scope, and associated error messages."
              impact="Narrows down potential causes, allowing for targeted and faster problem resolution."
            />
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              <span className="font-semibold">Vault View Issues:</span>
            </p>
            <ul className="space-y-4">
              <StyledListItem>Is the Vault Explorer client failing to connect?</StyledListItem>
              <StyledListItem>
                Are specific views not loading or displaying incorrect data?
              </StyledListItem>
              <StyledListItem>
                Are there error messages when attempting to check in/out, open files, or perform
                other operations?
              </StyledListItem>
              <StyledListItem>Is it affecting all users or only specific ones?</StyledListItem>
              <StyledListItem>
                Are there issues with specific file types or only certain projects?
              </StyledListItem>
            </ul>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              <span className="font-semibold">Job Processor Issues:</span>
            </p>
            <ul className="space-y-4">
              <StyledListItem>Is the Job Processor service running?</StyledListItem>
              <StyledListItem>Are jobs queuing but not processing?</StyledListItem>
              <StyledListItem>
                Are specific job types (e.g., DWF creation, PDF generation) failing?
              </StyledListItem>
              <StyledListItem>Are there errors in the Job Processor log file?</StyledListItem>
              <StyledListItem>
                Is the Job Processor configured to connect to the correct Vault server and database?
              </StyledListItem>
            </ul>
          </ExpandableSection>
        </motion.section>

        {/* Phase 2: Step-by-Step Troubleshooting */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Phase 2: Step-by-Step Troubleshooting
          </motion.h2>

          <motion.h3 variants={textItemVariants} className="text-xl font-semibold text-white mb-3">
            For Vault View Issues:
          </motion.h3>
          <ExpandableSection title="1. Connectivity Checks">
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Ping/Traceroute:</span> Verify basic network
                connectivity to the Vault server from the client.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Firewall:</span> Ensure necessary ports (e.g., 80
                for HTTP, 443 for HTTPS, SQL Server ports) are open on both the server and client
                firewalls.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">DNS Resolution:</span> Confirm the client can
                resolve the Vault server&apos;s hostname.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="2. Server-Side Verification">
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">IIS Status:</span> Check if the Internet Information
                Services (IIS) is running on the Vault server and if the Autodesk Vault application
                pools are started.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Vault Server Console (ADMS Console):</span>
                {/* Nested list, using standard styling for nested elements */}
                <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-300">
                  <li>Verify the Vault server is healthy and the databases are attached.</li>
                  <li>Check the server event logs for any related errors.</li>
                </ul>
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">SQL Server Status:</span> Ensure the SQL Server
                instance used by Vault is running and accessible.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="3. Client-Side Verification">
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Vault Client Reinstallation/Repair:</span> A corrupt
                client installation can cause issues. Attempt a repair or clean reinstallation.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">User Permissions:</span> Verify the user has
                appropriate permissions in Vault and on the local machine (e.g., read/write access
                to working folders).
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Clear Local Cache:</span> Sometimes a corrupt local
                Vault cache can cause display issues. Clearing the cache can resolve this.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Antivirus/Security Software:</span> Temporarily
                disable antivirus or other security software to rule out interference.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="4. Database Health">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              While a base setup, sometimes initial database corruption can occur. Check SQL Server
              logs for any database-related errors.
            </p>
          </ExpandableSection>

          <motion.h3 variants={textItemVariants} className="text-xl font-semibold text-white mb-3">
            For Job Processor Issues:
          </motion.h3>
          <ExpandableSection title="1. Job Processor Service Status">
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">
                  Confirm the &apos;Autodesk Job Dispatch&apos; service is running on the Job
                  Processor machine.
                </span>{' '}
                If not, attempt to start it and check the Windows Event Viewer for errors.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="2. Configuration Verification">
            <ul className="space-y-4">
              <StyledListItem>Open the Job Processor configuration tool.</StyledListItem>
              <StyledListItem>
                Verify the correct Vault server and database are selected.
              </StyledListItem>
              <StyledListItem>
                Ensure the login credentials for the Job Processor are valid and have sufficient
                Vault permissions (typically a dedicated Vault user).
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="3. Job Processor Log Files">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              The Job Processor generates detailed log files (typically in
              `C:\ProgramData\Autodesk\VaultServer\JobProcessor\Logs`). These are invaluable for
              pinpointing the exact error during job execution. Look for stack traces or specific
              error codes.
            </p>
          </ExpandableSection>

          <ExpandableSection title="4. Permissions">
            <ul className="space-y-4">
              <StyledListItem>
                Ensure the Job Processor user has read/write access to the working folder, the Vault
                data (if applicable for certain jobs), and any network resources it needs to access
                for job execution.
              </StyledListItem>
              <StyledListItem>
                Check for UAC (User Account Control) issues that might be preventing the Job
                Processor from writing to certain locations.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="5. Dependencies">
            <ul className="space-y-4">
              <StyledListItem>
                If jobs involve specific applications (e.g., Inventor for DWF creation), ensure
                those applications are installed and correctly licensed on the Job Processor
                machine.
              </StyledListItem>
              <StyledListItem>
                Verify that any required add-ins or service packs for those applications are also
                installed.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="6. Job Queuing">
            <ul className="space-y-4">
              <StyledListItem>
                If jobs are queuing but not processing, check the Job Queue in the Vault client. Are
                there any jobs stuck in &apos;&apos;Pending&apos; or &apos;Failed&apos; status? Can
                they be manually restarted?
              </StyledListItem>
              <StyledListItem>
                Check the &apos;Job Type&apos; configuration in the ADMS Console to ensure the
                desired job types are enabled.
              </StyledListItem>
            </ul>
          </ExpandableSection>
        </motion.section>

        {/* Phase 3: Escalation and Documentation */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Phase 3: Escalation and Documentation
          </motion.h2>
          <ExpandableSection title="Leverage Autodesk Resources">
            <ul className="space-y-4">
              <StyledListItem>
                If the issue persists, I would guide the client to consult Autodesk Knowledge
                Network (AKN), official documentation, and support forums.
              </StyledListItem>
            </ul>
          </ExpandableSection>
          <ExpandableSection title="Gather Comprehensive Information for Support">
            <ul className="space-y-4">
              <StyledListItem>
                If escalation to Autodesk support is necessary, I&apos;d ensure all relevant logs,
                configuration details, and troubleshooting steps taken are thoroughly documented.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <motion.h3 variants={textItemVariants} className="text-xl font-semibold text-white mb-3">
            Examples of Addressing Similar Client Requests (Conceptual)
          </motion.h3>
          <motion.p
            variants={textItemVariants}
            className="text-base text-gray-300 leading-relaxed mb-4"
          >
            While I don&apos;t have &apos;clients,&apos; I can describe scenarios I&apos;ve been
            trained on and how I&apos;d approach them based on my knowledge:
          </motion.p>
          <ExpandableSection title="Scenario 1: 'Vault Explorer Can't Connect to the Server After Initial Setup'">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              <span className="font-semibold">Approach:</span> I&apos;d first suggest checking basic
              network connectivity (ping the server). Then, I&apos;d ask about firewall status on
              both server and client. A common issue is a firewall blocking the necessary Vault
              communication ports. I&apos;d then advise verifying the Vault server components (IIS,
              ADMS services) are running. Often, the IIS application pools might not have started
              correctly, or the SQL Server service is not running. I&apos;d also check the ADMS
              console to ensure the Vault is attached and healthy.
            </p>
          </ExpandableSection>
          <ExpandableSection title="Scenario 2: 'Jobs Are Queuing in Vault but the Job Processor Isn't Doing Anything'">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              <span className="font-semibold">Approach:</span> My first check would be to confirm
              the &apos;Autodesk Job Dispatch&apos; service is running on the Job Processor machine.
              If it&apos;s stopped, starting it is the immediate solution. If it&apos;s running,
              I&apos;d then guide the user to check the Job Processor&apos;s configuration: ensuring
              it&apos;s pointing to the correct Vault and that the login credentials are valid. The
              most crucial step would be to review the Job Processor&apos;s log file - it almost
              always contains specific error messages indicating why jobs are failing (e.g.,
              &apos;missing application,&apos; &apos;permission denied,&apos; &apos;corrupt
              file&apos;). I&apos;d also inquire about specific job types failing, as this might
              point to a missing application or plugin dependency.
            </p>
          </ExpandableSection>
        </motion.section>

        {/* Best Practices for Preventing Issues */}
        <motion.section variants={contentVariants} className="mb-8">
          <motion.h2
            variants={textItemVariants}
            className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2"
          >
            Best Practices for Autodesk Vault Setup and Troubleshooting
          </motion.h2>

          <ExpandableSection title="1. Adherence to System Requirements">
            <PSIBlock
              problem="Cutting corners on system requirements leads to chronic instability and performance problems."
              solution="Strictly follow Autodesk's documented minimum and recommended system requirements for all Vault components."
              impact="Ensures optimal performance and stability, preventing a wide array of unpredictable issues and future troubleshooting headaches."
            />
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Thorough System Requirements Check:</span> Never
                skip this. Ensure all hardware, OS, and SQL Server requirements are met before
                starting the installation.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Dedicated Service Accounts:</span> Use dedicated,
                non-expiring domain accounts for SQL Server and the Job Processor service. Grant
                them only the necessary permissions.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Antivirus Exclusions:</span> Configure antivirus
                software to exclude Vault-related directories (server and client), SQL Server
                directories, and the Job Processor working directory. This prevents performance
                issues and potential data corruption.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Network Configuration:</span> Ensure stable network
                connectivity, proper DNS resolution, and correctly configured firewalls before
                installation.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Backup Strategy:</span> Implement a robust backup
                strategy for the Vault server (SQL databases and file store) from day one.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="2. Detailed Documentation">
            <PSIBlock
              problem="Lack of recorded setup details and past resolutions hinders future troubleshooting and knowledge transfer."
              solution="Maintain comprehensive documentation of the Vault setup, configuration changes, all encountered issues, and the steps taken to resolve them."
              impact="Provides invaluable historical context, accelerates future troubleshooting, and ensures knowledge continuity across the IT team."
            />
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Installation Steps:</span> Document every step of
                the installation, including specific settings, usernames, passwords (securely
                stored), and any deviations from standard procedures.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Configuration Changes:</span> Maintain a log of all
                configuration changes made to the Vault server, SQL Server, and Job Processor.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Troubleshooting Steps:</span> Document any issues
                encountered during setup and the steps taken to resolve them. This is invaluable for
                future reference.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="3. Incremental Testing and Verification">
            <PSIBlock
              problem="Discovering critical issues only after a full deployment leads to costly rework and project delays."
              solution="Implement testing checkpoints after each major setup step (e.g., after Vault server install, after Job Processor config) rather than waiting for the entire setup to complete."
              impact="Identifies and isolates problems early, drastically reducing the scope and complexity of fixes and improving overall project efficiency."
            />
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Test After Each Major Step:</span> Don&apos;t wait
                until the entire setup is complete to test. After installing the Vault server, test
                client connectivity. After configuring the Job Processor, test a simple job.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Start with Simple Jobs (Job Processor):</span> When
                testing the Job Processor, start with basic jobs (e.g., creating a DWF for a simple
                part) to confirm fundamental functionality before moving to more complex tasks.
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="4. Regular Maintenance and Monitoring">
            <PSIBlock
              problem="Unmonitored systems can degrade silently, leading to unexpected outages and data loss."
              solution="Establish a routine for monitoring Vault server logs, SQL Server logs, and Job Processor logs for warnings/errors, adhering to backup schedules (and testing recoveries), and tracking disk space."
              impact="Proactive identification of potential problems, minimizing downtime, safeguarding data integrity, and ensuring continuous optimal performance."
            />
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Monitor Logs:</span> Regularly review Vault server
                logs, SQL Server logs, and Job Processor logs for any warnings or errors.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Scheduled Backups:</span> Adhere to the established
                backup schedule. Test recoveries periodically.
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Disk Space Monitoring:</span> Monitor disk space on
                the Vault server (especially for the file store and SQL Server data files).
              </StyledListItem>
            </ul>
          </ExpandableSection>

          <ExpandableSection title="5. User Training and Communication">
            <PSIBlock
              problem="User errors often masquerade as system issues, complicating troubleshooting and eroding trust."
              solution="Provide comprehensive user training on Vault best practices (check-in/check-out, file naming, etc.) and communicate any planned maintenance or upgrades."
              impact="Reduces user-induced errors, streamlines support, and fosters a proactive, informed user base, improving overall system adoption and satisfaction."
            />
            <ul className="space-y-4">
              <StyledListItem>
                <span className="font-semibold">Proper User Training:</span> Ensure users are
                properly trained on Vault best practices (check-in/check-out, file naming
                conventions, etc.). User errors can often manifest as perceived &apos;system
                issues.&apos;
              </StyledListItem>
              <StyledListItem>
                <span className="font-semibold">Communicate Changes:</span> Inform users of any
                planned maintenance, upgrades, or changes to the Vault environment.
              </StyledListItem>
            </ul>
          </ExpandableSection>
        </motion.section>

        {/* Closing Statement */}
        <motion.p
          variants={textItemVariants}
          className="text-base text-gray-300 leading-relaxed mb-6"
        >
          By following this structured approach and adhering to these best practices, most Vault
          View and Job Processor issues during a base setup can be effectively identified and
          resolved.
        </motion.p>

        {/* Share Button */}
        <motion.div
          variants={textItemVariants}
          className="mt-10 pt-6 border-t border-white/10 flex justify-center"
        >
          <button
            onClick={copyLink}
            className="inline-flex items-center px-6 py-3 bg-[#05c8fb] text-white font-medium rounded-lg shadow-lg hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#05c8fb]/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Copy Link to Share
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h2m4 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0V3h-2v2m0 0V3a2 2 0 012-2h2a2 2 0 012 2v2m0 0v2m0 0H8"
              ></path>
            </svg>
          </button>
        </motion.div>
      </motion.article>
    </section>
  );
}
