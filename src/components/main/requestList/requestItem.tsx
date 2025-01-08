import moment from 'moment';
import React from 'react';
import { MaintenanceRequest, Status, Urgency } from '../../../graphql';
import { useMaintenanceRequest } from '../../../hooks/useMaintenanceRequest';
import { useRequestFormState } from '../../../context/maintenanceRequestContext';

export const getUrgencyString = (urgency: Urgency) => {
  const urgencyLabels: Record<Urgency, string> = {
    [Urgency.NotUrgent]: '🙂 Non Urgent',
    [Urgency.LessUrgent]: '🔨 Less Urgent',
    [Urgency.Urgent]: '⚡ Urgent',
    [Urgency.Emergency]: '🔥 Emergency'
  };
  
  return urgencyLabels[urgency] || 'Non Urgent';
}

const RequestItem: React.FC<{
  maintenanceRequest: MaintenanceRequest,
}> = ({
  maintenanceRequest,
}) => {
  const { updateRequestCallBack } = useMaintenanceRequest();
  const {setRequestForm} = useRequestFormState();

  const markAsResolved = () => {
    updateRequestCallBack({
      ...maintenanceRequest,
      status: Status.Resolved,
    })
      .then((response) => {
        // setIsLoading(false);
        if (
          response &&
          response.data &&
          response.data.updateRequestStatus
        ) {
          // changeRequestFormShowState();
        } else {
          // setIsLoading(false);
          console.log('add-request-failed', response);
        }
      })
      .catch((err) => {
        // setIsLoading(false);
        console.log('dd-request-failed-error', err);
      });
  }

  const getUrgencyColor = (urgency: Urgency) => {
    const urgencyLabels: Record<Urgency, string> = {
      [Urgency.NotUrgent]: 'text-[#24BF5F]',
      [Urgency.LessUrgent]: 'text-[#157AD8]',
      [Urgency.Urgent]: 'text-[#E3903F]',
      [Urgency.Emergency]: 'text-[#D74B4B]'
    };
    
    return urgencyLabels[urgency] || 'Non Urgent';
  }

  const updateRequest = () => {
    setRequestForm({
      form: maintenanceRequest,
      isShow: true
    })
  }

  return (
    <li onClick={(e) => {
      if (e.defaultPrevented) return
      e.preventDefault()
      updateRequest()
    }}>
      <div className="bg-white my-5 p-4" style={{borderRadius: 12}}>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between my-2">
            <p className=''>{maintenanceRequest.title}</p>
            <p className='text-slate-400'>{moment(maintenanceRequest.createdAt).format('d MMM YYYY')}</p>
          </div>
          <div className="flex flex-row justify-between my-2">
            <p className={getUrgencyColor(maintenanceRequest.urgency)}>{getUrgencyString(maintenanceRequest.urgency)}</p>
            {
              maintenanceRequest.status === Status.Open ? (
                <button onClick={(e) => {
                  if (e.defaultPrevented) return
                  e.preventDefault()
                  markAsResolved()
                }} className="rounded-full bg-[#36A388] text-white px-6 py-1">Mark as Resolved</button>
              ) : (
                <button className="rounded-full bg-[#A1AFC3] text-white px-6 py-1">Resolved</button>
              )
            }
          </div>
        </div>
      </div>
    </li>
  )
}
export default RequestItem;