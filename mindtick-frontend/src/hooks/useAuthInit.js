import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../features/auth/authSlice";
import { useProfileQuery } from "../features/auth/authApi";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    } else if (isError) {
      dispatch(clearUser());
    }
  }, [data, isError, dispatch]);

  return isLoading;
};
