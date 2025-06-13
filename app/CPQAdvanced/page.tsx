// components/CPQConfigurator.tsx
"use client";

import React, { useState } from "react";
import { Switch, Dialog, Listbox } from "@headlessui/react";
import {
  FaCode,
  FaFileAlt,
  FaFilePdf,
  FaImage,
  FaVideo,
  FaGithub,
  FaInfoCircle,
  FaDatabase,
  FaTools,
  FaBookOpen,
  FaQuestionCircle,
  FaStar,
  FaLaptopCode,
  FaCogs,
  FaCloud,
  FaNetworkWired,
} from "react-icons/fa";

// 1) Extend CPQComponent to include labor & material costs
type CPQComponent = {
  id: string;
  name: string;
  unit: string;
  // base cost inputs (manager‐only)
  unitLaborCost: number;       // $ per hr
  laborHours: number;          // hrs
  unitMaterialCost: number;    // $ per unit
  quantity: number;            // number of units
  optional: boolean;
  Icon: React.ComponentType<{ className?: string }>;
};

// 2) Define a list of icon‐options for manager to choose from
const iconOptions: { id: string; label: string; Icon: React.ComponentType<{ className?: string }> }[] =
  [
    { id: "FaCode", label: "Code Snippet", Icon: FaCode },
    { id: "FaFileAlt", label: "README", Icon: FaFileAlt },
    { id: "FaFilePdf", label: "PDF Guide", Icon: FaFilePdf },
    { id: "FaImage", label: "Image", Icon: FaImage },
    { id: "FaVideo", label: "Video", Icon: FaVideo },
    { id: "FaGithub", label: "Repo Access", Icon: FaGithub },
    { id: "FaInfoCircle", label: "Description", Icon: FaInfoCircle },
    { id: "FaDatabase", label: "Sample Data", Icon: FaDatabase },
    { id: "FaTools", label: "Troubleshoot", Icon: FaTools },
    { id: "FaBookOpen", label: "Case Study", Icon: FaBookOpen },
    { id: "FaQuestionCircle", label: "FAQ", Icon: FaQuestionCircle },
    { id: "FaStar", label: "Testimonial", Icon: FaStar },
    { id: "FaLaptopCode", label: "Custom .NET", Icon: FaLaptopCode },
    { id: "FaCogs", label: "CAD/Automation", Icon: FaCogs },
    { id: "FaCloud", label: "Cloud/DevOps", Icon: FaCloud },
    { id: "FaNetworkWired", label: "Data/ERP", Icon: FaNetworkWired },
  ];

// 3) Default components—each with default labor/material costs (manager may override)
const initialCPQComponents: CPQComponent[] = [
  {
    id: "snippet",
    name: "Code Snippet",
    unit: "per snippet",
    unitLaborCost: 50,      // default $/hr
    laborHours: 1,          // default hours
    unitMaterialCost: 0,
    quantity: 1,
    optional: false,
    Icon: FaCode,
  },
  {
    id: "readme",
    name: "Instructions (README)",
    unit: "per document",
    unitLaborCost: 40,
    laborHours: 1.5,
    unitMaterialCost: 0,
    quantity: 1,
    optional: false,
    Icon: FaFileAlt,
  },
  {
    id: "guide",
    name: "Setup Guide (PDF)",
    unit: "per guide",
    unitLaborCost: 60,
    laborHours: 2,
    unitMaterialCost: 5,
    quantity: 1,
    optional: false,
    Icon: FaFilePdf,
  },
  {
    id: "productImage",
    name: "Product Image",
    unit: "per image",
    unitLaborCost: 30,
    laborHours: 0.5,
    unitMaterialCost: 0,
    quantity: 1,
    optional: false,
    Icon: FaImage,
  },
  {
    id: "previewVideo",
    name: "Preview Video",
    unit: "per video",
    unitLaborCost: 80,
    laborHours: 1,
    unitMaterialCost: 0,
    quantity: 1,
    optional: false,
    Icon: FaVideo,
  },
  {
    id: "repo",
    name: "Temporary Repo Access",
    unit: "7-day access",
    unitLaborCost: 0,
    laborHours: 0,
    unitMaterialCost: 25,
    quantity: 1,
    optional: false,
    Icon: FaGithub,
  },
  {
    id: "productDesc",
    name: "Product Description",
    unit: "per product",
    unitLaborCost: 45,
    laborHours: 1,
    unitMaterialCost: 0,
    quantity: 1,
    optional: false,
    Icon: FaInfoCircle,
  },
  {
    id: "sampleData",
    name: "Sample Data",
    unit: "per dataset",
    unitLaborCost: 35,
    laborHours: 1,
    unitMaterialCost: 5,
    quantity: 0,
    optional: true,
    Icon: FaDatabase,
  },
  {
    id: "troubleshoot",
    name: "Troubleshooting Guide",
    unit: "per guide",
    unitLaborCost: 45,
    laborHours: 1,
    unitMaterialCost: 0,
    quantity: 0,
    optional: true,
    Icon: FaTools,
  },
  {
    id: "caseStudy",
    name: "Case Study",
    unit: "per document",
    unitLaborCost: 60,
    laborHours: 2,
    unitMaterialCost: 0,
    quantity: 0,
    optional: true,
    Icon: FaBookOpen,
  },
  {
    id: "faq",
    name: "FAQ Document",
    unit: "per document",
    unitLaborCost: 30,
    laborHours: 1,
    unitMaterialCost: 0,
    quantity: 0,
    optional: true,
    Icon: FaQuestionCircle,
  },
  {
    id: "testimonial",
    name: "Testimonial",
    unit: "per testimonial",
    unitLaborCost: 20,
    laborHours: 0.5,
    unitMaterialCost: 0,
    quantity: 0,
    optional: true,
    Icon: FaStar,
  },
];

// 4) Compute per‐component selling price, profit, etc.
function computePricing(
  comp: CPQComponent,
  master: {
    marginPercent: number;
    markupPercent: number;
    discountPercent: number;
  }
) {
  // cost components
  const laborCost = comp.unitLaborCost * comp.laborHours;
  const materialCost = comp.unitMaterialCost;
  // apply markup/margin
  const laborWithMargin = laborCost * (1 + master.marginPercent / 100);
  const materialWithMarkup = materialCost * (1 + master.markupPercent / 100);
  // raw total
  const rawTotal = laborWithMargin + materialWithMarkup;
  // after discount
  const discounted = rawTotal * (1 - master.discountPercent / 100);
  // profit = discounted – (laborCost + materialCost)
  const costTotal = laborCost + materialCost;
  const profit = discounted - costTotal;
  // profit percent
  const profitPercent = costTotal > 0 ? (profit / costTotal) * 100 : 0;
  return {
    unitPrice: discounted,
    profit,
    profitPercent,
  };
}

export default function CPQAdvanced() {
  const [components, setComponents] = useState<CPQComponent[]>(initialCPQComponents);
  const [isManagerView, setIsManagerView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [receiptText, setReceiptText] = useState<string>("");

  // Master‐level margin/markup/discount (manager only)
  const [marginPercent, setMarginPercent] = useState<number>(20);
  const [markupPercent, setMarkupPercent] = useState<number>(15);
  const [discountPercent, setDiscountPercent] = useState<number>(5);

  // Update any numeric field on a component
  const updateComponent = (
    id: string,
    field:
      | "name"
      | "unitLaborCost"
      | "laborHours"
      | "unitMaterialCost"
      | "quantity"
      | "Icon",
    value: any
  ) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? {
              ...comp,
              [field]: value,
            }
          : comp
      )
    );
  };

  // Toggle component inclusion/removal
  const toggleComponent = (id: string) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, quantity: comp.quantity > 0 ? 0 : 1 }
          : comp
      )
    );
  };

  // Add a brand‐new empty component (manager only)
  const addComponent = () => {
    const newId = `new-${Date.now()}`;
    setComponents((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        unit: "per unit",
        unitLaborCost: 50,
        laborHours: 1,
        unitMaterialCost: 0,
        quantity: 0,
        optional: true,
        Icon: FaCode,
      },
    ]);
  };

  // Remove a component entirely (manager only)
  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  // Compute grand-total price
  const totalPrice = components.reduce((sum, comp) => {
    const { unitPrice } = computePricing(comp, { marginPercent, markupPercent, discountPercent });
    return sum + unitPrice * comp.quantity;
  }, 0);

  // Build receipt text for modal
  const openReceiptModal = () => {
    const selectedItems = components.filter((c) => c.quantity > 0);
    let receipt = `CPQ Demo Receipt\n\nYou have configured the following:\n\n`;
    selectedItems.forEach((item) => {
      const { unitPrice, profit } = computePricing(item, {
        marginPercent,
        markupPercent,
        discountPercent,
      });
      const lineTotal = (unitPrice * item.quantity).toFixed(2);
      receipt += `• ${item.name}: ${item.quantity} × $${unitPrice.toFixed(2)} = $${lineTotal}  (profit $${profit.toFixed(
        2
      )})\n`;
    });
    receipt += `\nGrand Total: $${totalPrice.toFixed(2)}\n\n`;
    receipt += `——\nThank you for using this CPQ tool demo!`;
    setReceiptText(receipt);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-xl mx-auto container">
        {/* HEADER */}
        <header className="mb-6 flex flex-col items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              CPQ Tool <span className="text-[#05c8fb]">Demo</span>
            </h2>
            <p className="mt-1 text-gray-300 text-xs sm:text-sm">
              Learn how this configurator turns your legacy code into a revenue
              stream—auto‐configuring live quotes, dynamic pricing, and profit
              analysis.
            </p>
            <details className="mt-2 text-gray-400 text-xs sm:text-sm [&_summary]:cursor-pointer [&_summary]:text-[#05c8fb]">
              <summary className="mt-1 inline-block">Read more</summary>
              <div className="mt-2 space-y-2">
                <p>
                  CPQ = Configure–Price–Quote. Each software asset (code,
                  PDF, image, etc.) is a monetizable component. Freelancers can
                  bundle and sell historical code/work with real-time
                  profitability controls.
                </p>
                <p>
                  Manager can: rename a component, pick an icon, set labor &amp;
                  material cost, and apply global margin/markup/discount. The
                  system then calculates a customer‐facing unit price and profit.
                </p>
                <p>
                  Customer can only choose which components and quantities,
                  then see final price and request a quote.
                </p>
              </div>
            </details>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {isManagerView ? "Manager CPQ View" : "Customer CPQ View"}
            </span>
            <Switch
              checked={isManagerView}
              onChange={setIsManagerView}
              className={`${
                isManagerView ? "bg-[#05c8fb]" : "bg-gray-400/40"
              } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span className="sr-only">Toggle View</span>
              <span
                className={`${
                  isManagerView ? "translate-x-5" : "translate-x-0.5"
                } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          <div className="w-full mt-3">
            <p className="text-gray-300 text-xs sm:text-sm">
              {isManagerView
                ? "Edit component details, costs, and global margin/markup/discount to adjust profitability."
                : "Select components and quantities to see live pricing and generate a personalized quote."}
            </p>
          </div>
        </header>

        {/* MANAGER CONTROLS */}
        {isManagerView && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-400 text-xs mb-1">
                Labor Margin %
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={marginPercent}
                onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 0)}
                className="bg-gray-700/50 border border-gray-600 text-white rounded px-2 py-1 text-xs focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-xs mb-1">
                Material Markup %
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={markupPercent}
                onChange={(e) =>
                  setMarkupPercent(parseFloat(e.target.value) || 0)
                }
                className="bg-gray-700/50 border border-gray-600 text-white rounded px-2 py-1 text-xs focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-xs mb-1">
                Discount %
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={discountPercent}
                onChange={(e) =>
                  setDiscountPercent(parseFloat(e.target.value) || 0)
                }
                className="bg-gray-700/50 border border-gray-600 text-white rounded px-2 py-1 text-xs focus:outline-none"
              />
            </div>
            <div className="flex items-end justify-end">
              <button
                onClick={addComponent}
                className="bg-[#05c8fb] text-[#0b253f] font-semibold rounded-full px-4 py-2 text-xs hover:opacity-90 transition"
              >
                + Add Component
              </button>
            </div>
          </div>
        )}

        {/* TABLE HEADER */}
        <div className="flex text-gray-300 text-[10px] sm:text-xs uppercase tracking-wide mb-2 border-b border-white/20 pb-1">
          <div className="flex-[2] px-1 sm:px-2">Component</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Labor Cost $/hr</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Hours</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Material Cost $/unit</div>
          {isManagerView && (
            <>
              <div className="flex-[1] text-center px-1 sm:px-2">Unit Price</div>
              <div className="flex-[1] text-center px-1 sm:px-2">Profit $</div>
              <div className="flex-[1] text-center px-1 sm:px-2">Profit %</div>
              <div className="flex-[0.5] text-center px-1 sm:px-2">Remove</div>
            </>
          )}
          <div className="flex-[1] text-center px-1 sm:px-2">Include</div>
          <div className="flex-[1] text-center px-1 sm:px-2">Quantity</div>
        </div>

        {/* COMPONENT ROWS */}
        <div className="divide-y divide-white/20">
          {components.map((comp) => {
            const { unitPrice, profit, profitPercent } = computePricing(comp, {
              marginPercent,
              markupPercent,
              discountPercent,
            });

            return (
              <div
                key={comp.id}
                className="flex items-center py-2 text-white text-[11px] sm:text-sm"
              >
                {/* NAME + ICON + OPTIONAL ICON PICKER (manager) */}
                <div className="flex-[2] flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
                  {isManagerView ? (
                    <>
                      <input
                        type="text"
                        value={comp.name}
                        onChange={(e) =>
                          updateComponent(comp.id, "name", e.target.value)
                        }
                        className="bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-1 text-[10px] sm:text-xs focus:outline-none w-full"
                      />
                      <Listbox
                        value={iconOptions.find((opt) =>
                          opt.Icon === comp.Icon ? opt : null
                        )}
                        onChange={(selected) =>
                          updateComponent(comp.id, "Icon", selected.Icon)
                        }
                      >
                        <Listbox.Button className="bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-1 text-[10px] sm:text-xs focus:outline-none">
                          <comp.Icon className="inline-block text-[#05c8fb] w-4 h-4 mr-1" />
                          {iconOptions.find((opt) => opt.Icon === comp.Icon)
                            ?.label || "Icon"}
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 bg-gray-800 border border-gray-600 rounded z-10">
                          {iconOptions.map((opt) => (
                            <Listbox.Option
                              key={opt.id}
                              value={opt}
                              className="cursor-pointer px-2 py-1 hover:bg-gray-700"
                            >
                              <opt.Icon className="inline-block text-[#05c8fb] w-4 h-4 mr-1" />
                              {/* {opt.label} */}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                    </>
                  ) : (
                    <>
                      <comp.Icon className="text-[#05c8fb] w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium">{comp.name}</span>
                    </>
                  )}
                </div>

                {/* LABOR $/HR */}
                <div className="flex-[1] flex justify-center px-1 sm:px-2">
                  {isManagerView ? (
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={comp.unitLaborCost}
                      onChange={(e) =>
                        updateComponent(
                          comp.id,
                          "unitLaborCost",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
                    />
                  ) : (
                    <span className="text-[#05c8fb]">
                      ${unitPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* HOURS */}
                <div className="flex-[1] flex justify-center px-1 sm:px-2">
                  {isManagerView ? (
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={comp.laborHours}
                      onChange={(e) =>
                        updateComponent(
                          comp.id,
                          "laborHours",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
                    />
                  ) : (
                    <span className="opacity-50">—</span>
                  )}
                </div>

                {/* MATERIAL $/UNIT */}
                <div className="flex-[1] flex justify-center px-1 sm:px-2">
                  {isManagerView ? (
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={comp.unitMaterialCost}
                      onChange={(e) =>
                        updateComponent(
                          comp.id,
                          "unitMaterialCost",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
                    />
                  ) : (
                    <span className="opacity-50">—</span>
                  )}
                </div>

                {/* UNIT PRICE (manager sees, customer sees in labor column) */}
                {isManagerView && (
                  <div className="flex-[1] flex justify-center px-1 sm:px-2">
                    <span className="text-[#05c8fb]">
                      ${unitPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* PROFIT $ (manager only) */}
                {isManagerView && (
                  <div className="flex-[1] flex justify-center px-1 sm:px-2">
                    <span
                      className={`${
                        profit >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      ${profit.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* PROFIT % (manager only) */}
                {isManagerView && (
                  <div className="flex-[1] flex justify-center px-1 sm:px-2">
                    <span
                      className={`${
                        profitPercent >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {profitPercent.toFixed(1)}%
                    </span>
                  </div>
                )}

                {/* REMOVE BUTTON (manager only) */}
                {isManagerView && (
                  <div className="flex-[0.5] flex justify-center px-1 sm:px-2">
                    <button
                      onClick={() => removeComponent(comp.id)}
                      className="text-red-500 hover:text-red-400 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* INCLUDE CHECKBOX */}
                <div className="flex-[1] flex justify-center px-1 sm:px-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={comp.quantity > 0}
                      onChange={() => toggleComponent(comp.id)}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#05c8fb] bg-gray-700/50 border border-gray-600 rounded focus:ring-[#05c8fb]"
                    />
                  </label>
                </div>

                {/* QUANTITY */}
                <div className="flex-[1] flex justify-center px-1 sm:px-2">
                  {comp.quantity > 0 ? (
                    <input
                      type="number"
                      min={1}
                      value={comp.quantity}
                      onChange={(e) =>
                        updateComponent(
                          comp.id,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-12 sm:w-16 bg-gray-700/50 border border-gray-600 text-white rounded px-1 py-[2px] text-[10px] sm:text-xs focus:outline-none"
                    />
                  ) : (
                    <span className="opacity-50">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* GRAND TOTAL & QUOTE BUTTON */}
        <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2 pt-2 border-t border-white/20">
          <div className="text-white font-semibold text-lg">
            Grand Total:{" "}
            <span className="text-green-400">${totalPrice.toFixed(2)}</span>
          </div>
          {!isManagerView && (
            <button
              onClick={openReceiptModal}
              className="bg-[#05c8fb] text-[#0b253f] text-base font-semibold rounded-full px-6 py-2 shadow transition hover:bg-[#05c8fb]/90"
            >
              Generate Quote
            </button>
          )}
        </div>
      </div>

      {/* RECEIPT MODAL */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" />
          <div className="relative bg-gray-900 rounded-lg max-w-lg w-full p-6 mx-auto text-white">
            <Dialog.Title className="text-xl font-bold mb-4">
              CPQ Demo Receipt
            </Dialog.Title>
            <div className="whitespace-pre-wrap text-sm max-h-80 overflow-y-auto">
              {receiptText}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 bg-[#05c8fb] hover:bg-[#0bbfff] text-gray-900 font-semibold rounded-md px-4 py-2 transition focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
