
import React from 'react';
import SeoManagement from '@/components/SeoManagement';
import { Navbar } from '@/components/Navbar';

const SeoTools: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <SeoManagement />
      </main>
    </div>
  );
};

export default SeoTools;
