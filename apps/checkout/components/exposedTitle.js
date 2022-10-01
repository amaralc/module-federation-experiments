import React, { useEffect } from 'react';
const ExportredTitle = () => {
  console.log('---------loading remote component---------');
  useEffect(() => {
    console.log('HOOKS WORKS');
  }, []);
  return (
    <div className="hero">
      Checkout
    </div>
  );
};

export default ExportredTitle;
