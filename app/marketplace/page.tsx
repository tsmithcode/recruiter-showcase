// Marketplace.tsx – enterprise‑grade CPQ + Marketplace (≈690 LOC)
"use client";

import React, { useReducer, useEffect, useMemo, useRef } from "react";
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
  FaUpload,
  FaDownload,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { Switch, Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender
 } from "@tanstack/react-table";

/* ——————————————————————————————————————————
 * 1️⃣  Types & Constants
 * ——————————————————————————————————————————*/
interface Item {
  id: string;
  title: string;
  description: string;
  unit: string;
  price: number;
  qty: number;
  mandatory: boolean;
  icon: keyof typeof iconMap;
  productUrl?: string;
  stripeUrl?: string;
  thumb?: string;
  tags?: string[];
  youtube?: string;
}

interface Metrics {
  quotes: number;
  deals: number;
  revenue: number;
  customers: string[]; // simple array for LS
}

const iconMap = {
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
} as const;

const LS_CART = "tsc_cart_v2";
const LS_METRICS = "tsc_metrics_v2";
const LS_CATALOG = "tsc_catalog_v2";

const defaultCatalog: Item[] = [
  {
    id: "snippet",
    title: "Code Snippet",
    description: "Battle‑tested snippet ready to drop‑in.",
    unit: "per snippet",
    price: 10,
    qty: 1,
    mandatory: true,
    icon: "FaCode",
    tags: ["code", "typescript"],
  },
  {
    id: "guide",
    title: "Setup Guide (PDF)",
    description: "Step‑by‑step PDF walk‑through.",
    unit: "per guide",
    price: 20,
    qty: 1,
    mandatory: true,
    icon: "FaFilePdf",
  },
  {
    id: "repo",
    title: "7‑Day Repo Access",
    description: "Temp GitHub access for due diligence.",
    unit: "access",
    price: 25,
    qty: 1,
    mandatory: false,
    icon: "FaGithub",
  },
];

const readJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const txt = localStorage.getItem(key);
    return txt ? (JSON.parse(txt) as T) : fallback;
  } catch {
    return fallback;
  }
};
const writeJSON = (key: string, data: unknown) =>
  typeof window !== "undefined" && localStorage.setItem(key, JSON.stringify(data));

/* ——————————————————————————————————————————
 * 2️⃣  Cart Reducer
 * ——————————————————————————————————————————*/

type Act =
  | { type: "toggle"; id: string }
  | { type: "qty"; id: string; qty: number }
  | { type: "price"; id: string; price: number }
  | { type: "replaceCatalog"; items: Item[] };

const reducer = (state: Item[], act: Act): Item[] => {
  switch (act.type) {
    case "toggle":
      return state.map((i) => (i.id === act.id ? { ...i, qty: i.qty ? 0 : 1 } : i));
    case "qty":
      return state.map((i) => (i.id === act.id ? { ...i, qty: Math.max(1, act.qty) } : i));
    case "price":
      return state.map((i) => (i.id === act.id ? { ...i, price: Math.max(0, act.price) } : i));
    case "replaceCatalog":
      return act.items;
    default:
      return state;
  }
};

/* ——————————————————————————————————————————
 * 3️⃣  Main Component
 * ——————————————————————————————————————————*/
export default function Marketplace() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, dispatch] = useReducer(reducer, [] as Item[]);
  const [mgr, setMgr] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [receipt, setReceipt] = React.useState("");
  const [metrics, setMetrics] = React.useState<Metrics>(() =>
    readJSON(LS_METRICS, { quotes: 0, deals: 0, revenue: 0, customers: [] })
  );
  const [err, setErr] = React.useState<string | null>(null);

  /* ─── hydrate ──────────────────────────────────────────────*/
  useEffect(() => {
    const cat = readJSON<Item[]>(LS_CATALOG, defaultCatalog);
    dispatch({ type: "replaceCatalog", items: cat });
  }, []);
  useEffect(() => writeJSON(LS_CATALOG, items), [items]);
  useEffect(() => writeJSON(LS_METRICS, metrics), [metrics]);

  /* ─── derived ──────────────────────────────────────────────*/
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [i.title, i.description, ...(i.tags || [])]
        .join("|")
        .toLowerCase()
        .includes(q)
    );
  }, [items, search]);

  /* ─── quote ────────────────────────────────────────────────*/
  const genQuote = () => {
    if (!filtered.some((i) => i.qty > 0)) return;
    let txt = "Quote – TSmithCode.ai\n\n";
    filtered.forEach((i) => {
      if (i.qty > 0)
        txt += `• ${i.title}: ${i.qty} × $${i.price.toFixed(2)} = $${(i.qty * i.price).toFixed(2)}\n`;
    });
    txt += `\nTotal: $${total.toFixed(2)}`;
    setReceipt(txt);
    setModal(true);
    setMetrics((m) => ({
      quotes: m.quotes + 1,
      deals: m.deals + (total > 0 ? 1 : 0),
      revenue: m.revenue + total,
      customers: [...new Set([...m.customers, "visitor"])],
    }));
  };

  /* ─── add / delete products (manager) ─────────────────────*/
  const addBlank = () => {
    const id = `item-${Date.now()}`;
    dispatch({
      type: "replaceCatalog",
      items: [
        ...items,
        {
          id,
          title: "New Product",
          description: "Describe…",
          unit: "unit",
          price: 0,
          qty: 0,
          mandatory: false,
          icon: "FaCode",
        },
      ],
    });
  };
  const remove = (id: string) =>
    dispatch({ type: "replaceCatalog", items: items.filter((i) => i.id !== id) });

  /* ─── export / import ──────────────────────────────────────*/
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tsc_marketplace_export.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const triggerImport = () => fileInputRef.current?.click();
  const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string) as Item[];
        if (!Array.isArray(json)) throw new Error("Invalid JSON format");
        dispatch({ type: "replaceCatalog", items: json });
        setErr(null);
      } catch (ex) {
        setErr((ex as Error).message);
      }
    };
    reader.readAsText(file);
  };

  /* ─── react-table (manager grid) ───────────────────────────*/
  const col = createColumnHelper<Item>();
  const columns = [
    col.accessor("title", {
      header: "Title",
      cell: (info) => (
        <input
          className="w-full bg-transparent border-b border-white/20 focus:outline-none"
          value={info.getValue()}
          onChange={(e) => {
            const v = e.target.value;
            dispatch({
              type: "replaceCatalog",
              items: items.map((it) => (it.id === info.row.original.id ? { ...it, title: v } : it)),
            });
          }}
        />
      ),
    }),
    col.accessor("price", {
      header: "Price $",
      cell: (info) => (
        <input
          type="number"
          className="w-20 bg-transparent border-b border-white/20 focus:outline-none"
          value={info.getValue()}
          onChange={(e) => {
            const v = parseFloat(e.target.value) || 0;
            dispatch({ type: "price", id: info.row.original.id, price: v });
          }}
        />
      ),
    }),
    col.display({
      id: "del",
      header: "",
      cell: (info) => (
        <button title="Delete" onClick={() => remove(info.row.original.id)}>
          <FaTrash className="text-red-400" />
        </button>
      ),
    }),
  ];
  const table = useReactTable({ data: items, columns, getCoreRowModel: getCoreRowModel() });

  /* ——————————————————————————————————————————
   *  UI
   * ——————————————————————————————————————————*/
  const highlight = (txt: string) => {
    if (!search) return txt;
    return txt.split(new RegExp(`(${search})`, "gi")).map((seg, i) =>
      seg.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="bg-[#05c8fb]/30">
          {seg}
        </span>
      ) : (
        seg
      )
    );
  };
  const IconCmp = (ic: keyof typeof iconMap) => {
    const C = iconMap[ic] || FaCode;
    return <C className="text-[#05c8fb] w-4 h-4" />;
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto container">
      {/* Header + controls */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          CODE <span className="text-[#05c8fb]">MARKETPLACE</span>
        </h2>
        <div className="flex gap-3 items-center">
          <input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#05c8fb] text-sm"
          />
          <Switch
            checked={mgr}
            onChange={setMgr}
            className={`${mgr ? "bg-[#05c8fb]" : "bg-gray-700/40"} relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#05c8fb]`}
          >
            <span className="sr-only">Toggle manager</span>
            <span className={`${mgr ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>
      </header>

      {/* KPI Tiles */}
      {mgr && (
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 mb-8">
          {[
            { lbl: "Revenue", val: `$${metrics.revenue.toFixed(2)}` },
            { lbl: "Quotes", val: metrics.quotes },
            { lbl: "Deals", val: metrics.deals },
            {
              lbl: "Win%",
              val: metrics.quotes ? `${((metrics.deals / metrics.quotes) * 100).toFixed(1)}%` : "—",
            },
            { lbl: "Avg Deal", val: metrics.deals ? `$${(metrics.revenue / metrics.deals).toFixed(2)}` : "—" },
            { lbl: "Customers", val: metrics.customers.length },
          ].map((m) => (
            <div key={m.lbl} className="bg-white/5 border border-white/10 p-6 rounded-xl text-center text-white shadow">
              <p className="text-xs text-gray-400 mb-1">{m.lbl}</p>
              <p className="font-semibold text-lg">{m.val}</p>
            </div>
          ))}
        </div>
      )}

      {/* Manager Table view */}
      {mgr && (
        <div className="mb-8">
          <div className="flex gap-3 mb-2">
            <button onClick={addBlank} className="flex items-center gap-1 bg-[#05c8fb] text-[#0b253f] rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90">
              <FaPlus /> Add Product
            </button>
            <button onClick={exportJSON} className="flex items-center gap-1 bg-transparent border border-white/20 text-gray-300 rounded-md px-4 py-2 text-sm hover:bg-white/10">
              <FaDownload /> Export
            </button>
            <button onClick={triggerImport} className="flex items-center gap-1 bg-transparent border border-white/20 text-gray-300 rounded-md px-4 py-2 text-sm hover:bg-white/10">
              <FaUpload /> Import
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={onImport} />
          </div>
          {err && <div className="bg-red-900/20 text-red-300 p-2 rounded mb-2 text-sm">{err}</div>}
          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="min-w-full text-sm text-white">
              <thead className="bg-white/5">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((h) => (
  <th
    key={h.id}
    className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wide border-b border-white/10"
  >
    {h.isPlaceholder
      ? null
      : flexRender(h.column.columnDef.header, h.getContext())}
  </th>
))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="odd:bg-white/5">
                    {row.getVisibleCells().map((c) => (
  <td key={c.id} className="px-4 py-2 border-b border-white/10">
    {flexRender(c.column.columnDef.cell, c.getContext())}
  </td>
))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Buyer card grid */}
      {!mgr && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filtered.map((i) => (
            <motion.div key={i.id} whileHover={{ translateY: -4, boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }} className="bg-white/5 border border-white/10 p-6 rounded-xl text-white shadow flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                {IconCmp(i.icon)}
                <div>
                  <h3 className="font-semibold mb-1 text-sm">{highlight(i.title) }</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-2">{highlight(i.description)}</p>
                  {i.tags && <p className="text-[10px] text-gray-400">{i.tags.join(", ")}</p>}
                </div>
              </div>
              <p className="text-[#05c8fb] font-medium mb-2 text-sm">${i.price.toFixed(2)}</p>
              <div className="mt-auto flex items-center gap-3">
                <input type="checkbox" checked={i.qty > 0} onChange={() => dispatch({ type: "toggle", id: i.id })} className="h-5 w-5 text-[#05c8fb] bg-gray-800 border-gray-700 rounded" />
                {i.qty > 0 && (
                  <input type="number" min={1} value={i.qty} onChange={(e) => dispatch({ type: "qty", id: i.id, qty: parseInt(e.target.value) || 1 })} className="w-16 bg-white/10 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#05c8fb] text-sm" />
                )}
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && <div className="py-10 text-center text-gray-400 col-span-full">No items to display.</div>}
        </div>
      )}

      {/* Cart summary */}
      {!mgr && (
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-white/5 border border-white/10 p-6 rounded-xl mb-12">
          <p className="text-white text-lg font-semibold">
            Total: <span className="text-green-400">${total.toFixed(2)}</span>
          </p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={genQuote} disabled={total === 0} className={`px-6 py-3 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-[#05c8fb] ${total ? "bg-[#05c8fb] text-[#0b253f]" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}>
            Generate Quote
          </motion.button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <Dialog static open={modal} onClose={() => setModal(false)} className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-screen items-center justify-center p-4">
             <div aria-hidden="true" className="fixed inset-0 bg-black/50" />

              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="relative bg-gray-900 rounded-lg max-w-lg w-full p-6 mx-auto text-white">
                <Dialog.Title className="text-xl font-bold mb-4 text-center">Quote Receipt</Dialog.Title>
                <pre className="whitespace-pre-wrap text-sm max-h-80 overflow-y-auto">{receipt}</pre>
                <button onClick={() => setModal(false)} className="mt-6 bg-[#05c8fb] hover:bg-[#0bbfff] text-gray-900 font-semibold rounded-md px-4 py-2 mx-auto block">Close</button>
              </motion.div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ——————————————————————————————————————————
 * 4️⃣  Install Guide
 * ——————————————————————————————————————————
 * npm i @tanstack/react-table framer-motion @headlessui/react
 * (Tailwind & react‑icons already assumed)
 */
