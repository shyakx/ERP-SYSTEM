import React, { useEffect, useRef } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, size = 'md' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-full max-w-sm mx-4';
      case 'md':
        return 'w-full max-w-md mx-4';
      case 'lg':
        return 'w-full max-w-lg mx-4';
      case 'xl':
        return 'w-full max-w-xl mx-4';
      case 'full':
        return 'w-full max-w-4xl mx-4';
      default:
        return 'w-full max-w-md mx-4';
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      tabIndex={-1}
    >
      <div
        ref={modalRef}
        tabIndex={0}
        className={`bg-white rounded-xl shadow-2xl relative transition-all duration-200 transform scale-100 animate-modal-popin outline-none max-h-[90vh] overflow-y-auto ${getSizeClasses()}`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Modal'}
      >
        {/* Header */}
        {(title || true) && (
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {typeof title === 'string' ? (
                  <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                ) : (
                  title
                )}
              </div>
              <button
                className="ml-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={onClose}
                aria-label="Close"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 