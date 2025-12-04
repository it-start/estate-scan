
import React, { useState, useMemo, useEffect } from 'react';
import { ProjectName, Language, FloorNode, BuildingNode } from '../types';
import { FLOOR_PLAN_DATA } from '../data';
import { translations } from '../translations';
import { useFilters } from '../contexts/FilterContext';
import { ZoomIn, ZoomOut, Maximize, AlertCircle, LayoutGrid, Image as ImageIcon, ChevronDown, Map as MapIcon, ArrowLeft, Waves, Trees } from 'lucide-react';

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

// --- SITE SCHEMATIC COMPONENT ---

// Layout configurations for the schematic site plan
const PROJECT_LAYOUTS: Record<ProjectName, Array<{ id: string; label: string; x: number; y: number; w: number; h: number; rotate?: number; type?: 'residential' | 'facility'; tags?: string[] }>> = {
  [ProjectName.SIERRA]: [
    { id: 'sierra-a', label: 'Building A', x: 15, y: 15, w: 40, h: 25, type: 'residential' },
    { id: 'sierra-b', label: 'Building B', x: 60, y: 15, w: 25, h: 25, type: 'residential', tags: ['Sold Out'] }, // Placeholder
    { id: 'sierra-c', label: 'Building C', x: 25, y: 55, w: 50, h: 30, type: 'residential', tags: ['Pet Friendly'] },
    { id: 'pool', label: 'Swimming Pool', x: 30, y: 42, w: 40, h: 10, type: 'facility' }
  ],
  [ProjectName.CORALINA]: [
    // Loop around the lagoon
    { id: 'coralina-a', label: 'Bldg A', x: 10, y: 10, w: 18, h: 35, type: 'residential', tags: ['Pet Friendly'] },
    { id: 'coralina-b', label: 'Bldg B', x: 10, y: 55, w: 18, h: 35, type: 'residential', tags: ['Pet Friendly'] },
    { id: 'coralina-c', label: 'Bldg C', x: 72, y: 55, w: 18, h: 35, type: 'residential' },
    { id: 'coralina-d', label: 'Bldg D', x: 72, y: 10, w: 18, h: 35, type: 'residential' },
    
    // Central Lagoon
    { id: 'lagoon', label: 'Grand Lagoon', x: 32, y: 20, w: 36, h: 60, type: 'facility' },
  ],
  [ProjectName.SERENITY]: [
    // Linear / Lagoon layout placeholder
    { id: 'serenity-pool', label: '400m Lagoon', x: 10, y: 40, w: 80, h: 20, type: 'facility' },
    { id: 'serenity-a', label: 'Bldg A', x: 10, y: 10, w: 15, h: 25, type: 'residential' },
    { id: 'serenity-b', label: 'Bldg B', x: 30, y: 10, w: 15, h: 25, type: 'residential' },
    { id: 'serenity-c', label: 'Bldg C', x: 50, y: 10, w: 15, h: 25, type: 'residential' },
  ]
};

const SiteSchematic = ({ 
  project, 
  buildings, 
  onSelectBuilding 
}: { 
  project: ProjectName, 
  buildings: BuildingNode[], 
  onSelectBuilding: (id: string) => void 
}) => {
  const layout = PROJECT_LAYOUTS[project] || [];

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-50 overflow-hidden flex items-center justify-center select-none">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 opacity-10">
        <MapIcon size={120} />
      </div>

      <div className="relative w-full max-w-3xl aspect-[4/3] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden m-4">
        {/* Landscape/Greenery Base */}
        <div className="absolute inset-0 bg-[#f0fdf4] opacity-50" />

        {layout.map((item) => {
          // Check if this item maps to a real building in our data
          const buildingData = buildings.find(b => b.id === item.id);
          const isClickable = !!buildingData;
          const isFacility = item.type === 'facility';

          return (
            <div
              key={item.id}
              onClick={() => isClickable && onSelectBuilding(item.id)}
              className={`
                absolute flex items-center justify-center transition-all duration-300
                ${isClickable 
                  ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02] z-20' 
                  : isFacility 
                    ? 'z-0' 
                    : 'opacity-50 grayscale cursor-not-allowed z-10'
                }
                ${isFacility ? 'rounded-full' : 'rounded-lg border-2'}
              `}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.w}%`,
                height: `${item.h}%`,
                backgroundColor: isFacility 
                  ? '#e0f2fe' // Light Blue for pool
                  : isClickable 
                    ? 'white' 
                    : '#f1f5f9', // Slate for inactive
                borderColor: isFacility 
                  ? 'transparent'
                  : isClickable 
                    ? '#cbd5e1' 
                    : '#e2e8f0',
                transform: item.rotate ? `rotate(${item.rotate}deg)` : 'none'
              }}
            >
              {/* Facility Visuals */}
              {isFacility && (
                <div className="flex flex-col items-center text-sky-300 animate-pulse">
                  <Waves size={32} />
                </div>
              )}

              {/* Building Label */}
              {!isFacility && (
                 <div className="text-center">
                    <div className={`font-bold ${isClickable ? 'text-slate-800' : 'text-slate-400'} text-sm md:text-base`}>
                      {item.label}
                    </div>
                    {isClickable ? (
                       <div className="text-[10px] text-indigo-600 font-medium mt-1">
                          Select View
                       </div>
                    ) : (
                       <div className="text-[10px] text-slate-400 mt-1">
                          {item.tags?.[0] || 'N/A'}
                       </div>
                    )}
                 </div>
              )}

              {/* Tags (e.g. Pet Friendly) */}
              {item.tags?.includes('Pet Friendly') && (
                <div className="absolute -top-3 -right-3 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-emerald-200 flex items-center gap-1">
                   <Trees size={10} /> Pet Friendly
                </div>
              )}
            </div>
          );
        })}

        {/* Legend / Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-xs text-slate-500">
           <div className="font-bold text-slate-800 mb-1">{project} Site Plan</div>
           <div>Select a building to view floors</div>
        </div>

      </div>
    </div>
  );
};


// --- FLOOR SCHEMATIC COMPONENT ---

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
          relative flex flex-col items-center justify-center p-2 border rounded shadow-sm transition-all duration-200 cursor-pointer group
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
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs p-2 rounded z-20 whitespace-nowrap shadow-xl">
           <div className="font-bold">{unit.type}</div>
           {unit.hasData && <div className="text-[10px] font-normal opacity-80">{unit.size} SQ.M</div>}
           {/* Tooltip Arrow */}
           <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-[#f8fafc] overflow-hidden select-none">
      {/* Background Graphic (Stylized Placeholder) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Central "Blueprint" Icon/Watermark if no image */}
      {!floor.imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-[0.05] pointer-events-none">
           <ImageIcon size={300} strokeWidth={0.5} />
        </div>
      )}

      {/* Render Image if available */}
      {floor.imageUrl ? (
        <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
           <img 
             src={floor.imageUrl} 
             alt={`${floor.label} Plan`} 
             draggable={false}
             onDragStart={(e) => e.preventDefault()}
             className="max-w-full max-h-full object-contain shadow-2xl rounded-lg select-none" 
           />
        </div>
      ) : (
        /* Render Schematic (Interactive Boxes) if no image */
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-300 max-w-[95%]">
           <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-2xl flex flex-col gap-6 items-center">
              {/* Schematic Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase shadow-sm flex items-center gap-1.5 whitespace-nowrap z-20">
                <LayoutGrid size={10} />
                Schematic View
              </div>

              {/* Top Row */}
              <div className="flex gap-1.5 overflow-x-auto custom-scrollbar max-w-full pb-2">
                {topRow.map(u => <UnitBox key={u.id} unit={u} />)}
              </div>

              {/* Corridor */}
              <div className="w-full h-16 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center">
                 <span className="text-slate-300 text-xs font-bold tracking-[0.5em] uppercase select-none">Corridor</span>
              </div>

              {/* Bottom Row */}
              <div className="flex gap-1.5 overflow-x-auto custom-scrollbar max-w-full pb-2">
                {bottomRow.map(u => <UnitBox key={u.id} unit={u} />)}
              </div>
           </div>

           {/* "No Image" Indicator */}
           <div className="mt-6 flex items-center gap-2 text-slate-400 bg-white/60 px-4 py-2 rounded-full border border-slate-100 backdrop-blur-sm shadow-sm select-none">
              <AlertCircle size={14} />
              <span className="text-xs font-medium">Visual plan loading or unavailable</span>
           </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN VIEWER COMPONENT ---

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
  const [isNotesOpen, setIsNotesOpen] = useState(true);

  // Reset state when project changes (Default to Site Plan)
  useEffect(() => {
    setSelectedBuildingId(null);
    setSelectedFloorLevel(null);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setIsNotesOpen(true);
  }, [activeProject]);

  // Derived Data
  const projectData = FLOOR_PLAN_DATA.find(p => p.project === activeProject);
  const selectedBuilding = projectData?.buildings.find(b => b.id === selectedBuildingId);
  const selectedFloor = selectedBuilding?.floors.find(f => f.level === selectedFloorLevel);

  // Handlers
  const handleSelectBuilding = (id: string) => {
    setSelectedBuildingId(id);
    const b = projectData?.buildings.find(b => b.id === id);
    if (b && b.floors.length > 0) {
      setSelectedFloorLevel(b.floors[0].level);
    }
  };

  const handleBackToSite = () => {
    setSelectedBuildingId(null);
    setSelectedFloorLevel(null);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom Handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Basic zoom on wheel
    // e.preventDefault(); // Note: React synthetic event prevention might not always block native scroll if passive, but works for logic
    const delta = -e.deltaY;
    const factor = 0.05; // smoother wheel zoom
    const newZoom = Math.min(Math.max(zoomLevel + (delta > 0 ? factor : -factor), 0.5), 4);
    setZoomLevel(newZoom);
  };

  // Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection and native drag
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

  // --- RENDER ---

  // MODE: SITE PLAN
  if (!selectedBuildingId) {
    return (
      <div className="flex flex-col gap-4 animate-in fade-in duration-300">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-3">
             <MapIcon className="text-indigo-600" size={24} />
             <div>
               <h2 className="text-lg font-bold text-slate-800">{activeProject} Master Layout</h2>
               <p className="text-xs text-slate-500">Select a building to view floor plans</p>
             </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
             {projectData.buildings.length} Buildings Available
          </div>
        </div>

        <div className="w-full h-[600px] rounded-xl overflow-hidden border border-slate-200 shadow-inner">
           <SiteSchematic 
             project={activeProject} 
             buildings={projectData.buildings} 
             onSelectBuilding={handleSelectBuilding} 
           />
        </div>
      </div>
    );
  }

  // MODE: BUILDING / FLOOR VIEW
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] lg:h-[700px] animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        
        {/* Navigation & Selection */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <button 
            onClick={handleBackToSite}
            className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wide group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Site Plan
          </button>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">{t.selectBuilding}</label>
              <select 
                value={selectedBuildingId || ''}
                onChange={(e) => {
                  setSelectedBuildingId(e.target.value);
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
                <button 
                  onClick={() => setIsNotesOpen(!isNotesOpen)}
                  className="w-full flex items-center justify-between text-left mb-2 group"
                >
                  <h4 className="text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                    {t.architecturalNotes}
                  </h4>
                  <ChevronDown 
                    size={14} 
                    className={`text-slate-400 transition-transform duration-200 ${isNotesOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isNotesOpen && (
                  <div className="animate-fadeIn">
                    <p className="text-sm text-slate-700 leading-relaxed bg-amber-50 p-3 rounded-lg border border-amber-100 text-amber-900">
                      {selectedFloor.notes[lang]}
                    </p>
                  </div>
                )}
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
          onWheel={handleWheel}
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
        <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white shadow-md p-2 rounded-lg border border-slate-100 z-30">
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

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-slate-600 text-xs shadow border border-slate-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30">
           {t.zoomTip}
        </div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-200 shadow-sm z-30">
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
