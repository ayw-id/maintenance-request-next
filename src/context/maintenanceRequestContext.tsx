import { MaintenanceRequest } from '../graphql';
import React, { createContext, useContext, useState } from 'react';

export interface RequestFormState {
  isShow: boolean;
  form?: MaintenanceRequest
}

type RequestFormStateContextType = {
  requestForm: RequestFormState;
  setRequestForm: (newState: RequestFormState) => void;
};

const RequestFormStateContext = createContext<RequestFormStateContextType | undefined>(undefined);

export const useRequestFormState = (): RequestFormStateContextType => {
  const context = useContext(RequestFormStateContext);
  if (!context) {
    throw new Error('useRequestFormState must be used within a RequestFormStateProvider');
  }
  return context;
};

export const RequestFormStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requestForm, setRequestForm] = useState<RequestFormState>({
    isShow: false
  });

  return (
    <RequestFormStateContext.Provider value={{ requestForm, setRequestForm }}>
      {children}
    </RequestFormStateContext.Provider>
  );
};
