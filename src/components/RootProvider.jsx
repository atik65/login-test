"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

const CustomRootProvider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </SessionProvider>
  );
};

export default CustomRootProvider;
