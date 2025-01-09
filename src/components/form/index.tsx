import { Status, Urgency } from '../../graphql';
import React from 'react';
import HeaderForm from './header';
import moment from 'moment';
import { getUrgencyString } from '../main/requestList/requestItem';
import { useMaintenanceRequest } from '../../hooks/useMaintenanceRequest';
import { useRequestFormState } from '../../context/maintenanceRequestContext';

const Form: React.FC = () => {
  const {setRequestForm, requestForm} = useRequestFormState();
  const { addRequestCallBack, updateRequestCallBack } = useMaintenanceRequest();
  const initData = {
    id: 0,
    title: '',
    description: '',
    urgency: Urgency.NotUrgent,
    status: Status.Open,
    createdAt: moment()
  }

  const onUrgencyChanged = (urgency: Urgency) => {
    setRequestForm({
      ...requestForm,
      form: {
        ...requestForm.form || initData,
        urgency
      }
    })
  }

  const onStatusChanged = (status: Status) => {
    setRequestForm({
      ...requestForm,
      form: {
        ...requestForm.form || initData,
        status
      }
    })
  }
  
  const onTitleChanged = (title: string) => {
    setRequestForm({
      ...requestForm,
      form: {
        ...requestForm.form || initData,
        title
      }
    })
  }

  const onDescriptionChanged = (description: string) => {
    setRequestForm({
      ...requestForm,
      form: {
        ...requestForm.form || initData,
        description
      }
    })
  }

  const getStatusString = (status: Status) => {
    const statusLabels: Record<Status, string> = {
      [Status.Open]: 'Open',
      [Status.Resolved]: 'Resolved',
    };
    
    return statusLabels[status] || 'Open';
  }

  const urgencyOptions = Object.values(Urgency).map((value) => ({
    value,
    title: getUrgencyString(value),
  }));

  const statusOptions = Object.values(Status).map((value) => ({
    value,
    title: getStatusString(value)
  }))

  const saveRequest = () => {
    const data = requestForm.form
    if (!data?.id) {
      addRequestCallBack({
        title: data?.title || '',
        description: data?.description || '',
        status: data?.status || Status.Open,
        urgency: data?.urgency || Urgency.NotUrgent
      })
        .then((response) => {
          // setIsLoading(false);
          if (
            response &&
            response.data &&
            response.data.addRequest
          ) {
            setRequestForm({
              isShow: false
            });
          } else {
            // setIsLoading(false);
            console.log('add-request-failed', response);
          }
        })
        .catch((err) => {
          // setIsLoading(false);
          console.log('add-request-failed-error', err);
        });
    } else {
      updateRequestCallBack(data)
        .then((response) => {
          // setIsLoading(false);
          if (
            response &&
            response.data &&
            response.data.updateRequestStatus
          ) {
            setRequestForm({
              isShow: false
            });
          } else {
            // setIsLoading(false);
            console.log('update-request-failed', response);
          }
        })
        .catch((err) => {
          // setIsLoading(false);
          console.log('update-request-failed-error', err);
        });
    }
  }

  const changeRequestFormShowState = () => {
    setRequestForm({
      isShow: false
    })
  }

  return (
    <main className="flex flex-col w-full md:w-4/12 px-3 md:px-0 gap-6 items-center">
      <HeaderForm changeRequestFormShowState={changeRequestFormShowState} />
      <label className="relative block w-full">
        <span className="not-sr-only text-slate-400">Urgency *</span>
        <div className="relative">
          <select value={requestForm.form?.urgency || Urgency.NotUrgent} onChange={(event) => onUrgencyChanged(event.target.value as Urgency)} style={{borderRadius: 12}} className="placeholder:text-slate-400 appearance-none block bg-white w-full border py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-14 mt-2">
            {
              urgencyOptions.map((urgency, i) => <option key={i} value={urgency.value}>{urgency.title}</option>)
            }
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </label>

      <label className="relative block w-full">
        <span className="not-sr-only text-slate-400">Status *</span>
        <div className="relative">
          <select value={requestForm.form?.status || Status.Open} onChange={(event) => onStatusChanged(event.target.value as Status)} style={{borderRadius: 12}} className="placeholder:text-slate-400 appearance-none block bg-white w-full border py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-14 mt-2">
            {
              statusOptions.map((status, i) => <option key={i} value={status.value}>{status.title}</option>)
            }
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </label>

      <label className="relative block w-full">
        <span className="not-sr-only text-slate-400">Title *</span>
        <input value={requestForm.form?.title || ''} onChange={(event) => onTitleChanged(event.target.value as string)} style={{borderRadius: 12}} className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-14 mt-2" placeholder="e.g: Bedroom window has cracked" type="text"/>
      </label>

      <label className="relative block w-full">
        <span className="not-sr-only text-slate-400">Description</span>
        <textarea value={requestForm.form?.description || ''} onChange={(event) => onDescriptionChanged(event.target.value as string)} style={{borderRadius: 12}} className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-36 mt-2" placeholder="e.g: Bedroom window has cracked"></textarea>
      </label>

      <button onClick={saveRequest} disabled={!requestForm.form?.title} className="rounded-lg w-72 bg-[#36A388] text-white px-6 py-3 mt-4">Save</button>
    </main>
  )
}
export default Form;