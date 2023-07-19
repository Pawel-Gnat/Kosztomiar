import styles from './DeleteModal.module.css';
import { Modal } from '@/types/types';
import { createPortal } from 'react-dom';
import { Text } from '../ui/Text/Text';
import { Button } from '../ui/Button/Button';
import { CiCircleRemove } from 'react-icons/ci';

export const DeleteModal = (props: Modal) => {
  const { type, name, handleCancel, handleDelete } = props;

  return createPortal(
    <div className={styles.background}>
      <div className={styles.modal}>
        <Text content={`Czy na pewno chcesz usunąć ${type} o nazwie ${name} ?`} />
        <div className={styles.buttons}>
          <Button
            type="button"
            content="Anuluj"
            accent={false}
            isSmall={true}
            onClick={handleCancel}
          />
          <Button
            type="button"
            content="Usuń"
            accent={true}
            isSmall={true}
            icon={<CiCircleRemove />}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement,
  );
};
