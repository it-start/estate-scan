
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ProjectInfo, ProjectName, Language } from '../types';
import { translations } from '../translations';

interface ProjectMapProps {
  projects: ProjectInfo[];
  lang: Language;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ projects, lang }) => {
  const t = translations[lang];

  // Phuket Coordinates as default center
  const center = { lat: 8.019, lng: 98.292 };

  const getMarkerColor = (name: ProjectName) => {
    switch (name) {
      case ProjectName.CORALINA: return '#F43F5E'; // rose-500
      case ProjectName.SERENITY: return '#10B981'; // emerald-500
      case ProjectName.SIERRA: return '#0EA5E9';   // sky-500
      default: return '#64748b';
    }
  };

  const createCustomIcon = (color: string) => {
    // Creating a lightweight SVG string for the icon
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3" fill="white"/>
      </svg>
    `;
    
    return L.divIcon({
      className: 'custom-pin-icon',
      html: svg,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
           <h3 className="text-lg font-bold text-slate-800">{t.map.title}</h3>
           <p className="text-xs text-slate-500">{t.map.subtitle}</p>
        </div>
      </div>
      
      <div className="h-[400px] w-full rounded-lg overflow-hidden border border-slate-100 z-0 relative">
        <MapContainer 
          center={[center.lat, center.lng]} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {projects.map(p => (
            <Marker 
              key={p.name} 
              position={[p.coordinates.lat, p.coordinates.lng]}
              icon={createCustomIcon(getMarkerColor(p.name))}
            >
              <Popup>
                <div className="font-sans">
                  <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                  <p className="text-xs text-slate-600 mb-2">{p.location[lang]}</p>
                  <div className="flex gap-2 text-[10px]">
                    <span className="bg-slate-100 px-1 py-0.5 rounded text-slate-600 border border-slate-200">
                      {p.totalUnits} Units
                    </span>
                    <span className="bg-slate-100 px-1 py-0.5 rounded text-slate-600 border border-slate-200">
                      {p.landAreaRai} Rai
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ProjectMap;
