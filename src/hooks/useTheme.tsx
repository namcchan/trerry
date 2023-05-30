import React from 'react';
import { ITheme, IThemeProvider } from '../types';
import { light as defaultTheme } from '../theme';

export const ThemeContext = React.createContext<IThemeProvider>({
  theme: defaultTheme,
  children: null,
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  theme,
  setTheme = () => {},
}: IThemeProvider) => {
  if (theme) {
    theme = {
      ...defaultTheme,
      ...theme,
    };
  } else {
    theme = defaultTheme;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme } = React.useContext(ThemeContext);

  return theme as ITheme;
};
