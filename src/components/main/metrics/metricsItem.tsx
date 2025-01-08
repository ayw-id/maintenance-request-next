import React from 'react';

interface MetricsItemProps {
  value: number;
  title: string;
}

const MetricsItem: React.FC<MetricsItemProps> = ({
  value,
  title
}) => {
  return (
    <div className="basis-1/3 bg-white text-sm p-4 h-36 flex flex-col justify-center text-center text-col sm:text-left font-[family-name:poppins]" style={{borderRadius: 12}}>
      <h4 className='text-[#36A388] text-4xl text-center'>{value}</h4>
      <p className='text-center h-8 mt-1'>{title}</p>
    </div>
  )
}
export default MetricsItem;