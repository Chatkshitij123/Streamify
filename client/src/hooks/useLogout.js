import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../utils/apiPaths';
import toast from 'react-hot-toast';

const useLogout = () => {
    const queryClient = useQueryClient();

  const {mutate:logoutMutation} = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // await queryClient.refetchQueries({ queryKey: ["authUser"] });
    },
    });
    return { logoutMutation }
  
}

export default useLogout
