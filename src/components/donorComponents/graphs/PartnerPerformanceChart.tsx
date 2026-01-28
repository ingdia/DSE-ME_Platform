
"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Target } from 'lucide-react';

const data = [
  { name: 'Klab Rwanda', rate: 78 },
  { name: 'RCA', rate: 82 },
  { name: 'WeCode', rate: 70 },
  { name: 'DOT Rwanda', rate: 65 },
  { name: 'Eastern Hub', rate: 88 },
];

const PartnerPerformanceChart: React.FC = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col h-full min-h-[400px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-[#1e3a8a] flex items-center gap-2">
          <Target className="text-[#0B609D]" size={22} /> Partner Performance
        </h3>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Employment Rate %</span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc', radius: 8 }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            />
            <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.rate > 80 ? '#22c55e' : '#0B609D'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PartnerPerformanceChart;
