
"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jul', rate: 120 },
  { month: 'Aug', rate: 210 },
  { month: 'Sep', rate: 450 },
  { month: 'Oct', rate: 680 },
  { month: 'Nov', rate: 910 },
  { month: 'Dec', rate: 1240 },
];

const ImpactMomentumChart: React.FC = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col h-full min-h-[400px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-[#1e3a8a] flex items-center gap-2">
          <TrendingUp className="text-[#0B609D]" size={22} /> Impact Momentum
        </h3>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0B609D]" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cumulative Reach</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B609D" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0B609D" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="rate" 
              stroke="#0B609D" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorRate)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ImpactMomentumChart;
