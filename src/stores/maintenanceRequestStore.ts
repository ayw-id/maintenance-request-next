import { MaintenanceRequest, Metrics } from "../graphql";
import { create } from "zustand";

export interface MaintenanceRequestState{
  maintenanceRequests: MaintenanceRequest[];
  metrics: Metrics;
  setMaintenanceRequests: (maintenanceRequests: MaintenanceRequest[]) => void;
  setMetrics: (metrics: Metrics) => void;
  // saveMaintenanceRequest: (maintenanceRequest: MaintenanceRequest) => void;
}

export const useMaintenanceRequestStore = create<MaintenanceRequestState>()((set) => ({
  maintenanceRequests: [],
  metrics: {
    openCount: 0,
    urgentCount: 0,
    averageResolutionTime: 0
  },
  setMaintenanceRequests: (maintenanceRequests: MaintenanceRequest[]) => set(() => ({
    ...{
      maintenanceRequests
    }
  })),
  setMetrics: (metrics: Metrics) => set(() => ({
    ...{
      metrics
    }
  })),
}))
