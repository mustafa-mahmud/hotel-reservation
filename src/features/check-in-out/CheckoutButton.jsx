import Button from '../../ui/Button';
import { useChecout } from './useCheckout.js';

/* eslint-disable react/prop-types */

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useChecout();
  ///////////////////////////////////////////////////////
  return (
    <Button
      variation="primary"
      size="small"
      onCanPlay={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
