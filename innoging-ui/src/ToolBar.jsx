import React, {useState} from 'react';
import axios from 'axios';

import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PaletteIcon from '@mui/icons-material/Palette';
import ShapesIcon from '@mui/icons-material/Category';

import CircleIcon from '@mui/icons-material/PanoramaFishEye';
import LineIcon from '@mui/icons-material/OpenInFull';
import RectangleIcon from '@mui/icons-material/Crop54';
import TriangleIcon from '@mui/icons-material/ChangeHistory';

import Colors from './configs/colors.json'

const ToolBar = (props) => {

  const theme = useTheme();
  const { onClear, onShapeChange, onColorChange } = props;

  const [shapeIcon, setShapeIcon] = useState(<ShapesIcon />);
  const [color, setColor] = useState(theme.palette.primary);


  const handleColorChange = () => {
    (async () => {
      try {
        const resp = await axios.get('http://localhost:3300/color');
        console.log(resp);
        onColorChange(Colors[resp.data]);
        setColor(Colors[resp.data]);
      } catch (err) {
        console.log(err.message);
      }
    })();
  };

  const handleShapeChange = () => {
    (async () => {
      try {
        const resp = await axios.get('http://localhost:3300/shape');
        console.log(resp);
        onShapeChange(resp.data);
        switch (resp.data) {
          case 'line':
            setShapeIcon(<LineIcon />);
            break;
          case 'rectangle':
            setShapeIcon(<RectangleIcon />);
            break;
          case 'triangle':
            setShapeIcon(<TriangleIcon />);
            break;
          case 'circle':
            setShapeIcon(<CircleIcon />);
            break;
          default:
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  };

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        backgroundColor: '#333',
      }}
    >
      <Tooltip title='Reset' arrow>
        <Button variant='outlined' onClick={onClear} endIcon={<HighlightOffIcon />}>Reset</Button>
      </Tooltip>
      <Tooltip title='Choose Random Shape' arrow>
        <Button variant='outlined' onClick={handleShapeChange} endIcon={shapeIcon}>Shapes</Button>
      </Tooltip>
      <Tooltip title='Choose Random Color' arrow>
        <Button variant='outlined' onClick={handleColorChange} endIcon={<PaletteIcon sx={{ color: color }} />}>Colors</Button>
      </Tooltip>
    </Toolbar>
  );
};

export default ToolBar;
