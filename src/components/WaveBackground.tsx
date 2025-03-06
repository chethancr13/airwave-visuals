
import React from 'react';

const WaveBackground: React.FC = () => {
  return (
    <div className="wave-container">
      <div className="wave wave-primary animate-wave-fast opacity-30"></div>
      <div className="wave wave-secondary animate-wave-slow opacity-20"></div>
      <div className="wave wave-tertiary animate-wave-normal opacity-15"></div>
    </div>
  );
};

export default WaveBackground;
