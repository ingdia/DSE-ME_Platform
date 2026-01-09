"use client";

import { useState } from "react";
import Modal from "./Modal";
import { Facilitator } from "@/types/facilitator";

interface Cohort {
  id: string;
  name: string;
}

interface AssignCohortsModalProps {
  facilitator: Facilitator | null;
  cohorts: Cohort[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedIds: string[]) => void;
}

export default function AssignCohortsModal({
  facilitator,
  cohorts,
  isOpen,
  onClose,
  onSave,
}: AssignCohortsModalProps) {
  const [selected, setSelected] = useState<string[]>(
    facilitator?.cohorts.map((c) => c.id) || []
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  if (!facilitator) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Cohorts to ${facilitator.name}`}>
      <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-4">
        {cohorts.map((cohort) => (
          <li
            key={cohort.id}
            className={`px-4 py-2 rounded-md cursor-pointer ${
              selected.includes(cohort.id) ? "bg-sky-100 text-sky-700" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => toggle(cohort.id)}
          >
            {cohort.name}
          </li>
        ))}
      </ul>
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 rounded-md border" onClick={onClose}>
          Cancel
        </button>
        <button className="px-4 py-2 rounded-md bg-sky-600 text-white" onClick={handleSave}>
          Save
        </button>
      </div>
    </Modal>
  );
}
