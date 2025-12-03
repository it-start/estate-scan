import { UnitPlan, ProjectName, ProjectInfo } from './types';

// Normalized Facility Tags for Analysis
const FACILITIES = {
  POOL: 'Swimming Pool',
  GYM: 'Fitness/Gym',
  COWORKING: 'Co-Working Space',
  PETS: 'Pet Friendly',
  ONSEN: 'Onsen',
  STEAM: 'Steam Room',
  SAUNA: 'Sauna',
  THEATER: 'Theater/Karaoke',
  GAME_ROOM: 'Game Room/Arcade',
  KIDS_CLUB: 'Kids Zone',
  LAUNDRY: 'Laundry Service',
  CO_KITCHEN: 'Co-Kitchen',
  SKY_LOUNGE: 'Sky Lounge/Deck',
  LIBRARY: 'Library',
  SHUTTLE: 'Shuttle Service'
};

export const PROJECT_SPECS: ProjectInfo[] = [
  {
    name: ProjectName.CORALINA,
    totalUnits: 564,
    landAreaRai: '11-1-27.58',
    landAreaSqm: 18110,
    buildings: 8,
    storeys: 7,
    location: {
      en: 'Kamala Beach (430m to beach)',
      ru: 'Пляж Камала (430м до моря)'
    },
    unitTypes: ['1 Bedroom', '1 Bedroom Plus', '2 Bedroom', '2 Bedroom Plus', '2 Bedroom Penthouse', '3 Bedroom Penthouse'],
    facilities: [
      FACILITIES.POOL, FACILITIES.GYM, FACILITIES.COWORKING, FACILITIES.PETS, 
      FACILITIES.ONSEN, FACILITIES.STEAM, FACILITIES.SAUNA, FACILITIES.GAME_ROOM,
      FACILITIES.KIDS_CLUB, FACILITIES.LAUNDRY, FACILITIES.CO_KITCHEN, FACILITIES.LIBRARY
    ],
    masterPlan: {
      unitsPerRai: 49.8, 
      greenSpaceRatio: 16.0, 
      commonAreaPerUnit: 9.9, 
      totalCommonArea: 5600,
      distinctZones: [
        { en: 'Quiet Zone', ru: 'Тихая зона' },
        { en: 'Active Zone', ru: 'Активная зона' },
        { en: 'Pet-Friendly Bldgs (A, B)', ru: 'Корпуса для питомцев (A, B)' }
      ]
    },
    layoutFeatures: [
      { 
        category: 'Facilities', 
        description: { 
          en: 'Dual-Level: Massive ground lagoon + Rooftop infinity pools', 
          ru: 'Двухуровневая система: огромная лагуна на земле + инфинити бассейны на крыше' 
        }, 
        icon: 'layers' 
      },
      { 
        category: 'Zoning', 
        description: { 
          en: 'Pet-Friendly restricted to Buildings A & B for noise control', 
          ru: 'Зона для питомцев ограничена корпусами A и B для контроля шума' 
        }, 
        icon: 'paw' 
      },
      { 
        category: 'Orientation', 
        description: { 
          en: 'Organic building shapes maximizing sea/mountain views', 
          ru: 'Органические формы зданий, максимизирующие виды на море и горы' 
        }, 
        icon: 'compass' 
      }
    ]
  },
  {
    name: ProjectName.SERENITY,
    totalUnits: 814,
    landAreaRai: '13-3-13.25',
    landAreaSqm: 22053,
    buildings: 6,
    storeys: 7,
    location: {
      en: 'Naiyang Beach (400m to beach)',
      ru: 'Пляж Найянг (400м до моря)'
    },
    unitTypes: ['1 Bedroom', '2 Bedroom', '3 Bedroom'],
    facilities: [
      FACILITIES.POOL, FACILITIES.GYM, FACILITIES.COWORKING, FACILITIES.ONSEN,
      FACILITIES.STEAM, FACILITIES.SAUNA, FACILITIES.THEATER, FACILITIES.GAME_ROOM,
      FACILITIES.KIDS_CLUB, FACILITIES.LAUNDRY, FACILITIES.CO_KITCHEN, FACILITIES.SKY_LOUNGE
    ],
    masterPlan: {
      unitsPerRai: 59.1, 
      greenSpaceRatio: 17.0, 
      commonAreaPerUnit: 4.6, 
      totalCommonArea: 3750,
      distinctZones: [
        { en: 'Lagoon Center', ru: 'Центральная лагуна' },
        { en: 'Separate Parking Bldg', ru: 'Отдельное здание парковки' },
        { en: 'Entrance Clubhouse', ru: 'Входной клубный дом' }
      ]
    },
    layoutFeatures: [
      { 
        category: 'Facilities', 
        description: { 
          en: 'Horizontal Focus: 400m long continuous lagoon pool system', 
          ru: 'Горизонтальный фокус: непрерывная система бассейнов-лагун длиной 400м' 
        }, 
        icon: 'minimize' 
      },
      { 
        category: 'Parking', 
        description: { 
          en: 'Separate Parking Building - Car-free internal zones', 
          ru: 'Отдельное здание парковки - внутренние зоны без машин' 
        }, 
        icon: 'car' 
      },
      { 
        category: 'Zoning', 
        description: { 
          en: 'Pavilion-based amenities (Theater, Leisure) separated from residential', 
          ru: 'Павильонные удобства (Театр, Отдых) отделены от жилых зон' 
        }, 
        icon: 'map' 
      }
    ]
  },
  {
    name: ProjectName.SIERRA,
    totalUnits: 452,
    landAreaRai: '4-1-29.23',
    landAreaSqm: 6917,
    buildings: 3,
    storeys: 8,
    location: {
      en: 'Bang-Tao (Near Boat Avenue)',
      ru: 'Банг-Тао (Рядом с Boat Avenue)'
    },
    unitTypes: ['1 Bedroom', '1 Bedroom Plus', '2 Bedroom'],
    facilities: [
      FACILITIES.POOL, FACILITIES.GYM, FACILITIES.COWORKING, FACILITIES.PETS,
      FACILITIES.STEAM, FACILITIES.THEATER, FACILITIES.GAME_ROOM, FACILITIES.KIDS_CLUB,
      FACILITIES.LAUNDRY, FACILITIES.SKY_LOUNGE, FACILITIES.SHUTTLE, 'Meeting Room'
    ],
    masterPlan: {
      unitsPerRai: 104.6, 
      greenSpaceRatio: 25.2, 
      commonAreaPerUnit: 3.4, 
      totalCommonArea: 1525,
      distinctZones: [
        { en: 'Pet Building (C)', ru: 'Корпус для питомцев (C)' },
        { en: 'Sky Facilities', ru: 'Удобства на крыше' },
        { en: 'Hidden Yard', ru: 'Скрытый двор' }
      ]
    },
    layoutFeatures: [
      { 
        category: 'Zoning', 
        description: { 
          en: 'Building C explicitly marked as Pet-Friendly', 
          ru: 'Корпус C специально выделен для проживания с питомцами' 
        }, 
        icon: 'paw' 
      },
      { 
        category: 'Facilities', 
        description: { 
          en: 'Vertical Living: High utility of roof space (Cloud Lounge, Luna Pool)', 
          ru: 'Вертикальная жизнь: Высокое использование пространства крыши (Cloud Lounge, Luna Pool)' 
        }, 
        icon: 'arrow-up' 
      },
      { 
        category: 'Orientation', 
        description: { 
          en: 'High Density Urban Layout optimized for convenience', 
          ru: 'Высокоплотная городская планировка, оптимизированная для удобства' 
        }, 
        icon: 'grid' 
      }
    ]
  }
];

export const RAW_DATA: UnitPlan[] = [
  // --- CORALINA ---
  { id: 'c-1', project: ProjectName.CORALINA, name: '1 Bedroom S', code: '1BSC1', category: '1 Bedroom', subCategory: 'S', minSize: 26, maxSize: 26 },
  { id: 'c-2', project: ProjectName.CORALINA, name: '1 Bedroom S', code: '1BSC1M', category: '1 Bedroom', subCategory: 'S', minSize: 26, maxSize: 26 },
  { id: 'c-3', project: ProjectName.CORALINA, name: '1 Bedroom S', code: '1BSC2', category: '1 Bedroom', subCategory: 'S', minSize: 26, maxSize: 26 },
  { id: 'c-4', project: ProjectName.CORALINA, name: '1 Bedroom S', code: '1BSG1', category: '1 Bedroom', subCategory: 'S', minSize: 26, maxSize: 26 },
  { id: 'c-5', project: ProjectName.CORALINA, name: '1 Bedroom S', code: '1BS', category: '1 Bedroom', subCategory: 'S', minSize: 27, maxSize: 27 },
  { id: 'c-6', project: ProjectName.CORALINA, name: '1 Bedroom S', code: '1BSA', category: '1 Bedroom', subCategory: 'S', minSize: 31, maxSize: 31 },
  { id: 'c-7', project: ProjectName.CORALINA, name: '1 Bedroom M', code: '1BM', category: '1 Bedroom', subCategory: 'M', minSize: 31, maxSize: 31 },
  { id: 'c-8', project: ProjectName.CORALINA, name: '1 Bedroom M', code: '1BMAC1', category: '1 Bedroom', subCategory: 'M', minSize: 35, maxSize: 35 },
  { id: 'c-9', project: ProjectName.CORALINA, name: '1 Bedroom M', code: '1BMB', category: '1 Bedroom', subCategory: 'M', minSize: 33, maxSize: 33 },
  { id: 'c-10', project: ProjectName.CORALINA, name: '1 Bedroom M', code: '1BMC1', category: '1 Bedroom', subCategory: 'M', minSize: 30, maxSize: 30 },
  { id: 'c-11', project: ProjectName.CORALINA, name: '1 Bedroom Plus', code: '1 Bed Plus', category: '1 Bedroom Plus', subCategory: 'Standard', minSize: 46, maxSize: 49 },
  { id: 'c-12', project: ProjectName.CORALINA, name: '2 Bedroom', code: '2 Bed', category: '2 Bedroom', subCategory: 'Standard', minSize: 64, maxSize: 68 },
  { id: 'c-13', project: ProjectName.CORALINA, name: '2 Bedroom Plus', code: '2 Bed Plus', category: '2 Bedroom Plus', subCategory: 'Plus', minSize: 98, maxSize: 107 },
  { id: 'c-14', project: ProjectName.CORALINA, name: 'Penthouse', code: '3 Bed PH', category: '3 Bedroom Penthouse', subCategory: 'Penthouse', minSize: 128, maxSize: 128 },

  // --- SERENITY ---
  { id: 'se-1', project: ProjectName.SERENITY, name: '1 Bedroom S', code: '1 Bedroom SA/S/SX', category: '1 Bedroom', subCategory: 'S', minSize: 26, maxSize: 28 },
  { id: 'se-2', project: ProjectName.SERENITY, name: '1 Bedroom M', code: '1 Bedroom MA/M/MX', category: '1 Bedroom', subCategory: 'M', minSize: 30, maxSize: 32 },
  { id: 'se-3', project: ProjectName.SERENITY, name: '1 Bedroom L', code: '1 Bedroom LA/L/LX', category: '1 Bedroom', subCategory: 'L', minSize: 36, maxSize: 39 },
  { id: 'se-4', project: ProjectName.SERENITY, name: '2 Bedroom S', code: '2 Bedroom SA/S/SX', category: '2 Bedroom', subCategory: 'S', minSize: 56, maxSize: 58 },
  { id: 'se-5', project: ProjectName.SERENITY, name: '2 Bedroom M', code: '2 Bedroom MA/M/MX', category: '2 Bedroom', subCategory: 'M', minSize: 60, maxSize: 62 },
  { id: 'se-6', project: ProjectName.SERENITY, name: '2 Bedroom L', code: '2 Bedroom LA/L/LX', category: '2 Bedroom', subCategory: 'L', minSize: 61, maxSize: 65 },
  { id: 'se-7', project: ProjectName.SERENITY, name: '3 Bedroom', code: '3 Bedroom A', category: '3 Bedroom', subCategory: 'Standard', minSize: 112, maxSize: 117 },
  { id: 'se-8', project: ProjectName.SERENITY, name: '3 Bedroom L', code: '3 Bedroom LA/L', category: '3 Bedroom', subCategory: 'L', minSize: 119, maxSize: 123 },

  // --- SIERRA ---
  { id: 'si-1', project: ProjectName.SIERRA, name: '1 Bedroom S', code: '1 Bedroom S', category: '1 Bedroom', subCategory: 'S', minSize: 28.38, maxSize: 28.38 },
  { id: 'si-2', project: ProjectName.SIERRA, name: '1 Bedroom S (M)', code: '1 Bedroom S (M)', category: '1 Bedroom', subCategory: 'S', minSize: 28.38, maxSize: 28.38 },
  { id: 'si-3', project: ProjectName.SIERRA, name: '1 Bedroom M', code: '1 Bedroom M', category: '1 Bedroom', subCategory: 'M', minSize: 30.32, maxSize: 30.32 },
  { id: 'si-4', project: ProjectName.SIERRA, name: '1 Bedroom MC1', code: '1 Bedroom MC1', category: '1 Bedroom', subCategory: 'M', minSize: 30.32, maxSize: 30.32 },
  { id: 'si-5', project: ProjectName.SIERRA, name: '1 Bedroom MC2', code: '1 Bedroom MC2', category: '1 Bedroom', subCategory: 'M', minSize: 30.98, maxSize: 30.98 },
  { id: 'si-6', project: ProjectName.SIERRA, name: '1 Bedroom Plus', code: '1 Bedroom Plus', category: '1 Bedroom Plus', subCategory: 'Standard', minSize: 44.00, maxSize: 44.00 },
  { id: 'si-7', project: ProjectName.SIERRA, name: '1 Bedroom Plus C', code: '1 Bedroom Plus C', category: '1 Bedroom Plus', subCategory: 'C', minSize: 46.54, maxSize: 46.54 },
  { id: 'si-8', project: ProjectName.SIERRA, name: '2 Bedroom S', code: '2 Bedroom S', category: '2 Bedroom', subCategory: 'S', minSize: 55.65, maxSize: 55.65 },
  { id: 'si-9', project: ProjectName.SIERRA, name: '2 Bedroom M', code: '2 Bedroom M', category: '2 Bedroom', subCategory: 'M', minSize: 58.07, maxSize: 58.07 },
];