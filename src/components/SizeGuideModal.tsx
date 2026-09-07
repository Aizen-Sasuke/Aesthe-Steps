import React from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeChart = [
    { eu: 36, bd: '36', cm: 23.0, us: 5.5, uk: 3.5 },
    { eu: 37, bd: '37', cm: 23.5, us: 6.5, uk: 4.5 },
    { eu: 38, bd: '38', cm: 24.0, us: 7.5, uk: 5.5 },
    { eu: 39, bd: '39', cm: 24.8, us: 8.5, uk: 6.5 },
    { eu: 40, bd: '40', cm: 25.5, us: 9.0, uk: 7.0 },
    { eu: 41, bd: '41', cm: 26.2, us: 10.0, uk: 8.0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#FAF6F0] border border-pink-200 rounded-3xl p-6 z-10 shadow-2xl space-y-6 text-[#18181B]">
        <div className="flex items-center justify-between border-b border-pink-200/80 pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#DB2777]" />
            <h3 className="text-lg font-bold text-[#18181B] font-serif-display">
              Aesthé Footwear Size Guide
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-[#18181B]/60 hover:text-[#18181B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#18181B]/70">
          All AESTHÉ STEPS silhouettes follow standard EU foot sizing commonly used across Bangladesh. If between sizes or wide feet, we recommend sizing one size up.
        </p>

        <div className="overflow-x-auto bg-white rounded-2xl border border-pink-200 p-2 shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-pink-200/60 text-[#18181B]/60 uppercase font-mono text-[11px]">
                <th className="py-2.5 px-3">EU Size</th>
                <th className="py-2.5 px-3">Foot Length (CM)</th>
                <th className="py-2.5 px-3">US Women</th>
                <th className="py-2.5 px-3">UK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {sizeChart.map((row) => (
                <tr key={row.eu} className="hover:bg-[#FFF5F7] transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#DB2777]">EU {row.eu}</td>
                  <td className="py-2.5 px-3 text-[#18181B] font-medium">{row.cm} cm</td>
                  <td className="py-2.5 px-3 text-[#18181B]/70">{row.us}</td>
                  <td className="py-2.5 px-3 text-[#18181B]/70">{row.uk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FDF2F4] border border-pink-200 text-xs text-[#18181B] space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-[#DB2777]">
            <Check className="w-4 h-4 text-[#DB2777]" /> Free 7-Day Size Exchange in Dhaka
          </div>
          <p className="text-[11px] text-[#18181B]/70">
            If the fit isn't 100% perfect, our Dhaka rider will swap your size at your door free of charge.
          </p>
        </div>
      </div>
    </div>
  );
};
