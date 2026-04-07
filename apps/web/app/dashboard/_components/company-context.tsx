"use client";

import { createContext, useContext } from "react";

export type CompanyContextValue = {
  companyId: string | null;
  companyName: string | null;
  loading: boolean;
};

export const CompanyContext = createContext<CompanyContextValue>({
  companyId: null,
  companyName: null,
  loading: true,
});

export function useCompany() {
  return useContext(CompanyContext);
}
