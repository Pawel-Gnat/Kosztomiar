import styles from './ProjectCategoryElements.module.css';
import { Button } from '@/components/ui/Button/Button';
import { sortElementsAlphabetically } from '@/utils/sortElementsAlphabetically';
import { Element, FormElement } from '@/types/types';
import { CiCircleMore, CiCircleRemove } from 'react-icons/ci';
import { UseFormReset } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { DeleteModal } from '@/components/modal/DeleteModal';
import { useModal } from '@/hooks/useModal';

type Props = {
  currency: string | null;
  price: string | null;
  data: Element[];
  deleteElement: (element: Element) => void;
  setEditedElement: Dispatch<
    SetStateAction<{
      name: string;
      value: number;
      unit: string;
      price: number;
    }>
  >;
  setIsFormActive: Dispatch<
    SetStateAction<{
      isActive: boolean;
      isEditing: boolean;
    }>
  >;
  reset: UseFormReset<FormElement>;
};

export const ProjectCategoryElements = ({
  currency,
  price,
  data,
  deleteElement,
  setEditedElement,
  setIsFormActive,
  reset,
}: Props) => {
  const { isModalOpen, handleModal } = useModal();
  const [element, setElement] = useState<null | Element>(null);

  const deleteElementHandler = (el: Element) => {
    deleteElement(el);
    hideModal();
  };

  const hideModal = () => {
    handleModal({ active: false, type: '', name: '' });
    setElement(null);
  };

  const editElementHandler = (el: Element) => {
    reset((prevState) => ({
      ...prevState,
      name: el.name,
      value: +el.value,
      unit: [el.unit],
      price: el.price.toString(),
    }));
    setEditedElement((prevState) => ({
      ...prevState,
      name: el.name,
      value: +el.value,
      unit: el.unit,
      price: el.price,
    }));
    setIsFormActive((prevState) => ({
      ...prevState,
      isActive: true,
      isEditing: true,
    }));
  };

  return (
    <>
      {sortElementsAlphabetically(data).map((el, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{el.name}</td>
          <td>{el.value}</td>
          <td>{el.unit}</td>
          {price === 'true' && (
            <td>
              {+el.price && +el.price % 1 === 0 ? +el.price : (+el.price).toFixed(2)}{' '}
              {currency}
            </td>
          )}
          <td className={styles.nowrap}>
            <Button
              type="button"
              content="Edytuj"
              accent={false}
              isSmall={true}
              icon={<CiCircleMore />}
              onClick={() => editElementHandler(el)}
            />
            <Button
              type="button"
              content="Usuń"
              accent={false}
              isSmall={true}
              icon={<CiCircleRemove />}
              onClick={() => {
                handleModal({ active: true, type: 'element', name: el.name });
                setElement(el);
              }}
            />
          </td>
        </tr>
      ))}
      {isModalOpen.active && element && (
        <DeleteModal
          type={isModalOpen.type}
          name={isModalOpen.name}
          handleCancel={hideModal}
          handleDelete={() => deleteElementHandler(element)}
        />
      )}
    </>
  );
};
