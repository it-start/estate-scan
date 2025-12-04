import React, { useState, useMemo, useEffect } from 'react';
import { ProjectName, Language, FloorNode } from '../types';
import { FLOOR_PLAN_DATA } from '../data';
import { translations } from '../translations';
import { useFilters } from '../contexts/FilterContext';
import { ZoomIn, ZoomOut, Maximize, AlertCircle, LayoutGrid } from 'lucide-react';

interface FloorPlanViewerProps {
  activeProject: ProjectName;
  lang: Language;
}

interface UnitDisplayData {
  id: string;
  type: string;
  size: number;
  hasData: boolean;
}

const FloorSchematic = ({ floor, highlight, setHighlight }: { floor: FloorNode, highlight: string | null, setHighlight: (c: string | null) => void }) => {
  // Algorithmic Layout Generator
  // Assume a corridor layout: units split top/bottom
  const unitList = useMemo(() => {
    const units: UnitDisplayData[] = [];
    if (floor.unitRanges) {
      floor.unitRanges.forEach(range => {
        for (let i = range.start; i <= range.end; i++) {
          // Better logic: standard usually is Prefix + number. 
          // If prefix is 'A2', start is 1 -> 'A201' usually.
          let realId = `${range.prefix}${i.toString().padStart(2, '0')}`;
          // Correct specific Sierra logic if needed: A2 + 01 = A201
          if (range.prefix.length === 2 && !isNaN(Number(range.prefix[1]))) {
             // e.g. A2 -> A201
             realId = `${range.prefix}${i.toString().padStart(2, '0')}`;
          }

          const mapped = floor.unitMap?.[realId];
          units.push({
            id: realId,
            type: mapped?.type || 'Unknown',
            size: mapped?.size || 0,
            hasData: !!mapped
          });
        }
      });
    }
    return units;
  }, [floor]);

  const midPoint = Math.ceil(unitList.length / 2);
  const topRow = unitList.slice(0, midPoint);
  const bottomRow = unitList.slice(midPoint);

  // Unit Box Component
  const UnitBox = ({ unit }: { unit: UnitDisplayData }) => {
    const isHighlighted = highlight === unit.type;
    // Color coding based on type if available, else generic
    const getColor = () => {
       if (!unit.hasData) return 'bg-slate-100 border-slate-300 text-slate-400';
       if (unit.type.includes('1 Bedroom')) return 'bg-blue-100 border-blue-300 text-blue-700';
       if (unit.type.includes('2 Bedroom')) return 'bg-emerald-100 border-emerald-300 text-emerald-700';
       if (unit.type.includes('3 Bedroom')) return 'bg-amber-100 border-amber-300 text-amber-700';
       return 'bg-slate-200 border-slate-400 text-slate-600';
    };

    return (
      <div 
        className={`
          relative flex flex-col items-center justify-center p-2 border rounded shadow-sm transition-all duration-200 cursor-pointer
          ${getColor()}
          ${isHighlighted ? 'ring-4 ring-indigo-400 scale-105 z-10 shadow-lg' : 'hover:scale-105 hover:shadow-md hover:z-10'}
          min-w-[60px] h-[80px]
        `}
        onMouseEnter={() => setHighlight(unit.type)}
        onMouseLeave={() => setHighlight(null)}
      >
        <span className="font-mono text-xs font-bold">{unit.id}</span>
        {unit.hasData && (
          <span className="text-[10px] opacity-75">{unit.size.toFixed(0)}m²</span>
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs p-2 rounded z-20 whitespace-nowrap">
           {unit.type}
        </div>
      </div>
    );
  };

  return (
     <div className="flex flex-col gap-8 p-12 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 shadow-xl min-w-max">
        {/* Top Row */}
        <div className="flex gap-1">
           {topRow.map(u => <UnitBox key={u.id} unit={u} />)}
        </div>
        
        {/* Corridor */}
        <div className="h-12 bg-slate-100/50 border-y-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 font-bold tracking-[1em] uppercase select-none">
           Corridor
        </div>

        {/* Bottom Row - Reversed to simulate facing doors if desired, or standard order */}
        <div className="flex gap-1">
           {bottomRow.map(u => <UnitBox key={u.id} unit={u} />)}
        </div>
     </div>
  );
};

const FloorPlanViewer: React.FC<FloorPlanViewerProps> = ({ activeProject, lang }) => {
  const t = translations[lang].floorPlan;
  const { highlightedCategory, setHighlightedCategory } = useFilters();
  
  // State
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedFloorLevel, setSelectedFloorLevel] = useState<string | number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset state when project changes
  useEffect(() => {
    const projectData = FLOOR_PLAN_DATA.find(p => p.project === activeProject);
    if (projectData && projectData.buildings.length > 0) {
      setSelectedBuildingId(projectData.buildings[0].id);
      setSelectedFloorLevel(projectData.buildings[0].floors[0]?.level || null);
    } else {
      setSelectedBuildingId(null);
      setSelectedFloorLevel(null);
    }
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [activeProject]);

  // Derived Data
  const projectData = FLOOR_PLAN_DATA.find(p => p.project === activeProject);
  const selectedBuilding = projectData?.buildings.find(b => b.id === selectedBuildingId);
  const selectedFloor = selectedBuilding?.floors.find(f => f.level === selectedFloorLevel);

  // Zoom Handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  if (!projectData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
        <AlertCircle className="w-10 h-10 text-slate-400 mb-2" />
        <p className="text-slate-500">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] lg:h-[700px]">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        
        {/* Building & Floor Selection */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" /> Controls
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">{t.selectBuilding}</label>
              <select 
                value={selectedBuildingId || ''}
                onChange={(e) => {
                  setSelectedBuildingId(e.target.value);
                  // Reset floor to first available
                  const b = projectData.buildings.find(b => b.id === e.target.value);
                  if (b && b.floors.length > 0) setSelectedFloorLevel(b.floors[0].level);
                }}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
              >
                {projectData.buildings.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">{t.selectFloor}</label>
              <div className="grid grid-cols-4 gap-2">
                {selectedBuilding?.floors.map(f => (
                  <button
                    key={f.level}
                    onClick={() => setSelectedFloorLevel(f.level)}
                    className={`p-2 text-xs font-medium rounded-lg border transition-all ${
                      selectedFloorLevel === f.level 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {f.level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Panel */}
        {selectedFloor && (
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
              {t.floorComposition}
            </h3>

            <div className="mb-6">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{selectedFloor.unitCount}</div>
              <div className="text-xs text-slate-500">{t.totalUnitsOnFloor}</div>
            </div>

            <div className="space-y-4">
               {selectedFloor.unitRanges.map((range, idx) => (
                 <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700">{t.unitRange}</span>
                      <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                        {range.prefix}{range.start.toString().padStart(2,'0')} - {range.prefix}{range.end.toString().padStart(2,'0')}
                      </span>
                    </div>
                    {range.description && (
                      <div className="text-[10px] text-slate-500 italic mt-1">{range.description}</div>
                    )}
                 </div>
               ))}
            </div>

            {selectedFloor.notes && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 mb-2">{t.architecturalNotes}</h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-amber-50 p-3 rounded-lg border border-amber-100 text-amber-900">
                  {selectedFloor.notes[lang]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Visualizer */}
      <div className="flex-1 bg-slate-100 rounded-xl overflow-hidden relative shadow-inner group border border-slate-200">
        
        {/* Infinite Canvas */}
        <div 
          className={`w-full h-full flex items-center justify-center transition-transform duration-75 ease-out ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
           {selectedFloor ? (
              <FloorSchematic 
                floor={selectedFloor} 
                highlight={highlightedCategory} 
                setHighlight={setHighlightedCategory} 
              />
           ) : (
              <div className="text-slate-400 font-mono">Select a floor to view</div>
           )}
        </div>

        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white shadow-md p-2 rounded-lg border border-slate-100">
          <button onClick={handleZoomIn} className="p-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors" title="Zoom In">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={handleResetZoom} className="p-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors" title="Reset">
            <Maximize className="w-5 h-5" />
          </button>
          <button onClick={handleZoomOut} className="p-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors" title="Zoom Out">
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-slate-600 text-xs shadow border border-slate-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
           {t.zoomTip}
        </div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <h2 className="text-slate-800 font-bold text-sm tracking-wide">
            {activeProject}
          </h2>
          <div className="text-indigo-600 text-xs font-medium">
            {selectedBuilding?.name} • {selectedFloor?.label}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FloorPlanViewer;