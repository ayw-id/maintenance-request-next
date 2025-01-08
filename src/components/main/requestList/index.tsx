import { useMaintenanceRequestStore } from '../../../stores/maintenanceRequestStore';
import React from 'react';
import RequestItem from './requestItem';

const RequestList: React.FC = () => {
  const maintenanceRequestStore = useMaintenanceRequestStore((state) => state)

  return (
    <div className='bg-green w-full'>
      <ul className="list-none">
        {
          maintenanceRequestStore.maintenanceRequests.map((maintenanceRequest, i) => {
            return (
              <RequestItem key={i} maintenanceRequest={maintenanceRequest} />
            )
          })
        }
      </ul>
    </div>
  )
}
export default RequestList;