import React, { createContext, useState } from 'react';

export const CarteContext = createContext();

export const CarteProvider = ({ children }) => {
  const [GlobalCarte, setGlobalCarte] = useState(null);

  return (
    <CarteContext.Provider value={[GlobalCarte, setGlobalCarte]}>
      {children}
    </CarteContext.Provider>
  );
};
