"use client"

import { AddRequestMutationVariables, UpdateRequestStatusMutationVariables, useAddRequestMutation, useMaintenanceRequestsLazyQuery, useSaveRequestSubscription, useUpdateRequestStatusMutation } from '@/graphql';
// import { maintenanceRequestStore } from '../stores/maintenanceRequestStore'
import { useMaintenanceRequestStore } from '@/stores/maintenanceRequestStore';

export const useMaintenanceRequest = () => {
  const maintenanceRequestStore = useMaintenanceRequestStore((state) => state)

  const [maintenanceRequestQuery] = useMaintenanceRequestsLazyQuery({
    onCompleted: (data) => {
      if (data?.maintenanceRequests?.maintenanceRequests) {
        maintenanceRequestStore.setMaintenanceRequests(data.maintenanceRequests.maintenanceRequests)
      }
      if (data.maintenanceRequests.metrics) {
        maintenanceRequestStore.setMetrics(data.maintenanceRequests.metrics)
      }
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  const fetchMaintenanceRequest = () => {
    maintenanceRequestQuery();
  }

  const [addRequestMutation] = useAddRequestMutation({});

  const addRequestCallBack = async (variables: AddRequestMutationVariables) => {
    return addRequestMutation({
      variables,
      onCompleted: (response) => {
        if (response.addRequest) {
          maintenanceRequestStore.setMaintenanceRequests([
            response.addRequest,
            ...maintenanceRequestStore.maintenanceRequests
          ])
        } else {
          // do something
        }
      }
    });
  };

  const [updateRequestMutation] = useUpdateRequestStatusMutation({});

  const updateRequestCallBack = async (variables: UpdateRequestStatusMutationVariables) => {
    return updateRequestMutation({
      variables,
      onCompleted: (response) => {
        if (response.updateRequestStatus) {
          maintenanceRequestStore.setMaintenanceRequests(maintenanceRequestStore.maintenanceRequests.map((request) => {
            return {
              ...response.updateRequestStatus.id === request.id ? response.updateRequestStatus : request
            }
          }))
        } else {
          // do something
        }
      }
    });
  };

  const saveRequestSubscription = useSaveRequestSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.saveRequest?.maintenanceRequest) {
        const maintenanceRequest = subscriptionData.data.saveRequest.maintenanceRequest
        if (maintenanceRequestStore.maintenanceRequests.some((request) => request.id === maintenanceRequest.id)) {
          maintenanceRequestStore.setMaintenanceRequests([
            maintenanceRequest,
            ...maintenanceRequestStore.maintenanceRequests
          ])
        } else {
          const newMaintenanceRequest = maintenanceRequestStore.maintenanceRequests.map((request) => {
            return request.id === maintenanceRequest.id ? maintenanceRequest : request
          })
          maintenanceRequestStore.setMaintenanceRequests(newMaintenanceRequest)
        }
        
      }
      if (subscriptionData.data?.saveRequest?.metrics) {
        maintenanceRequestStore.setMetrics(subscriptionData.data.saveRequest.metrics);
      }
    }
  });

  const startSubscription = () => {
    saveRequestSubscription.restart()
  }

  return {
    fetchMaintenanceRequest,
    addRequestCallBack,
    updateRequestCallBack,
    startSubscription,
  };
};
