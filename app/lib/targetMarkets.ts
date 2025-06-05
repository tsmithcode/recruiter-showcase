// lib/targetMarkets.ts
export type DemoItem = {
  id: string;
  name: string;
  description: string;
};

export type IndustrySection = {
  id: string;
  title: string;
  demos: DemoItem[];
};

// Industries with one‐file demo outlines (each ≤ 350 LOC)
export const targetMarkets: IndustrySection[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing (≈ $14T GDP)',
    demos: [
      {
        id: 'production-order-tracker',
        name: 'Production Order Tracker',
        description:
          'Create and track a “Production Order” assigned to a machine and operator.  Queued → Running → Completed progress bar with estimated completion time (units/throughput).',
      },
      {
        id: 'part-quotation-generator',
        name: 'Part Quotation Generator',
        description:
          'Simulate a “Quote‐of‐Materials” for a custom part: choose material, dimensions, and quantity. Shows material cost, labor, overhead breakdown and downloadable quote summary.',
      },
      {
        id: 'maintenance-request-workflow',
        name: 'Maintenance Request Workflow',
        description:
          'Submit a “Preventive Maintenance” request: machine ID, issue description, priority → appends to in‐page maintenance queue with status badges (“Pending”→“In‐Progress”→“Resolved”).',
      },
    ],
  },
  {
    id: 'finance',
    title: 'Finance (≈ $28T GDP)',
    demos: [
      {
        id: 'invoice-approval-workflow',
        name: 'Invoice Approval Workflow',
        description:
          'Submit a “Purchase Invoice” (Vendor, Amount, Due Date).  Displays table of invoices with status badges.  Approve/Reject toggles status; filter Pending only.',
      },
      {
        id: 'expense-report-builder',
        name: 'Expense Report Builder',
        description:
          'Add multiple expense line items (Date, Category, Amount, Description).  Live total calculation.  “Download PDF” opens printable HTML summary.',
      },
      {
        id: 'budget-vs-actual-dashboard',
        name: 'Budget vs. Actual Dashboard',
        description:
          'A bar chart comparing “Budgeted” vs. “Actual” spend across 5 cost centers using Chart.js.  Toggle between Monthly/Yearly dummy data.',
      },
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare (≈ $11T GDP)',
    demos: [
      {
        id: 'patient-appointment-scheduler',
        name: 'Patient Appointment Scheduler',
        description:
          'Schedule a doctor’s appointment: select patient, date, time slot (8 AM–5 PM).  Displays daily calendar grid with booked slots showing patient initials and cancel option.',
      },
      {
        id: 'medication-refill-reminder',
        name: 'Medication Refill Reminder',
        description:
          'Enter medication name, dosage, refill interval.  Shows next refill due date and live countdown (days left).  “Snooze” delays by 7 days.',
      },
      {
        id: 'insurance-claim-precheck',
        name: 'Insurance Claim Precheck',
        description:
          'Enter patient ID, procedure code, and cost.  Demo “validation” logic returns “Auto‐Approve” or “Requires Manual Review” with reasons.',
      },
    ],
  },
  {
    id: 'retail',
    title: 'Retail (≈ $15T GDP)',
    demos: [
      {
        id: 'order-fulfillment-tracker',
        name: 'Order Fulfillment Tracker',
        description:
          'Create an order with items (name, qty).  Status pipeline (Ordered → Packed → Shipped → Delivered).  Click steps to advance status, final step shows “Delivered.”',
      },
      {
        id: 'inventory-reorder-alert',
        name: 'Inventory Reorder Alert',
        description:
          'Grid of 6 SKUs with current stock levels.  If stock ≤ threshold, shows “Reorder” badge.  “Reorder” button resets stock to max and shows confirmation.',
      },
      {
        id: 'promo-discount-calculator',
        name: 'Promotional Discount Calculator',
        description:
          'Input cart total, select coupon code (e.g., “SUMMER10” → 10%, “VIP20” → 20%).  Live display of discount amount and final price; invalid code shows error.',
      },
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics & Transportation (≈ $9T GDP)',
    demos: [
      {
        id: 'shipment-route-optimizer',
        name: 'Shipment Route Optimizer',
        description:
          'Select origin/destination from a list of cities.  “Calculate Route” shows distance (dummy values) and estimated transit time (distance/50 mph).  Save routes list.',
      },
      {
        id: 'fleet-maintenance-dashboard',
        name: 'Fleet Maintenance Dashboard',
        description:
          'Table of 5 vehicles (ID, Last Service Date, Miles Since Service).  If miles > threshold (10 000 mi), shows “Service Due” badge in red.',
      },
      {
        id: 'delivery-eta-notifier',
        name: 'Delivery ETA Notifier',
        description:
          'Enter Package ID, Dispatch Time, and Distance (mi).  Calculates ETA = dispatchTime + (distance/60) hrs.  Live countdown to ETA updates every second.',
      },
    ],
  },
  {
    id: 'technology',
    title: 'Technology / Software (≈ $6T GDP)',
    demos: [
      {
        id: 'cdn-cache-purge-tool',
        name: 'CDN Cache Purge Tool',
        description:
          'Input file path (e.g., `/assets/js/app.js`), click “Purge.”  Shows mock “Request Sent” spinner for 1 s, then randomly returns “Cache Purged!” or “Failed to Purge.”',
      },
      {
        id: 'api-key-manager',
        name: 'API Key Manager',
        description:
          'Grid of 3 API keys (masked).  “Regenerate” button replaces with a new random 32‐char hex string.  Copy‐to‐clipboard icon next to each key.',
      },
      {
        id: 'feature-toggle-dashboard',
        name: 'Feature Toggle Dashboard',
        description:
          '5 feature flags with on/off toggles.  Toggling a switch updates state and logs “Feature X turned On/Off” with timestamp in a change log below.',
      },
    ],
  },
];
