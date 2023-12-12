"use cient";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../../lib/axiosInstance"; // Adjust the import path accordingly
import { useRouter } from "next/router";

export const useGetUsers = () => {
  const {
    data: userData,
    isLoading: userisLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery("userList", {
    queryFn: async () => {
      try {
        const userResponse = await axiosInstance.get("/apiusers");
        return userResponse.data;
      } catch (userError) {
        console.error(userError);
        throw new Error("Failed to fetch user data");
      }
    },
  });
  return {
    userData,
    userisLoading,
    userError,
    userRefetch,
  };
};

export const useGetUserById = (id: number) => {
  return useQuery(["userListId", id], async () => {
    const response = await axiosInstance.get(`/apiuser/${id}`);
    return response.data;
  });
};

export const useCreateUser = async (userData: any) => {
  const response = await axiosInstance.post("/postapiuser", userData);
  return response.data;
};

export const useUpdateUser = () => {
  const router = useRouter();

  // const { userRefetch } = useGetUsers();

  const updateUser = async (userData: any) => {
    const response = await axiosInstance.patch(`/updateapiuser/${userData.id}`, userData);
    return response;
  };
  return useMutation(updateUser, {
    onSuccess: async () => {
      try {
        setTimeout(async () => {
          router.back();
        }, 1500);
      } catch (error) {
        console.error(error);
      }
    },
  });

};

export const useDeleteUser = () => {
  const { userRefetch } = useGetUsers();

  const deleteUser = async (id: number) => {
    const response = await axiosInstance.delete(`/deleteapiuser/${id}`);
    return response;
  };

  const { mutate, isLoading: isLoadingDeleteMutate } = useMutation(deleteUser, {
    onSuccess: async () => {
      try {
        setTimeout(async () => {
          await userRefetch();
        }, 1500);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { deleteUser: mutate, isLoadingDeleteMutate };
};
