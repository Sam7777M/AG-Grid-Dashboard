# FactWise Employee Insights Dashboard

This project showcases an interactive employee analytics dashboard built with React, Vite, TypeScript, and AG Grid (client-side). It renders the 20-row sample dataset provided in the assessment brief and exposes a range of data exploration capabilities.

## Features

- AG Grid with sorting, filtering, pagination, pinned summary row, side panels, and quick search.
- Insight cards summarizing headcount, active workforce, departmental breadth, and key averages.
- Sticky detail panel that reveals richer context for the selected employee, including skills and leadership chain.
- Responsive layout with modern styling designed to feel like a production-ready dashboard experience.

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

# Screenshots
1) Dashboard
<img width="1440" height="900" alt="image" src="https://github.com/user-attachments/assets/efcfdbe4-66c3-4acb-8ad5-bbcd92bf3dbc" />

2) 
<img width="1440" height="900" alt="image" src="https://github.com/user-attachments/assets/8ccc49a1-f9e0-4a99-8d3f-8df3e4e4a7b8" />

3) Sorting
<img width="1440" height="900" alt="image" src="https://github.com/user-attachments/assets/6dd3d5dc-9ed0-4b75-b2ca-87817182874d" />



## Project Structure

- `src/App.tsx`: Page layout orchestrating insights, toolbar, grid, and detail panel.
- `src/components/EmployeeGrid.tsx`: AG Grid configuration and interactions.
- `src/components/InsightCards.tsx`: Lightweight metric cards.
- `src/components/Toolbar.tsx`: Quick filter controls and external action.
- `src/data/employees.ts`: Sample dataset used by the dashboard.
- `src/styles/global.css`: Global styling and component-level classes.

## License

This project is provided for the FactWise frontend assignment and is not intended for production use without further review.

# AG-Grid-Dashboard
