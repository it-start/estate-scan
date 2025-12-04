import { UnitPlan, ProjectName, ProjectInfo, ProjectFloorPlan } from './types';

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
    coordinates: {
      lat: 7.951933,
      lng: 98.283483
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
      facilityDensity: 1.5,
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
    coordinates: {
      lat: 8.086300,
      lng: 98.298200
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
      facilityDensity: 2.0,
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
    coordinates: {
      lat: 7.993000,
      lng: 98.304000
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
      facilityDensity: 4.0,
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

export const FLOOR_PLAN_DATA: ProjectFloorPlan[] = [
  {
    project: ProjectName.SIERRA,
    buildings: [
      {
        id: 'sierra-a',
        name: 'Building A',
        floors: [
          {
            level: 2,
            label: '2nd Floor',
            unitCount: 26,
            unitRanges: [{ prefix: 'A2', start: 1, end: 26 }],
            unitMap: {
               // Derived from PDF Page 2
               'A201': { type: '1 Bedroom S', size: 28.38 },
               'A202': { type: '1 Bedroom Plus C', size: 46.54 },
               'A203': { type: '2 Bedroom SC', size: 55.65 },
               'A204': { type: '1 Bedroom Plus', size: 44.00 },
               'A205': { type: '1 Bedroom M', size: 30.32 },
               'A206': { type: '1 Bedroom M', size: 30.32 },
               'A207': { type: '1 Bedroom M', size: 30.32 },
               'A208': { type: '1 Bedroom M', size: 30.32 },
               'A209': { type: '1 Bedroom MC2', size: 30.98 },
               'A210': { type: '1 Bedroom S (M)', size: 28.38 },
               'A211': { type: '1 Bedroom S (M)', size: 28.38 },
               'A212': { type: '1 Bedroom S (M)', size: 28.38 },
               'A213': { type: '1 Bedroom S', size: 28.38 },
               'A214': { type: '1 Bedroom S (M)', size: 28.38 },
               'A215': { type: '1 Bedroom S', size: 28.38 },
               'A216': { type: '1 Bedroom S (M)', size: 28.38 },
               'A217': { type: '1 Bedroom S', size: 28.38 },
               'A218': { type: '1 Bedroom S (M)', size: 28.38 },
               'A219': { type: '1 Bedroom S', size: 28.38 },
               'A220': { type: '1 Bedroom MC2 (M)', size: 30.98 },
               'A221': { type: '1 Bedroom MC2', size: 30.98 },
               'A222': { type: '1 Bedroom M', size: 30.32 },
               'A223': { type: '1 Bedroom M (M)', size: 30.32 },
               'A224': { type: '2 Bedroom M', size: 58.07 },
               'A225': { type: '2 Bedroom M (M)', size: 58.07 },
               'A226': { type: '1 Bedroom Plus', size: 44.00 },
            },
            notes: { en: 'L-shaped single loaded corridor', ru: 'L-образный коридор с односторонней загрузкой' }
          },
          {
            level: 3,
            label: '3rd Floor',
            unitCount: 26,
            unitRanges: [{ prefix: 'A3', start: 1, end: 26 }]
          },
          {
             level: 4,
             label: '4th Floor',
             unitCount: 26,
             unitRanges: [{ prefix: 'A4', start: 1, end: 26 }]
          },
          {
             level: 5,
             label: '5th Floor',
             unitCount: 26,
             unitRanges: [{ prefix: 'A5', start: 1, end: 26 }]
          },
          {
             level: 6,
             label: '6th Floor',
             unitCount: 26,
             unitRanges: [{ prefix: 'A6', start: 1, end: 26 }]
          },
          {
             level: 7,
             label: '7th Floor',
             unitCount: 26,
             unitRanges: [{ prefix: 'A7', start: 1, end: 26 }]
          },
          {
             level: 8,
             label: '8th Floor',
             unitCount: 26,
             unitRanges: [{ prefix: 'A8', start: 1, end: 26 }]
          }
        ]
      },
      {
         id: 'sierra-c',
         name: 'Building C',
         floors: [
            { 
              level: 2, 
              label: '2nd Floor', 
              unitCount: 17, 
              unitRanges: [{ prefix: 'C2', start: 1, end: 17 }],
              unitMap: {
                // Extracted from Page 9
                'C201': { type: '1 Bedroom M', size: 30.32 },
                'C202': { type: '1 Bedroom M (M)', size: 30.32 },
                'C203': { type: '1 Bedroom MC2 (M)', size: 30.98 },
                'C204': { type: '1 Bedroom Plus C (M)', size: 46.54 },
                'C205': { type: '1 Bedroom Plus', size: 44.00 },
                'C206': { type: '1 Bedroom M (M)', size: 30.32 },
                'C207': { type: '1 Bedroom M (M)', size: 30.32 },
                'C208': { type: '1 Bedroom Plus (M)', size: 44.00 },
                'C209': { type: '2 Bedroom M (M)', size: 58.07 },
                'C210': { type: '1 Bedroom Plus (M)', size: 44.00 },
                'C211': { type: '1 Bedroom Plus', size: 44.00 },
                'C212': { type: '1 Bedroom Plus C', size: 46.54 },
                'C213': { type: '1 Bedroom MC1', size: 30.32 },
                'C214': { type: '1 Bedroom S (M)', size: 28.38 },
                'C215': { type: '1 Bedroom S', size: 28.38 },
                'C216': { type: '1 Bedroom S (M)', size: 28.38 },
                'C217': { type: '1 Bedroom M', size: 30.32 },
              },
              notes: { en: 'Pet-Friendly Building (C) - 2nd Floor layout', ru: 'Корпус C (для питомцев) - планировка 2-го этажа' }
            },
            { level: 3, label: '3rd Floor', unitCount: 19, unitRanges: [{ prefix: 'C3', start: 1, end: 19 }] },
            { level: 4, label: '4th Floor', unitCount: 19, unitRanges: [{ prefix: 'C4', start: 1, end: 19 }] },
            { level: 5, label: '5th Floor', unitCount: 19, unitRanges: [{ prefix: 'C5', start: 1, end: 19 }] },
            { level: 6, label: '6th Floor', unitCount: 19, unitRanges: [{ prefix: 'C6', start: 1, end: 19 }] },
            { level: 7, label: '7th Floor', unitCount: 19, unitRanges: [{ prefix: 'C7', start: 1, end: 19 }] },
            { level: 8, label: '8th Floor', unitCount: 13, unitRanges: [{ prefix: 'C8', start: 1, end: 13 }] }
         ]
      }
    ]
  },
  {
   project: ProjectName.CORALINA,
   buildings: [
      {
         id: 'coralina-a',
         name: 'Building A',
         floors: [
            { level: 1, label: '1st Floor', unitCount: 5, unitRanges: [{ prefix: 'SH', start: 1, end: 5, description: 'Shop/Garden Units' }] },
            { 
              level: 2, 
              label: '2nd Floor', 
              unitCount: 6, 
              unitRanges: [{ prefix: 'A2', start: 1, end: 6 }],
              unitMap: {
                // Page 4
                'A201': { type: '2 Bedroom', size: 64 },
                'A202': { type: '2 Bedroom', size: 64 },
                'A203': { type: '1 Bedroom Plus', size: 46 },
                'A204': { type: '1 Bedroom Plus', size: 46 },
                'A205': { type: '1 Bedroom Plus', size: 46 },
                'A206': { type: '1 Bedroom M', size: 31 },
              }
            },
            { level: 3, label: '3rd Floor', unitCount: 10, unitRanges: [{ prefix: 'A3', start: 1, end: 10 }] },
            { level: 4, label: '4th Floor', unitCount: 10, unitRanges: [{ prefix: 'A4', start: 1, end: 10 }] },
            { level: 5, label: '5th Floor', unitCount: 10, unitRanges: [{ prefix: 'A5', start: 1, end: 10 }] },
            { level: 6, label: '6th Floor', unitCount: 10, unitRanges: [{ prefix: 'A6', start: 1, end: 10 }] },
            { level: 7, label: '7th Floor', unitCount: 10, unitRanges: [{ prefix: 'A7', start: 1, end: 10 }] },
            { level: 'Roof', label: 'Roof Floor', unitCount: 0, unitRanges: [], notes: { en: 'Roof Garden & Utilities', ru: 'Сад на крыше и коммуникации' } }
         ]
      },
      {
         id: 'coralina-b',
         name: 'Building B',
         floors: [
            { level: 1, label: '1st Floor', unitCount: 8, unitRanges: [{ prefix: 'B1', start: 1, end: 8 }] },
            { 
              level: 2, 
              label: '2nd Floor', 
              unitCount: 8, 
              unitRanges: [{ prefix: 'B2', start: 1, end: 8 }],
              unitMap: {
                // Page 13
                'B201': { type: '1 Bedroom S', size: 26 },
                'B202': { type: '1 Bedroom M', size: 31 },
                'B203': { type: '2 Bedroom', size: 64 },
                'B204': { type: '2 Bedroom', size: 64 },
                'B205': { type: '2 Bedroom', size: 64 },
                'B206': { type: '1 Bedroom Plus', size: 46 },
                'B207': { type: '1 Bedroom M', size: 31 },
                'B208': { type: '1 Bedroom M', size: 31 },
              }
            },
            { level: 3, label: '3rd Floor', unitCount: 8, unitRanges: [{ prefix: 'B3', start: 1, end: 8 }] },
            { level: 4, label: '4th Floor', unitCount: 8, unitRanges: [{ prefix: 'B4', start: 1, end: 8 }] },
            { level: 5, label: '5th Floor', unitCount: 8, unitRanges: [{ prefix: 'B5', start: 1, end: 8 }] },
            { level: 6, label: '6th Floor', unitCount: 8, unitRanges: [{ prefix: 'B6', start: 1, end: 8 }] },
            { level: 7, label: '7th Floor', unitCount: 6, unitRanges: [{ prefix: 'B7', start: 1, end: 6 }] },
            { level: 'Roof', label: 'Roof Floor', unitCount: 2, unitRanges: [{ prefix: 'B7', start: 3, end: 4, description: 'Upper Duplex Part' }] }
         ]
      },
      {
         id: 'coralina-c',
         name: 'Building C',
         floors: [
            { level: 1, label: '1st Floor', unitCount: 10, unitRanges: [{ prefix: 'C1', start: 1, end: 10 }] },
            { 
              level: 2, 
              label: '2nd Floor', 
              unitCount: 10, 
              unitRanges: [{ prefix: 'C2', start: 1, end: 10 }],
              unitMap: {
                // Page 22
                'C201': { type: '1 Bedroom M', size: 31 },
                'C202': { type: '1 Bedroom M', size: 31 },
                'C203': { type: '1 Bedroom M', size: 31 },
                'C204': { type: '1 Bedroom M', size: 31 },
                'C205': { type: '1 Bedroom Plus', size: 46 },
                'C206': { type: '1 Bedroom Plus', size: 46 },
                'C207': { type: '2 Bedroom', size: 64 },
                'C208': { type: '2 Bedroom', size: 64 },
                'C209': { type: '1 Bedroom M', size: 31 },
                'C210': { type: '1 Bedroom S', size: 26 },
              }
            },
            { level: 3, label: '3rd Floor', unitCount: 10, unitRanges: [{ prefix: 'C3', start: 1, end: 10 }] },
            { level: 4, label: '4th Floor', unitCount: 10, unitRanges: [{ prefix: 'C4', start: 1, end: 10 }] },
            { level: 5, label: '5th Floor', unitCount: 10, unitRanges: [{ prefix: 'C5', start: 1, end: 10 }] },
            { level: 6, label: '6th Floor', unitCount: 10, unitRanges: [{ prefix: 'C6', start: 1, end: 10 }] },
            { level: 7, label: '7th Floor', unitCount: 5, unitRanges: [{ prefix: 'C7', start: 1, end: 5 }] },
            { level: 'Roof', label: 'Roof Floor', unitCount: 3, unitRanges: [{ prefix: 'C7', start: 1, end: 3, description: 'Upper Penthouse Part' }] }
         ]
      },
      {
         id: 'coralina-d',
         name: 'Building D',
         floors: [
            { level: 1, label: '1st Floor', unitCount: 10, unitRanges: [{ prefix: 'D1', start: 1, end: 10 }] },
            { 
              level: 2, 
              label: '2nd Floor', 
              unitCount: 10, 
              unitRanges: [{ prefix: 'D2', start: 1, end: 10 }],
              unitMap: {
                // Page 31
                'D201': { type: '1 Bedroom Plus', size: 46 },
                'D202': { type: '1 Bedroom Plus', size: 46 },
                'D203': { type: '1 Bedroom Plus', size: 46 },
                'D204': { type: '1 Bedroom Plus', size: 46 },
                'D205': { type: '1 Bedroom Plus', size: 46 },
                'D206': { type: '1 Bedroom M', size: 31 },
                'D207': { type: '2 Bedroom', size: 64 },
                'D208': { type: '2 Bedroom', size: 64 },
                'D209': { type: '1 Bedroom Plus', size: 46 },
                'D210': { type: '2 Bedroom', size: 64 },
              }
            },
            { level: 3, label: '3rd Floor', unitCount: 10, unitRanges: [{ prefix: 'D3', start: 1, end: 10 }] },
            { level: 4, label: '4th Floor', unitCount: 10, unitRanges: [{ prefix: 'D4', start: 1, end: 10 }] },
            { level: 5, label: '5th Floor', unitCount: 10, unitRanges: [{ prefix: 'D5', start: 1, end: 10 }] },
            { level: 6, label: '6th Floor', unitCount: 10, unitRanges: [{ prefix: 'D6', start: 1, end: 10 }] },
            { level: 7, label: '7th Floor', unitCount: 7, unitRanges: [{ prefix: 'D7', start: 1, end: 7 }] },
            { level: 'Roof', label: 'Roof Floor', unitCount: 3, unitRanges: [{ prefix: 'D7', start: 2, end: 7, description: 'Upper Penthouse Part' }] }
         ]
      }
   ]
  }
];
