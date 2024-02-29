"use client";

import { useState, ReactNode, useEffect } from "react";
import { BoardContext } from "../../pages/Home/hooks/hooks/useBoardContext";
import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";

export default function BoardContextComponent({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    
      {children}
    </BoardContext.Provider>
  );
}
