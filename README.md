# Estate Unit Analyzer

The **Estate Unit Analyzer** is a sophisticated React application designed for the technical and comparative analysis of real estate development projects. It enables users to perform deep dives into unit specifications, facility overlaps, and master plan strategies across multiple properties (Coralina, Serenity, Sierra).

## 🚀 Key Features

### 1. Multi-Dimensional Analysis
Switch between three distinct analysis modes to focus on different aspects of the developments:
- **Facilities**: Visualize common and unique amenities using set theory logic.
- **Unit Types**: Analyze unit inventory, comparing sizes and categories across projects.
- **Master Plan**: Compare high-level project metrics like density, green space ratios, and layout strategies.

### 2. Set Theory Visualization
The core of the application uses a custom "Set Analysis" engine to visualize the intersection and union of data sets.
- **Intersection**: Automatically identifies amenities or unit types present in all selected projects.
- **Unique Offerings**: Highlights features exclusive to a specific project.
- **Pairwise Overlaps**: Shows what any two projects share, excluding the third.

### 3. Context-Aware Filtering
The sidebar adapts to the active analysis mode:
- **Global**: Toggle projects (Coralina, Serenity, Sierra) to include/exclude them from calculations.
- **Unit Mode**: Filter by Unit Size (Min/Max SQ.M), Categories (1 Bed, 2 Bed, etc.), and Sub-Categories.
- **Facilities Mode**: Filter projects based on specific amenities (e.g., Show only projects with "Pet Friendly" or "Onsen").

### 4. Interactive Data Visualization
- **Charts**: Comparative bar charts for average unit sizes.
- **Metrics Dashboard**: Visual cards for density (Units/Rai), green space ratios, and common area analysis.
- **Data Grid**: A detailed, filterable table listing individual unit plans with codes and sizes.

### 5. Localization
Fully bilingual support for **English** and **Russian**, switchable instantly via the global UI toggle.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide React

## 📂 Project Structure

- **`src/data.ts`**: The central database.
  - `PROJECT_SPECS`: High-level project attributes (Land Area, Density, Facilities list).
  - `RAW_DATA`: Granular unit inventory (Codes, Sizes, Categories).
- **`src/types.ts`**: TypeScript definitions for the data models (`ProjectInfo`, `UnitPlan`).
- **`src/translations.ts`**: Localization dictionary for UI labels and data values.
- **`src/components/`**:
  - `SetAnalysis.tsx`: The logic and view for Venn-diagram-style data distribution.
  - `MasterPlanComparison.tsx`: Dashboard for density and layout analysis.
  - `UnitTable.tsx`: Tabular view of unit data.
  - `AnalysisChart.tsx`: Bar charts for statistical comparison.

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    # or
    bun run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 📊 Data Model

The application relies on two main data structures to separate concerns:

1.  **`ProjectInfo`**: Describes the macro-level attributes. Used for Master Plan comparisons and Facility set analysis.
2.  **`UnitPlan`**: Describes individual unit configurations. Used for the Unit Table, Size Charts, and Unit Category set analysis.

This separation allows the app to perform both high-level strategic analysis and low-level inventory filtering simultaneously.
