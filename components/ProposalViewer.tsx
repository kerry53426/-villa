import React from 'react';
import { ProposalData, ProposalSection } from '../types';
import { Sparkles, Mountain, Leaf, Diamond } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProposalViewerProps {
  data: ProposalData;
  isPrinting?: boolean;
}

const SectionRenderer: React.FC<{ section: ProposalSection, level: number }> = ({ section, level }) => {
  return (
    <div className={`mb-8 ${level > 0 ? 'ml-0 md:ml-6 mt-4' : 'mt-8'} ${level === 0 ? 'avoid-break' : ''}`}>
      <h3 className={`${level === 0 ? 'text-2xl font-serif font-bold text-luxury-900 border-l-4 border-accent-500 pl-4 mb-4' : 'text-xl font-serif font-semibold text-luxury-700 mb-2'}`}>
        {section.title}
      </h3>
      <div className="text-luxury-800 leading-relaxed text-justify prose prose-stone max-w-none">
        <ReactMarkdown>{section.content}</ReactMarkdown>
      </div>
      
      {section.subsections && section.subsections.map(sub => (
        <SectionRenderer key={sub.id} section={sub} level={level + 1} />
      ))}
    </div>
  );
};

const ProposalViewer: React.FC<ProposalViewerProps> = ({ data }) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white min-h-screen shadow-2xl print:shadow-none print:w-full print:max-w-none print:min-h-0 print:m-0">
      
      {/* Cover Page */}
      <div className="w-full h-[297mm] relative flex flex-col justify-center items-center text-center p-12 bg-luxury-900 text-luxury-50 print:bg-luxury-900 print:text-white page-break print:h-[297mm] print:w-full">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%">
             <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="20" cy="20" r="1" fill="#D4AF37" />
             </pattern>
             <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
           </svg>
        </div>

        <div className="z-10 border-t border-b border-accent-500 py-12 px-8 mb-12">
           <Diamond className="w-16 h-16 text-accent-500 mx-auto mb-6" />
           <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-widest uppercase mb-4">
             {data.title}
           </h1>
           <p className="text-xl md:text-2xl font-light tracking-widest text-accent-300">
             THE CLOUD SANCTUARY
           </p>
        </div>
        
        <div className="z-10 max-w-2xl">
          <p className="text-xl font-serif italic mb-8">
            {data.subtitle}
          </p>
          <div className="w-16 h-1 bg-accent-500 mx-auto mb-8"></div>
          <p className="text-sm tracking-widest opacity-80 uppercase">
            Prepared For Exclusive Review
          </p>
          <p className="text-sm tracking-widest opacity-80 mt-2">
            {data.date}
          </p>
        </div>
        
        <div className="absolute bottom-12 text-xs opacity-50 tracking-[0.2em]">
          CONFIDENTIAL STRATEGY DOCUMENT
        </div>
      </div>

      {/* Content Pages */}
      <div className="p-12 md:p-20 bg-white text-luxury-900 print:p-8 print:w-full">
        
        {/* Executive Summary / Intro visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 avoid-break border-b border-luxury-200 pb-12">
            <div className="flex flex-col items-center text-center p-6 bg-luxury-50 rounded-lg">
                <Mountain className="w-10 h-10 text-accent-600 mb-4" />
                <h4 className="font-serif font-bold text-lg mb-2">Secluded</h4>
                <p className="text-sm text-luxury-600">隱世而居，遠離塵囂的極致隱私。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-luxury-50 rounded-lg">
                <Sparkles className="w-10 h-10 text-accent-600 mb-4" />
                <h4 className="font-serif font-bold text-lg mb-2">Bespoke</h4>
                <p className="text-sm text-luxury-600">完全客製化，無法複製的奢華體驗。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-luxury-50 rounded-lg">
                <Leaf className="w-10 h-10 text-accent-600 mb-4" />
                <h4 className="font-serif font-bold text-lg mb-2">Recharging</h4>
                <p className="text-sm text-luxury-600">靈性修復，身心靈的深度療癒。</p>
            </div>
        </div>

        {/* Main Sections */}
        {data.sections.map((section, index) => (
          <SectionRenderer key={section.id} section={section} level={0} />
        ))}

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-luxury-200 text-center text-luxury-400 text-sm font-serif italic avoid-break">
          <p>Cloud Sanctuary Strategy &bull; {data.date} &bull; Private & Confidential</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalViewer;