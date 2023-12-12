// pages/users/edit/[id].tsx
"use client";
import { useRouter } from "next/router";
import { Box, useToast, List, ListItem, ListIcon, OrderedList, UnorderedList, Button, FormControl, FormLabel, Input, Tr, Spinner } from "@chakra-ui/react";
import { useGetUserById, useUpdateUser } from "../../api/usersApi";
import { useEffect } from "react";
import { useFormik } from "formik";

const EditUser = () => {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const userId = id ? parseInt(id as string, 10) : null;
  const backRoute = () => {
    router.back();
  };

  const { data: userDataId, isLoading: userIdisLoading, error: userIdError } = useGetUserById(userId);
  const { mutate: updateUser } = useUpdateUser();
  const handleFormSubmit = async (values) => {
    try {
      await updateUser(values);
      toast({
        title: "User Diubah",
        status: "success",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error updating user",
        status: "error",
      });
    }
  };
  const formUser = useFormik({
    initialValues: {
      nama_lengkap: "" || userDataId?.nama_lengkap,
      username: "" || userDataId?.username ,
      noHp: "" || userDataId?.noHp,
      mail: "" || userDataId?.mail,
      jabatan: "" || userDataId?.jabatan,
      id: 0 || userDataId?.id ,
    },

    onSubmit: handleFormSubmit,
  });

  const renderById = () => {
    if (userIdisLoading) {
      return (
        <div>
          {" "}
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="red.500" size="xl" />
        </div>
      );
    }

    if (userIdError) {
      return <div>Error loading user data</div>;
    }
   
    return (
      <Box>
        <Input type="text" name="id" value={formUser.values.id} hidden ></Input>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={formUser.values.username} onChange={formUser.handleChange}/>
        <FormLabel>Nama lengkap</FormLabel>
        <Input type="text" value={formUser.values.nama_lengkap} onChange={formUser.handleChange}/>
        <FormLabel>Jabatan</FormLabel>
        <Input type="text" value={formUser.values.jabatan} onChange={formUser.handleChange}/>
        <FormLabel>Email</FormLabel>
        <Input type="text" value={formUser.values.mail} onChange={formUser.handleChange}/>
        <FormLabel>No Hp</FormLabel>
        <Input type="number" value={formUser.values.noHp} onChange={formUser.handleChange} />
      </Box>
    );
  };
 
 

  return (
    <Box p={4}>
      <form onSubmit={formUser.handleSubmit}>
        <FormControl>{renderById()}</FormControl>
        <Input type="text"/>
      </form>

      <Button onClick={backRoute} colorScheme="orange" mt={4} mr={3}>
        Kembali
      </Button>
      <Button colorScheme="blue" mt={4}>
        Update User
      </Button>
    </Box>
  );
};

export default EditUser;
