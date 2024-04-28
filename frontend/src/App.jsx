import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Bin from './components/Bin';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/display/:bin_path" element={<Bin />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
