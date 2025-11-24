import React, { useState, useCallback } from 'react';
import { ProposalData } from './types';
import { INITIAL_PROPOSAL } from './constants';
import ProposalViewer from './components/ProposalViewer';
import Editor from './components/Editor';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ProposalData>(INITIAL_PROPOSAL);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-luxury-900 print:overflow-visible print:h-auto print:block print:w-auto print:bg-white">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-luxury-800 rounded-md text-accent-500 md:hidden print:hidden shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Editor Sidebar - Responsive */}
      <div className={`
        fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        print:hidden
      `}>
        <Editor 
          data={data} 
          onUpdate={setData} 
          onPrint={handlePrint} 
        />
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-y-auto bg-gray-900 relative custom-scrollbar print:overflow-visible print:bg-white print:h-auto print:static print:block">
        
        {/* Backdrop visual for App mode */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none print:hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 py-12 px-4 md:px-12 flex justify-center min-h-full print:p-0 print:block print:min-h-0 print:w-full">
          {/* Zoom wrapper for scaling on small screens if needed, though responsive design handles most */}
          <div className="origin-top transform transition-transform duration-300 print:transform-none w-full max-w-[210mm] print:w-full print:max-w-none">
             <ProposalViewer data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;