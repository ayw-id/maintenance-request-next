"use client"
import {useMaintenanceRequest} from '../hooks/useMaintenanceRequest'
import { useEffect } from "react";
import HomeComponent from '../components/main'
import Form from '../components/form';
import { useRequestFormState } from '../context/maintenanceRequestContext';

export default function Home() {
  const {startSubscription, fetchMaintenanceRequest} = useMaintenanceRequest();
  const {requestForm} = useRequestFormState()
  // const [requestFormState, setRequestFormState] = useState<RequestFormState>({
  //   isShow: false,
  // });

  useEffect(() => {
    startSubscription();
    fetchMaintenanceRequest();
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:poppins]">
      {
        !requestForm.isShow ? (
          <HomeComponent />
        ) : (
          <Form />
        )
      }
    </div>
  );
}
