// AddModal.tsx
import React, { ReactNode } from 'react';

interface AddModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: ReactNode; // Bu props ile dışarıdan form alanlarını alacağız
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black/75 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="w-[80%] xl:w-[50%] max-h-[80vh] overflow-y-auto rounded-lg p-7 bg-base-100 shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✖
          </button>
        </div>

        {/* Modal Body */}
        {children} {/* Burada dışarıdan verilen form alanlarını render ediyoruz */}
      </div>
    </div>
  );
};

export default AddModal;
