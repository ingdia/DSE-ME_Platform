"use client";

import Modal from "./Modal";

interface AccessRequest {
  id: string;
  name: string;
  email: string;
  region: string;
}

interface AccessRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: AccessRequest[];
  onGrant: (id: string) => void;
}

export default function AccessRequestsModal({ isOpen, onClose, requests, onGrant }: AccessRequestsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Facilitators Requesting Access">
      {requests.length === 0 ? (
        <p className="text-gray-500">No access requests at the moment.</p>
      ) : (
        <ul className="flex flex-col gap-3 max-h-64 overflow-y-auto">
          {requests.map(req => (
            <li key={req.id} className="flex justify-between items-center p-2 border rounded-md">
              <div>
                <p className="font-medium">{req.name}</p>
                <p className="text-sm text-gray-500">{req.email} · {req.region}</p>
              </div>
              <button
                onClick={() => onGrant(req.id)}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Grant
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
