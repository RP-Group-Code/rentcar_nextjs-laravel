import React from "react";
import { Portal, Button, Center, Container, FormControl, FormLabel, Heading, Input, Select, Spinner, Table, Tbody, Td, Text, Th, Thead, useToast, Tr, Stack, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCreateUser } from "../api/usersApi";

const CreateUsers = () => {
  const toast = useToast();


  const handleForminput = (event: any) => {
    formUser.setFieldValue(event.target.name, event.target.value);
  };

  const formUser = useFormik({
    initialValues: {
      nama_lengkap: "",
      username: "",
      password: "",
      noHp: "",
      mail: "",
      jabatan: "",
      id: 0,
    },
  
    onSubmit: () => {
      const { nama_lengkap, username, password, noHp, mail, jabatan, id } = formUser.values;
      // mutateCreateUser({
      //   nama_lengkap,
      //   username,
      //   password,
      //   noHp,
      //   mail,
      //   jabatan,
      // });
      // toast({
      //   title: "User Ditambahkan",
      //   status: "success",
      // });
  
      formUser.setFieldValue("id", 0);
      formUser.setFieldValue("nama_lengkap", "");
      formUser.setFieldValue("username", "");
      formUser.setFieldValue("password", "");
      formUser.setFieldValue("noHp", "");
      formUser.setFieldValue("mail", "");
      formUser.setFieldValue("jabatan", "Pilih Jabatans");
    },
  });

  return (
    <Box>
      <Container>
        <form onSubmit={formUser.handleSubmit}>
          <FormControl mt="5">
            <FormLabel>Id</FormLabel>
            <Input onChange={handleForminput} type="text" name="id" value={formUser.values.id} ></Input>
            <FormLabel> Nama Lengkap</FormLabel>
            <Input onChange={handleForminput} type="text" name="nama_lengkap" placeholder="Nama Lengkap" value={formUser.values.nama_lengkap} required></Input>
            <FormLabel> Username</FormLabel>
            <Input onChange={handleForminput} type="text" name="username" placeholder="Username" required value={formUser.values.username}></Input>
            <FormLabel> Password</FormLabel>
            <Input onChange={handleForminput} type="password" name="password" placeholder="Password" required value={formUser.values.password}></Input>
            <FormLabel> No Hp</FormLabel>
            <Input onChange={handleForminput} type="number" name="noHp" placeholder="No Hp" required value={formUser.values.noHp}></Input>
            <FormLabel> Email</FormLabel>
            <Input onChange={handleForminput} type="email" name="mail" placeholder="Email" required value={formUser.values.mail}></Input>
            <FormLabel> Jabatan</FormLabel>
            <Stack spacing={3}>
              <Select onChange={handleForminput} name="jabatan" value={formUser.values.jabatan} required>
                <option value="">Pilih Jabatan</option>
                <option value="Manager Lapangan">Manager Lapangan</option>
                <option value="Manager Proyek">Manager Proyek</option>
                <option value="Admin">Admin</option>
                <option value="Direktur">Direktur</option>
                <option value="IT">IT</option>
              </Select>
            </Stack>
            {/* <Input type="text" name="Jabatan" placeholder="jabatan" required></Input> */}
          </FormControl>
          {/* {isLoadingmutate ? (
            <Button isLoading loadingText="SUBMITING" colorScheme="teal" variant="outline">
            </Button>
          ) : (
            <Button colorScheme="teal" variant="solid" type="submit">
              SIMPAN
            </Button>
          )} */};
           <Button colorScheme="teal" variant="solid" type="submit">
              SIMPAN
            </Button>
        </form>
      </Container>
    </Box>
  );
};

export default CreateUsers;
