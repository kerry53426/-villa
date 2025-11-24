import React, { useState } from 'react';
import { ProposalData, AIServiceState } from '../types';
import { refineText } from '../services/geminiService';
import { Edit2, Wand2, Download, Check, X, Printer, LayoutTemplate } from 'lucide-react';

interface EditorProps {
  data: ProposalData;
  onUpdate: (newData: ProposalData) => void;
  onPrint: () => void;
}

const Editor: React.FC<EditorProps> = ({ data, onUpdate, onPrint }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [aiState, setAiState] = useState<AIServiceState>(AIServiceState.IDLE);
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');

  // Helper to deep update sections
  const updateSectionContent = (sections: any[], id: string, newContent: string): any[] => {
    return sections.map(section => {
      if (section.id === id) {
        return { ...section, content: newContent };
      }
      if (section.subsections) {
        return { ...section, subsections: updateSectionContent(section.subsections, id, newContent) };
      }
      return section;
    });
  };

  const handleContentChange = (id: string, newContent: string) => {
    const newSections = updateSectionContent(data.sections, id, newContent);
    onUpdate({ ...data, sections: newSections });
  };

  const handleAIEnhance = async (id: string, currentText: string, instruction: string) => {
    setAiState(AIServiceState.LOADING);
    try {
      const refined = await refineText(currentText, instruction);
      handleContentChange(id, refined);
      setAiState(AIServiceState.SUCCESS);
      setTimeout(() => setAiState(AIServiceState.IDLE), 2000);
    } catch (e) {
      setAiState(AIServiceState.ERROR);
      setTimeout(() => setAiState(AIServiceState.IDLE), 3000);
    }
  };

  const renderEditorItem = (section: any, level = 0) => (
    <div key={section.id} className={`mb-4 ${level > 0 ? 'ml-4 border-l-2 border-luxury-700 pl-4' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-semibold text-luxury-200 truncate pr-2 w-2/3">{section.title}</h4>
        <div className="flex space-x-2">
           <button 
             onClick={() => setEditingId(editingId === section.id ? null : section.id)}
             className="text-xs text-accent-500 hover:text-accent-400 flex items-center"
           >
             <Edit2 className="w-3 h-3 mr-1" /> {editingId === section.id ? 'Done' : 'Edit'}
           </button>
        </div>
      </div>
      
      {editingId === section.id && (
        <div className="bg-luxury-800 p-3 rounded-md animate-fade-in">
          <textarea
            className="w-full h-32 bg-luxury-900 text-luxury-50 text-xs p-2 rounded border border-luxury-600 focus:border-accent-500 outline-none resize-y font-mono"
            value={section.content}
            onChange={(e) => handleContentChange(section.id, e.target.value)}
          />
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
             <button 
               disabled={aiState === AIServiceState.LOADING}
               onClick={() => handleAIEnhance(section.id, section.content, "Make it more persuasive and elite")}
               className="flex-shrink-0 bg-accent-600 hover:bg-accent-500 text-white text-xs px-2 py-1 rounded flex items-center transition-colors"
             >
               <Wand2 className="w-3 h-3 mr-1" /> 
               {aiState === AIServiceState.LOADING ? 'Thinking...' : 'Make Elite'}
             </button>
             <button 
               disabled={aiState === AIServiceState.LOADING}
               onClick={() => handleAIEnhance(section.id, section.content, "Translate to professional English")}
               className="flex-shrink-0 bg-luxury-600 hover:bg-luxury-500 text-white text-xs px-2 py-1 rounded flex items-center transition-colors"
             >
               <Wand2 className="w-3 h-3 mr-1" /> Translate
             </button>
             <button 
               disabled={aiState === AIServiceState.LOADING}
               onClick={() => handleAIEnhance(section.id, section.content, "Summarize into bullet points")}
               className="flex-shrink-0 bg-luxury-600 hover:bg-luxury-500 text-white text-xs px-2 py-1 rounded flex items-center transition-colors"
             >
               <Wand2 className="w-3 h-3 mr-1" /> Summarize
             </button>
          </div>
          {aiState === AIServiceState.ERROR && <p className="text-red-400 text-xs mt-1">AI Error. Check API Key.</p>}
        </div>
      )}

      {section.subsections && section.subsections.map((sub: any) => renderEditorItem(sub, level + 1))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-luxury-900 border-r border-luxury-700 w-full md:w-80 lg:w-96 shadow-xl z-20 print:hidden">
      <div className="p-6 border-b border-luxury-700">
        <h2 className="text-xl font-serif text-accent-500 mb-1">Proposal Builder</h2>
        <p className="text-xs text-luxury-400">Cloud Sanctuary Strategy Deck</p>
      </div>

      <div className="flex border-b border-luxury-700">
        <button 
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider ${activeTab === 'content' ? 'text-accent-500 border-b-2 border-accent-500' : 'text-luxury-400 hover:text-luxury-200'}`}
        >
          Content
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider ${activeTab === 'settings' ? 'text-accent-500 border-b-2 border-accent-500' : 'text-luxury-400 hover:text-luxury-200'}`}
        >
          Export
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'content' ? (
           <div>
             {data.sections.map(section => renderEditorItem(section))}
           </div>
        ) : (
          <div className="space-y-6">
             <div className="bg-luxury-800 p-4 rounded-lg">
               <h3 className="text-sm font-semibold text-luxury-100 mb-2 flex items-center">
                 <Printer className="w-4 h-4 mr-2 text-accent-500" /> Export PDF
               </h3>
               <p className="text-xs text-luxury-400 mb-4 leading-relaxed">
                 To generate the PDF, click the button below. In the print dialog, ensure <strong>"Background graphics"</strong> is checked and select <strong>"Save as PDF"</strong>.
               </p>
               <button 
                 onClick={onPrint}
                 className="w-full bg-accent-600 hover:bg-accent-500 text-white py-3 rounded-md font-medium text-sm flex justify-center items-center transition-all shadow-lg hover:shadow-accent-500/20"
               >
                 <Download className="w-4 h-4 mr-2" /> Generate PDF
               </button>
             </div>

             <div className="bg-luxury-800 p-4 rounded-lg">
               <h3 className="text-sm font-semibold text-luxury-100 mb-2 flex items-center">
                 <LayoutTemplate className="w-4 h-4 mr-2 text-accent-500" /> Document Info
               </h3>
               <div className="space-y-3">
                 <div>
                   <label className="text-xs text-luxury-400 block mb-1">Title</label>
                   <input 
                    type="text" 
                    value={data.title}
                    onChange={(e) => onUpdate({...data, title: e.target.value})}
                    className="w-full bg-luxury-900 border border-luxury-600 rounded p-2 text-sm text-luxury-50 focus:border-accent-500 outline-none"
                   />
                 </div>
                 <div>
                   <label className="text-xs text-luxury-400 block mb-1">Subtitle</label>
                   <input 
                    type="text" 
                    value={data.subtitle}
                    onChange={(e) => onUpdate({...data, subtitle: e.target.value})}
                    className="w-full bg-luxury-900 border border-luxury-600 rounded p-2 text-sm text-luxury-50 focus:border-accent-500 outline-none"
                   />
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-luxury-700 text-center">
         <p className="text-[10px] text-luxury-500 uppercase tracking-widest">
           Powered by Gemini 2.5
         </p>
      </div>
    </div>
  );
};

export default Editor;