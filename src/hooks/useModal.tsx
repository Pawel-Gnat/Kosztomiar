import { useEffect, useState } from 'react';
import { Modal } from '@/types/types';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<Modal>({
    active: false,
    type: '',
    name: '',
  });

  useEffect(() => {
    if (isModalOpen.active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  const handleModal = (props: Modal) => {
    const { active, type, name } = props;
    setIsModalOpen((prevState) => ({ ...prevState, active, type, name }));
  };

  return { isModalOpen, handleModal };
};
