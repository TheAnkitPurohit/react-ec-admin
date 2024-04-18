import { alpha } from '@mui/material/styles';

import { grey, primary } from '../palette';

// ----------------------------------------------------------------------

type PresetType = 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';

export function createPresets(preset: PresetType) {
  const primaryColor = getPrimary(preset);

  const theme = {
    palette: {
      primary: primaryColor,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primaryColor?.main}`, 0.24)}`,
    },
  };

  return {
    ...theme,
  };
}

// ----------------------------------------------------------------------

export const blackText = {
  primary: '#000000', // Main black
  secondary: '#333333', // Slightly lighter than main black
  tertiary: '#666666', // Even lighter than secondary
  contrast: '#FFFFFF', // White for high contrast
};

export const cyan = {
  lighter: '#b3e0ff',
  light: '#80bfff',
  main: '#4299e1',
  dark: '#297fb8',
  darker: '#105680',
  contrastText: '#FFFFFF',
  lightBg: '#4299E1',
};

const purple = {
  lighter: '#EBD6FD',
  light: '#B985F4',
  main: '#7635dc',
  dark: '#431A9E',
  darker: '#200A69',
  contrastText: '#FFFFFF',
};

const blue = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#FFFFFF',
};

const orange = {
  lighter: '#FEF4D4',
  light: '#FED680',
  main: '#fda92d',
  dark: '#B66816',
  darker: '#793908',
  contrastText: grey[800],
};

const red = {
  lighter: '#FFE3D5',
  light: '#FFC1AC',
  main: '#FF3030',
  dark: '#B71833',
  darker: '#7A0930',
  contrastText: '#FFFFFF',
};

export const presetOptions = [
  { name: 'default', value: cyan.main },
  { name: 'cyan', value: cyan.main },
  { name: 'purple', value: purple.main },
  { name: 'blue', value: blue.main },
  { name: 'orange', value: orange.main },
  { name: 'red', value: red.main },
];

export function getPrimary(preset: PresetType) {
  return {
    default: primary,
    cyan,
    purple,
    blue,
    orange,
    red,
  }[preset];
}
