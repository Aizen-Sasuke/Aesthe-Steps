import React from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { DEFAULT_STORE_CONFIG } from '../data/products';
import { StoreConfig } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  storeConfig?: StoreConfig;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  storeConfig = DEFAULT_STORE_CONFIG,
  onClose,
}) => {
  if (!isOpen) return null;

  const sizeChart = [
    { shoeSize: 'UK 6', eu: 'EU 39', cm: '24.6 cm' },
    { shoeSize: 'UK 7', eu: 'EU 40', cm: '25.4 cm' },
    { shoeSize: 'UK 8', eu: 'EU 41', cm: '26.2 cm' },
    { shoeSize: 'UK 9', eu: 'EU 42', cm: '27.1 cm' },
    { shoeSize: 'UK 10', eu: 'EU 43', cm: '27.9 cm' },
    { shoeSize: 'UK 11', eu: 'EU 44', cm: '28.8 cm' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/55 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#FAF6F0] dark:bg-[#121217] border border-pink-200 dark:border-zinc-800 rounded-3xl p-6 z-10 shadow-2xl space-y-5 text-[#18181B] dark:text-zinc-100 transition-colors">
        <div className="flex items-center justify-between border-b border-pink-200/80 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#DB2777] dark:text-pink-400" />
            <h3 className="text-lg font-bold text-[#18181B] dark:text-zinc-50 font-serif-display">
              Size &amp; Fit Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100 hover:bg-pink-100/50 dark:hover:bg-zinc-800"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#18181B]/75 dark:text-zinc-400 leading-relaxed">
          All styles follow UK 6–11 sizing across every silhouette for consistent comfort and fit.
        </p>

        <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-2xl border border-pink-200 dark:border-zinc-800 p-2 shadow-2xs">
          <table className="w-full text-left text-xs tabular-nums">
            <thead>
              <tr className="border-b border-pink-200/60 dark:border-zinc-800 text-[#18181B]/60 dark:text-zinc-400 uppercase font-mono text-[11px]">
                <th className="py-2.5 px-3">UK Size</th>
                <th className="py-2.5 px-3">EU Equivalent</th>
                <th className="py-2.5 px-3">Foot Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100 dark:divide-zinc-800">
              {sizeChart.map((row) => (
                <tr key={row.shoeSize} className="hover:bg-[#FFF5F7] dark:hover:bg-zinc-800 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#DB2777] dark:text-pink-400">{row.shoeSize}</td>
                  <td className="py-2.5 px-3 text-[#18181B] dark:text-zinc-200 font-medium">{row.eu}</td>
                  <td className="py-2.5 px-3 text-[#18181B]/75 dark:text-zinc-400">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FDF2F4] dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 text-xs text-[#18181B] dark:text-zinc-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-[#DB2777] dark:text-pink-400">
            <Check className="w-4 h-4 text-[#DB2777] dark:text-pink-400" /> Fit Tip
          </div>
          <p className="text-[11px] text-[#18181B]/75 dark:text-zinc-400 leading-relaxed">
            Between sizes on pointed toes? We recommend sizing up for relaxed toe room. Need quick sizing help? Reach us on{' '}
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber || '8801613817630'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#DB2777] dark:text-pink-400 underline underline-offset-2"
            >
              WhatsApp ({storeConfig.primaryPhone})
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
