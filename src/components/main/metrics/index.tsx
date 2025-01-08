import React from 'react';
import { useMaintenanceRequestStore } from '../../../stores/maintenanceRequestStore';
import MetricsItem from './metricsItem';

const Metrics: React.FC = () => {
  const maintenanceRequestStore = useMaintenanceRequestStore((state) => state)
  return (
    <div className="w-8/12 flex flex-row gap-6 items-center justify-center">
      <MetricsItem title='Open Request' value={maintenanceRequestStore.metrics.openCount} />
      <MetricsItem title='Urgent Request' value={maintenanceRequestStore.metrics.urgentCount} />
      <MetricsItem title='Average time (days) to resolve' value={maintenanceRequestStore.metrics.averageResolutionTime || 0} />
    </div>
  )
}
export default Metrics;