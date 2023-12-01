import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers.js';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin.js';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { HiBanknotes } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin.js';
import Modal from '../../ui/Modal.jsx';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
/* eslint-disable react/prop-types */

const CabinRow = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const {
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    id: cabinID,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  };

  ///////////////////////////////////////////////////
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />
            <Menus.List id={cabinID}>
              {/* duplicate */}
              <Menus.Button onClick={handleDuplicate} icon={<HiBanknotes />}>
                Duplicate
              </Menus.Button>

              {/* edit */}
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              {/* delete */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* edit */}
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* delete */}
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabing"
                onConfirm={() => deleteCabin(cabinID)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export default CabinRow;
