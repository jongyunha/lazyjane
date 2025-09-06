import React from 'react';
import { Modal } from './Modal';
import './Modal.css';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button className="btn btn-outline" onClick={onClose}>
            {cancelText || t('common.cancel')}
          </button>
          <button className="btn btn-primary" onClick={() => { onConfirm(); onClose(); }}>
            {confirmText || t('common.confirm')}
          </button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
};


