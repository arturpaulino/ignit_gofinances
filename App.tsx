import React from "react";
import {ThemeProvider} from "styled-components";
import Apploading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global//styles/theme";

import {Dashboard} from "./src/screens/Dashboard";

export default function App() {
  const [fontLoading] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontLoading) return <Apploading />;
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
