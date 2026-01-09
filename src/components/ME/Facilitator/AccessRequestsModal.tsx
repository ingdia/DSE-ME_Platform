"use client";

import { useState } from "react";
import Modal from "./Modal";
import { Check, X, User } from "lucide-react";

interface AccessRequest {
  id: string;
  name: string;
  email: string;
  region: string;
  requestDate: string;
  message?: string;
}

interface AccessRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const mockRequests: AccessRequest[] = [
  {
    id: "req1",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    region: "East Region",
    requestDate: "2024-01-15",
    message: "I have 5 years of experience in training and development."
  },
  {
    id: "req2", 
    name: "Mike Johnson",
    email: "mike.j@example.com",
    region: "West Region",
    requestDate: "2024-01-14",
    message: "Looking to facilitate business skills courses."
  },
  {
    id: "req3",
    name: "Lisa Chen",
    email: "lisa.chen@example.com", 
    region: "North Region",
    requestDate: "2024-01-13"
  }
];

export default function AccessRequestsModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
}: AccessRequestsModalProps) {
  const [requests, setRequests] = useState<AccessRequest[]>(mockRequests);

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
    onApprove(requestId);
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
    onReject(requestId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Facilitator Access Requests">
      <div className="max-h-96 overflow-y-auto">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending access requests</p>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{request.name}</h4>
                    <p className="text-sm text-gray-600">{request.email}</p>
                    <p className="text-sm text-gray-500">{request.region}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Requested: {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                    
                    {request.message && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                        "{request.message}"
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition text-sm"
                  >
                    <Check size={14} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition text-sm"
                  >
                    <X size={14} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}