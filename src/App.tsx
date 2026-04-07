/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ArcGISMap from './components/ArcGISMap';
import { examples, specificExamples, MapExample } from './examples';
import { Map, Layers, Box, Star } from 'lucide-react';

export default function App() {
  const [selectedExample, setSelectedExample] = useState<MapExample>(specificExamples[0]);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Map className="w-6 h-6 text-blue-600" />
            ArcGIS Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            35 examples centered on Sri Lanka
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Featured Examples Section */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
              <Star className="w-3 h-3" /> Featured Examples
            </h2>
            <div className="space-y-2">
              {specificExamples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(example)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 ${
                    selectedExample.id === example.id
                      ? 'bg-blue-50 border-blue-200 border shadow-sm'
                      : 'bg-white border-transparent border hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className={`mt-0.5 p-1.5 rounded-lg ${
                    selectedExample.id === example.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {example.type === '2d' ? <Layers className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className={`font-medium text-sm ${
                      selectedExample.id === example.id ? 'text-blue-900' : 'text-slate-700'
                    }`}>
                      {example.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${
                      selectedExample.id === example.id ? 'text-blue-600/80' : 'text-slate-500'
                    }`}>
                      {example.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* General Examples Section */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
              General Examples
            </h2>
            <div className="space-y-2">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(example)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 ${
                    selectedExample.id === example.id
                      ? 'bg-blue-50 border-blue-200 border shadow-sm'
                      : 'bg-white border-transparent border hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className={`mt-0.5 p-1.5 rounded-lg ${
                    selectedExample.id === example.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {example.type === '2d' ? <Layers className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className={`font-medium text-sm ${
                      selectedExample.id === example.id ? 'text-blue-900' : 'text-slate-700'
                    }`}>
                      {example.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${
                      selectedExample.id === example.id ? 'text-blue-600/80' : 'text-slate-500'
                    }`}>
                      {example.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-slate-100">
        <ArcGISMap example={selectedExample} />
        
        {/* Floating Info Card */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 max-w-sm pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
              {selectedExample.type.toUpperCase()}
            </span>
            <h2 className="font-semibold text-slate-800">{selectedExample.title}</h2>
          </div>
          <p className="text-sm text-slate-600">{selectedExample.description}</p>
        </div>
      </div>
    </div>
  );
}
