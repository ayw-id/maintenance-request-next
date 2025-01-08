import React from 'react';

interface MainProps {
  changeRequestFormShowState: () => void;
}
const HeaderForm: React.FC<MainProps> = ({
  changeRequestFormShowState,
}) => {
  
  return (
    <div className='flex flex-row'>
      <div className="mt-1">
        <button onClick={changeRequestFormShowState} className="inline-flex items-center justify-center w-12 mr-2 text-white transition-colors duration-150 focus:shadow-outline">
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 7H1M1 7L7 1M1 7L7 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </button>
      </div>

      <h1 className='text-xl font-bold'>Maintenance Request</h1>
    </div>
  )
}
export default HeaderForm;