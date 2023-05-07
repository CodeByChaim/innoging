import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Canvas from './Canvas';
import ToolBar from './ToolBar';

const App = () => {

  const [shapes, setShapes] = useState([]);
  const [color, setColor] = useState('#fff');
  const [shape, setShape] = useState('');

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  const handleClear = () => {
    setShapes([]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Canvas shapes={shapes} setShapes={setShapes} shape={shape} color={color} />
        <ToolBar
          onClear={handleClear}
          onColorChange={setColor}
          onShapeChange={setShape}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
