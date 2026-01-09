"use client";

import { useState } from "react";
import Modal from "./Modal";
import { Facilitator } from "@/types/facilitator";

interface Course {
  id: string;
  name: string;
}

interface AssignCoursesModalProps {
  facilitator: Facilitator | null;
  courses: Course[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedIds: string[]) => void;
}

export default function AssignCoursesModal({
  facilitator,
  courses,
  isOpen,
  onClose,
  onSave,
}: AssignCoursesModalProps) {
  const [selected, setSelected] = useState<string[]>(
    facilitator?.courses.map((c) => c.id) || []
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
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Courses to ${facilitator.name}`}>
      <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className={`px-4 py-2 rounded-md cursor-pointer ${
              selected.includes(course.id) ? "bg-sky-100 text-sky-700" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => toggle(course.id)}
          >
            {course.name}
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