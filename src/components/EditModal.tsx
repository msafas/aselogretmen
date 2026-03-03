// EditModal.tsx
import React, { ReactNode } from 'react';

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, setIsOpen, title, children }) => {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div>{children}</div>
        <div className="modal-action">
          <button onClick={() => setIsOpen(false)} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
