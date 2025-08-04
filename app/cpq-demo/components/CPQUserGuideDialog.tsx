// File: app/cpq-demo/components/CPQUserGuideDialog.tsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { BookOpenIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CPQUserGuideDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const userGuideContent = (
    <div className="prose prose-invert max-w-none text-white text-sm leading-relaxed p-4">
      <h1 className="text-2xl text-[#05c8fb] font-bold mb-4">
        CPQ Advanced Application: Business Analyst User Guide
      </h1>
      <p>
        **Application Name:** CPQ Advanced <br />
        **Purpose:** The CPQ Advanced application is a powerful tool for rapidly
        configuring, pricing, and generating quotes for complex digital products
        or services. It allows you to build a quote by selecting and configuring
        individual components, seeing real-time cost, price, and profit
        calculations, and generating a professional quote receipt. The app's
        tagline is "The world’s first free digital asset CPQ tool for
        contractors."
      </p>
      <p>
        This guide will walk you through the application's two main modes:
        **Customer Mode** and **Manager Mode**.
      </p>

      <hr className="my-6 border-white/20" />

      <h2 className="text-xl text-white font-semibold mt-6 mb-3">
        Section 1: General Application Overview
      </h2>
      <p>
        The main screen is a table that lists all the components of a given
        quote.
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
        <li>
          **CPQ Header:** At the top of the screen, a clear switch lets you
          toggle between **Customer** and **Manager** modes. This is the central
          control for changing your user permissions.
        </li>
        <li>
          **Component Table:** This is the core of the application. Each row
          represents a single component and displays its key details.
        </li>
        <li>
          **Total Footer:** At the bottom, a footer displays the total
          calculated values for the entire quote, including the aggregate price,
          cost, and profit.
        </li>
        <li>
          **Quote Modal:** A button (likely in the footer) will open a pop-up
          modal showing a final, printable quote receipt.
        </li>
      </ul>

      <hr className="my-6 border-white/20" />

      <h2 className="text-xl text-white font-semibold mt-6 mb-3">
        Section 2: Customer Mode
      </h2>
      <p>
        This mode is designed for sales representatives or end customers. It
        provides a clean, simplified view of the quote and allows for easy
        interaction without changing the core data.
      </p>
      <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
        How to Use:
      </h3>
      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
        <li>
          **Viewing the Quote:** You can see a list of all available components,
          their unit prices, and the total quote summary. The initial view
          typically includes required components like a "Code Snippet" and
          "Instructions (README)." Optional components, such as "Sample Data" or
          a "Troubleshooting Guide," will be present but not included in the
          total by default.
        </li>
        <li>
          **Including/Excluding Components:** Each component row has an
          **Include** checkbox. You can toggle this to add or remove a component
          from the final quote. The totals at the bottom will update
          automatically. The quantity can also be adjusted for included items.
        </li>
        <li>
          **Viewing Totals:** The `TotalFooter` will show you the cumulative
          price, cost, and profit based on the components you have included.
        </li>
        <li>
          **Generating a Quote:** A "Generate Quote" button will display a
          detailed summary of the included components and the final totals.
        </li>
      </ul>
      <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
        Key Limitation:
      </h3>
      <p>
        In Customer Mode, you **cannot** add new components, remove existing
        ones, or edit their details.
      </p>

      <hr className="my-6 border-white/20" />

      <h2 className="text-xl text-white font-semibold mt-6 mb-3">
        Section 3: Manager Mode
      </h2>
      <p>
        This mode is for administrators, product managers, or business analysts.
        It unlocks full control over the quote's configuration, allowing you to
        build and manage the components and their underlying data.
      </p>
      <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
        How to Use:
      </h3>
      <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-300">
        <li>
          **Switching to Manager Mode:** Use the header switch to change from
          Customer to Manager Mode. The screen will refresh with new controls.
        </li>
        <li>
          **Manager Controls:** A set of controls appears at the top of the
          table.
          <ul className="list-disc list-inside space-y-1 ml-6 mt-1">
            <li>
              **Load Mock Data:** This is a powerful feature that lets you load
              pre-defined datasets for different industries. Use the dropdown to
              select a category like `Medical Components`, `Energy Components`,
              or `Software Sales Components`. Clicking "Load Mock Data" will
              replace your current components with the selected data. A
              confirmation will ask you if you're sure.
            </li>
            <li>
              **+ Add Component:** This button adds a new, blank component row
              to the table.
            </li>
            <li>
              **Clear All:** This button removes all components from the current
              quote, allowing you to start from a blank slate.
            </li>
          </ul>
        </li>
        <li>
          **Editing Components:** Each row now has an **Edit** button. Clicking
          it opens a modal window for detailed editing.
        </li>
      </ol>
      <h3 className="text-lg text-[#05c8fb] font-semibold mt-4 mb-2">
        Inside the Edit Component Modal
      </h3>
      <p>
        This modal is the primary tool for a business analyst to configure a
        quote. It is divided into three sections: Input Fields, Pricing Summary,
        and Pricing Equations.
      </p>
      <h4 className="text-base text-white font-medium mt-3 mb-1">
        Input Fields:
      </h4>
      <p>
        Here you can adjust all the raw data for a single component.
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
        <li>**Name:** The name of the component.</li>
        <li>
          **Icon:** A dropdown menu to select a visual icon for the component
          (e.g., Code Snippet, PDF Guide, Image, Video).
        </li>
        <li>**Quantity:** The number of units for this component.</li>
        <li>
          **Discount (%):** A percentage discount to apply to the unit price.
        </li>
        <li>
          **Unit Material Cost ($/unit):** The cost of raw materials per unit.
        </li>
        <li>
          **Unit Labor Cost ($/hr):** The hourly labor rate for this component.
        </li>
        <li>
          **Material Markup (%):** The percentage to add on top of the material
          cost to determine its selling price.
        </li>
        <li>
          **Labor Margin (%):** The percentage to add on top of the labor cost
          to determine its selling price.
        </li>
        <li>
          **Labor Hours:** The number of hours of labor required.
        </li>
      </ul>
      <h4 className="text-base text-white font-medium mt-3 mb-1">
        Pricing Summary:
      </h4>
      <p>
        This section displays the calculated results in real-time as you change
        the input fields. It shows a breakdown of: Labor Cost, Material Cost,
        Subtotal, Unit Price, Profit, and Profit Percentage.
      </p>
      <h4 className="text-base text-white font-medium mt-3 mb-1">
        Pricing Equations:
      </h4>
      <p>
        This table is an essential resource that shows the exact formulas used
        to calculate each metric.
      </p>
      <div className="relative inline-block overflow-auto shadow-lg sm:rounded-lg mt-4 border-[#05c8fb]">
        <table className="table-auto text-left text-blue-100 bg-blue-600 text-xs">
          <thead className="bg-[#00417d] uppercase">
            <tr>
              <th scope="col" className="px-3 py-1">Metric</th>
              <th scope="col" className="px-3 py-1">Formula</th>
            </tr>
          </thead>
          <tbody className="bg-[#00264a] divide-y divide-[#05c8fb]/50 leading-tight">
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Labor Cost</td>
              <td className="px-3 py-1">Hourly Labor Rate × Hours Worked</td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Material Cost</td>
              <td className="px-3 py-1">Unit Material Cost × Quantity</td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Subtotal</td>
              <td className="px-3 py-1">Labor Cost + Material Cost</td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Labor Price</td>
              <td className="px-3 py-1">Labor Cost + Labor Margin</td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Material Price</td>
              <td className="px-3 py-1">Material Cost + Material Markup</td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Discount</td>
              <td className="px-3 py-1">
                Unit Price × (Discount% / 100)
              </td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Unit Price</td>
              <td className="px-3 py-1">
                Labor Price + Material Price − Discount ($)
              </td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Profit</td>
              <td className="px-3 py-1">
                Unit Price − (Labor Cost + Material Cost)
              </td>
            </tr>
            <tr className="hover:bg-[#373f46]">
              <td className="px-3 py-1 font-medium">Line Total</td>
              <td className="px-3 py-1">Unit Price × Quantity</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="text-base text-white font-medium mt-4 mb-1">
        Component Actions:
      </h4>
      <p>
        At the bottom of the modal, there are buttons to perform actions on the
        specific component you're editing.
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
        <li>
          **Clear Data:** Resets all input fields for this single component to
          zero or an empty value.
        </li>
        <li>
          **Load Seed Data:** Loads mock data for just this component if it's
          available.
        </li>
        <li>
          **Delete:** Permanently removes this component from the quote. A
          confirmation is required.
        </li>
        <li>
          **Close:** Closes the modal and saves your changes to the table.
        </li>
      </ul>

      <hr className="my-6 border-white/20" />

      <h2 className="text-xl text-white font-semibold mt-6 mb-3">
        Section 4: Key Terms & Concepts
      </h2>
      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
        <li>
          **CPQ:** An acronym for **Configure, Price, Quote**. A software system
          that helps sellers quickly and accurately configure complex products,
          determine the right price, and generate a professional quote.
        </li>
        <li>
          **Component:** An individual item, service, or line item that makes up
          a larger product or quote.
        </li>
        <li>
          **Unit:** The unit of measurement for a component (e.g., "per
          snippet," "per document," "per video").
        </li>
        <li>
          **Cost:** The internal cost of the component. This is derived from
          `Labor Cost` and `Material Cost`.
        </li>
        <li>
          **Price:** The selling price of the component to the customer.
        </li>
        <li>
          **Profit:** The difference between the Price and the Cost (Price -
          Cost).
        </li>
        <li>
          **Quote Receipt:** A summary document of the configured product and
          its final pricing, ready to be shared with a customer.
        </li>
        <li>
          **Optional:** A flag indicating if a component is included in the
          quote by default. Components with `optional: true` start with a
          quantity of 0 and must be manually included.
        </li>
        <li>
          **Seed Data:** Pre-built datasets that allow you to load a full quote
          configuration for a specific industry (e.g., `medical`, `banking`,
          `energy`) or a specific component in a single click.
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-xs rounded-md text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors shadow-sm"
      >
        <BookOpenIcon className="w-4 h-4 text-[#05c8fb]" />
        User Guide
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <motion.div
          className="fixed inset-0 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-3xl max-h-[90vh] bg-gray-900 p-6 rounded-lg border border-gray-700 text-white overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-900 pb-2 border-b border-gray-700 z-10">
              <Dialog.Title className="text-xl font-semibold">User Guide</Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            {userGuideContent}
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}