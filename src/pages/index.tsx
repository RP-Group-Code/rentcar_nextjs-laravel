import Head from "next/head";
import { Portal, Box, useDisclosure, Text, Button, Link } from "@chakra-ui/react";
import Dashboard from "./dashboard/index";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box>
      <Box>
        <Dashboard/>
      </Box>
    </Box>
  );
}
