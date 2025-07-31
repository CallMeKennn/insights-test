"use client";

import React, { useEffect } from "react";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  buttonClose?: any;
  title?: string;
  hasSave: boolean;
  hasCanncel: boolean;
  onSave?: () => void;
  onCanncel?: () => void;
}

const ModalComponent = ({
  isOpen,
  onClose,
  children,
  buttonClose,
  title,
  hasSave,
  hasCanncel,
}: ModalProp) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.classList.remove("overflow-hidden");
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-300/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px] max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            {buttonClose ?? <span>&#x2715;</span>}
          </button>
        </div>

        <div>{children}</div>
        <div className="flex justify-end my-3">
          {hasSave && (
            <button className="px-4 py-2 border rounded mx-1 bg-blue-500 text-white">
              Save
            </button>
          )}
          {hasCanncel && (
            <button className="px-4 py-2 border rounded mx-1">Canncel</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
