import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (data) => signupApi(data),
    onSuccess: (user) => {
      toast.success('Account successfully created. Pls verify your email');
    },
  });

  return { signup, isLoading };
}
