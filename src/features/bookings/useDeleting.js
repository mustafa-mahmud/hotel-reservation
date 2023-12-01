import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export const useDeleting = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteBooking,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: () => {
      toast.error('There is error to delete booking...');
    },
  });
  ///////////////////////////////////////////////////
  return { deleteBooking, isLoading, isError };
};
