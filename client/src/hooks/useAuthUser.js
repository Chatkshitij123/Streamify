import {useQuery} from '@tanstack/react-query'
import { getAuthUser } from '../utils/apiPaths';


const useAuthUser = (options = {}) => {
    const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    ...options,
    retry: false
  });

  return { isLoading: authUser.isLoading,
    authUser: authUser.data,
    isError: authUser.isError,
    error: authUser.error,}
}

export default useAuthUser
