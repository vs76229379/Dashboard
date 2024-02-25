import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Geography from "scenes/geography";
import Year from "scenes/year";
import Topic from "scenes/topic";
import Sector from "scenes/sector";
import Region from "scenes/region";
import Pest from "scenes/pest";
import Source from "scenes/source";
import Pestle from "scenes/pestle";
import Swot from "scenes/swot";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    
    <div className="app">
       <BrowserRouter>
       <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/year" element={<Year />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/sector" element={<Sector />} />
              <Route path="/region" element={<Region />} />
              <Route path="/pest" element={<Pest />} />
              <Route path="/source" element={<Source />} />
              <Route path="/pestle" element={<Pestle />} />
              <Route path="/swot" element={<Swot />} />
              

              
              
            </Route>
          </Routes>
          </ThemeProvider>
          </BrowserRouter>
    </div>
  );
}

export default App;
