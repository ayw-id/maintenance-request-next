import React from 'react';
import Metrics from './metrics';
import RequestList from './requestList';
import { useRequestFormState } from '../../context/maintenanceRequestContext';

const Home: React.FC = () => {
  const {setRequestForm, requestForm} = useRequestFormState()
  const showRequestForm = () => {
    setRequestForm({
      ...requestForm,
      isShow: true
    })
  }
  
  return (
    <main className="flex flex-col w-6/12 gap-10 items-center">
      <Metrics />
      <RequestList />
      <div className="fixed bottom-4 right-4">
      <button onClick={showRequestForm} className="inline-flex items-center justify-center w-12 h-12 mr-2 text-white transition-colors duration-150 bg-[#36A388] rounded-full focus:shadow-outline hover:bg-pink-800">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 10H10.5M19.5 10H10.5M10.5 10V1M10.5 10V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      </div>
    </main>
  )
}
export default Home;