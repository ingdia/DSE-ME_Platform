
"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Female', value: 60, color: '#f472b6' },
  { name: 'Male', value: 40, color: '#60a5fa' },
];

const GenderBalanceChart: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center h-full min-h-[400px]">
      <h3 className="text-xl font-black text-[#1e3a8a] mb-6 w-full">Gender Balance</h3>
      
      <div className="flex-1 w-full min-h-0 relative flex items-center justify-center">
        {/* Central Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <p className="text-4xl font-black text-[#1e3a8a] tracking-tighter">60%</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Female</p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-center gap-10 w-full">
        {data.map((entry, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs font-black text-slate-700">{entry.value}%</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderBalanceChart;