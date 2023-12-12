import React from "react";
import {
  Button,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  useToast,
  Tr,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetUsers, useDeleteUser } from "../api/usersApi";
import Link from "next/link";

export default function IndexUsers() {
  const toast = useToast();

  const { userData, userisLoading, userError, userRefetch } = useGetUsers();
  const { deleteUser, isLoadingDeleteMutate } = useDeleteUser();

  const onEditClick = (user: any) => {};

  const AlertDialogDelete= ({ userData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef();
  
    const confirmDeleteUser = () => {
      deleteUser(userData.id);
  
      const examplePromise = new Promise((resolve, reject) => {
        // Simulasikan penghapusan dengan timeout
        setTimeout(() => {
          resolve(200);
        }, 2000);
      });
  
      toast.promise(examplePromise, {
        success: {
          title: `Proses Deleted ${userData.nama_lengkap} Berhasil`,
          description: "*Data User Tidak Dapat Kami Kembalikan !!",
        },
        error: { title: `Proses Deleted ${userData.nama_lengkap} Gagal ! ` },
        loading: { title: `Proses Deleted ${userData.nama_lengkap} Please Waiting ` },
      });
  
      onClose();
    };
  
    return (
      <>
        <Button colorScheme='red' onClick={onOpen}>
          Delete
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Apakah Anda yakin? Anda tidak bisa mengembalikan data {userData.nama_lengkap}.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={confirmDeleteUser} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };

  const renderuser = () => {
    return userData?.map((userx: any) => {
      if (userError) {
        return (
          <Tr>
            <Td>An error has occurred</Td>
          </Tr>
        );
      } else {
          return (
            <Tr>
              <Td>{userx.id}</Td>
              <Td>{userx.nama_lengkap}</Td>
              <Td>{userx.username}</Td>
              <Td>{userx.mail}</Td>
              <Td>{userx.noHp}</Td>
              <Td>{userx.jabatan}</Td>
              <Td>
                {isLoadingDeleteMutate ? (
                  <Button isLoading variant="outline" loadingText="DISABLE" mr={{ base: "1rem" }}></Button>
                ) : (
                  <Link href="/users/[id]" as={`/users/${userx.id}`}>
                    <Button as='a' onClick={() => onEditClick(userx)} colorScheme="orange" mr={{ base: "1rem" }}>
                      EDIT
                    </Button>
                  </Link>
                )}
                {isLoadingDeleteMutate ? (
                  <Button isLoading loadingText="DELETING" variant="outline"></Button>
                ) : (
                  <AlertDialogDelete userData={userx}/>
                )}
              </Td>
            </Tr>
          );   
      }
    });
  };

  return (
    <Box>
      <main>
        <Heading pt="1rem" pb="1rem">
          <center>Users Data</center>
        </Heading>
        <Box pb={{ base: "2rem" }}>
          <Link href="/users/create">
            <Button colorScheme="purple">Tambah User</Button>
          </Link>
        </Box>
        <Table id="table">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nama_lengkap</Th>
              <Th>Username</Th>
              <Th>mail</Th>
              <Th>noHP</Th>
              <Th>jabatan</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
           
            {renderuser()}
            {userisLoading && (
              <Tr>
                <Td colSpan={2}></Td>
                <Td colSpan={2}>
                  <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="red.500" size="xl" />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </main>
    </Box>
  );
}
