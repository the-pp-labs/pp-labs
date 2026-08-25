"use client";

import React, { createContext, useContext, useState } from "react";

interface ScrollContextType {
  visibleSections: boolean[];
  setVisibleSections: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const ScrollContext = createContext<ScrollContextType>({
  visibleSections: [],
  setVisibleSections: () => {},
});

export const useScrollStage = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);

  return (
    <ScrollContext.Provider value={{ visibleSections, setVisibleSections }}>
      {children}
    </ScrollContext.Provider>
  );
}
