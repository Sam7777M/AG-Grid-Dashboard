import { useMemo, useCallback } from "react";
import type {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  SelectionChangedEvent
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import type { Employee } from "../types";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface EmployeeGridProps {
  employees: Employee[];
  quickFilter: string;
  onEmployeeSelected: (employee: Employee | null) => void;
}

const StatusCell = ({
  value,
  node
}: ICellRendererParams<Employee, boolean | null>): JSX.Element => {
  if (node.rowPinned) {
    return <span className="status-pill status-pill--placeholder">Totals</span>;
  }

  const isActive = Boolean(value);
  return (
    <span
      className={`status-pill ${
        isActive ? "status-pill--active" : "status-pill--inactive"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

const EmployeeGrid = ({
  employees,
  quickFilter,
  onEmployeeSelected
}: EmployeeGridProps): JSX.Element => {
  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        field: "isActive",
        headerName: "Status",
        width: 110,
        minWidth: 110,
        cellRenderer: StatusCell,
        sortable: true,
        filter: "agSetColumnFilter",
        cellClass: "status-cell",
        suppressMovable: true,
        tooltipValueGetter: (params) =>
          (params.value as boolean) ? "Currently employed" : "No longer employed"
      },
      {
        headerName: "Name",
        valueGetter: (params) =>
          `${params.data?.firstName ?? ""} ${params.data?.lastName ?? ""}`,
        minWidth: 160,
        filter: "agTextColumnFilter"
      },
      {
        field: "department",
        minWidth: 150,
        filter: "agSetColumnFilter",
        chartDataType: "category"
      },
      {
        field: "position",
        minWidth: 200,
        filter: "agTextColumnFilter"
      },
      {
        field: "location",
        minWidth: 140,
        filter: "agSetColumnFilter"
      },
      {
        field: "manager",
        minWidth: 160,
        filter: "agSetColumnFilter"
      },
      {
        field: "hireDate",
        headerName: "Hire Date",
        minWidth: 140,
        valueFormatter: (params) =>
          new Date(params.value as string).toLocaleDateString(),
        filter: "agDateColumnFilter",
        comparator: (valueA, valueB) =>
          new Date(valueA as string).getTime() - new Date(valueB as string).getTime()
      },
      {
        field: "salary",
        headerName: "Salary",
        minWidth: 140,
        type: "numericColumn",
        valueFormatter: (params) =>
          Number(params.value).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
          }),
        filter: "agNumberColumnFilter",
        cellClass: "numeric-cell"
      },
      {
        field: "performanceRating",
        headerName: "Performance",
        minWidth: 150,
        type: "numericColumn",
        valueFormatter: (params) => `${Number(params.value).toFixed(1)} / 5`,
        chartDataType: "series",
        filter: "agNumberColumnFilter",
        cellClass: "numeric-cell"
      },
      {
        field: "projectsCompleted",
        headerName: "Projects",
        minWidth: 140,
        type: "numericColumn",
        cellClass: "numeric-cell",
        chartDataType: "series",
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Skills",
        valueGetter: (params) => params.data?.skills?.join(", ") ?? "",
        minWidth: 220,
        flex: 1,
        filter: "agTextColumnFilter",
        tooltipValueGetter: (params) => params.data?.skills?.join(", ") ?? ""
      },
      {
        field: "email",
        minWidth: 220,
        filter: "agTextColumnFilter"
      }
    ],
    []
  );

  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
      filterParams: {
        suppressAndOrCondition: true
      },
      enableCellChangeFlash: true
    }),
    []
  );

  const autoGroupColumnDef = useMemo<ColDef<Employee>>(
    () => ({
      headerName: "Group",
      minWidth: 200
    }),
    []
  );

  const pinnedBottomRowData = useMemo(
    () => [
      {
        isActive: null,
        department: `${employees.filter((employee) => employee.isActive).length} Active`,
        position: `${employees.length} Employees`,
        salary:
          employees.reduce((acc, employee) => acc + employee.salary, 0) /
          (employees.length || 1),
        performanceRating:
          employees.reduce((acc, employee) => acc + employee.performanceRating, 0) /
          (employees.length || 1),
        projectsCompleted: employees.reduce(
          (acc, employee) => acc + employee.projectsCompleted,
          0
        )
      }
    ],
    [employees]
  );

  const onGridReady = useCallback((event: GridReadyEvent<Employee>) => {
    event.api.sizeColumnsToFit();
  }, []);

  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent<Employee>) => {
      const selection = event.api.getSelectedRows();
      onEmployeeSelected(selection.length ? selection[0] : null);
    },
    [onEmployeeSelected]
  );

  return (
    <div className="ag-theme-quartz grid-wrapper">
      <AgGridReact<Employee>
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        animateRows
        columnHoverHighlight
        quickFilterText={quickFilter}
        rowSelection="single"
        suppressAggFuncInHeader
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        statusBar={{
          statusPanels: [
            { statusPanel: "agTotalRowCountComponent", align: "left" },
            { statusPanel: "agFilteredRowCountComponent" },
            { statusPanel: "agAggregationComponent" }
          ]
        }}
        sideBar={["columns", "filters"]}
        getRowId={(params) => String(params.data?.id)}
        pinnedBottomRowData={pinnedBottomRowData}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        overlayNoRowsTemplate="<span class='empty-state'>No employees to display</span>"
      />
    </div>
  );
};

export default EmployeeGrid;

