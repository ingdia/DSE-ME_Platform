"use client";

import { useState } from "react";
import { X, Briefcase, TrendingUp, Users } from "lucide-react";
import { Participant } from "@/types/participant";

interface EmploymentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
  onUpdateEmployment: (participantId: string, employment: string, income?: string) => void;
}

export default function EmploymentManagementModal({ 
  isOpen, 
  onClose, 
  participants, 
  onUpdateEmployment 
}: EmploymentManagementModalProps) {
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [employment, setEmployment] = useState("");
  const [income, setIncome] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedParticipant && employment) {
      onUpdateEmployment(selectedParticipant, employment, employment !== "Student" ? income : undefined);
      setSelectedParticipant("");
      setEmployment("");
      setIncome("");
      onClose();
    }
  };

  const employmentStats = {
    employed: participants.filter(p => p.employment === "Employed").length,
    selfEmployed: participants.filter(p => p.employment === "Self-Employed").length,
    unemployed: participants.filter(p => p.employment === "Unemployed").length,
    students: participants.filter(p => p.employment === "Student").length
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-2xl p-6 z-10 w-[500px] max-w-full shadow-2xl border border-gray-200 transform transition-all duration-200 scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Employment Management</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Employed</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{employmentStats.employed + employmentStats.selfEmployed}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-800">Unemployed</span>
            </div>
            <p className="text-2xl font-bold text-red-900">{employmentStats.unemployed}</p>
          </div>
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users size={16} className="inline mr-2" />
              Select Participant
            </label>
            <select
              required
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="">Choose participant</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name} - Current: {participant.employment}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase size={16} className="inline mr-2" />
              New Employment Status
            </label>
            <select
              required
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="">Select Employment Status</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {employment && employment !== "Student" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
              <input
                type="text"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="e.g., $50,000"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0B609D] text-white hover:bg-[#094d7a] transition"
            >
              Update Employment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}