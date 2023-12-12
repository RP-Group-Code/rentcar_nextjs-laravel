// components/Sidebar.js
import { Box, Flex, Link, VStack, Text, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaHome, FaOutlineCog, FaUsers , HiOutlineLogout } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const sidebarItems = [
    { label: 'Home', icon: FaHome, path: '/dashboard' },
    { label: 'Users', icon: FaUsers, path: '/users' },
    // Add more sidebar items as needed
  ];

  return (
    <>
      <Box
        as="nav"
        pos="fixed"
        // left={isOpen ? 0 : '-260px'} // Hide when closed
        left={0} // Hide when closed
        top={0}
        h="100vh"
        w="260px" // Set width to 260px
        bg="blue.500"
        color="white"
        p={4}
        pt={{ base: "110px", md: "80px", xl: "120px" }}
        transition="left 0.3s"
        
      >
        <VStack spacing={4} align="start">
          {sidebarItems.map((item) => (
            <Link  key={item.label} onClick={() => router.push(item.path)} w="100%" _hover={{ textDecoration: "none" }}>
              <Flex
                align="center"
                p={2}
                borderRadius="md"
                _hover={{ bg: 'blue.600' }}
                cursor="pointer"
              >
                <Icon as={item.icon} fontSize="24px" />
                <Text ml={33} fontSize="22px">{item.label}</Text>
              </Flex>
            </Link>
          ))}
        </VStack>
      </Box>

      {/* Button to toggle sidebar */}
      {/* <IconButton
        icon={isOpen ? <HiOutlineCog /> : <HiHome />}
        onClick={onToggle}
        pos="fixed"
        top={4}
        left={4}
        aria-label="Toggle Sidebar"
        colorScheme="blue"
        display={{ base: 'block', md: 'none' }}
      /> */}
    </>
  );
};

export default Sidebar;
