import { useMemo, useState } from "react";

import EmployeeGrid from "./components/EmployeeGrid";
import InsightCards from "./components/InsightCards";
import Toolbar from "./components/Toolbar";
import { employees } from "./data/employees";
import { Employee } from "./types";

function App(): JSX.Element {
  const [quickFilter, setQuickFilter] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const insights = useMemo(() => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter((employee) => employee.isActive);
    const departments = new Set(employees.map((employee) => employee.department));
    const averageSalary =
      employees.reduce((acc, employee) => acc + employee.salary, 0) /
      totalEmployees;
    const averagePerformance =
      employees.reduce((acc, employee) => acc + employee.performanceRating, 0) /
      totalEmployees;

    return {
      totalEmployees,
      activeEmployees: activeEmployees.length,
      departmentCount: departments.size,
      averageSalary,
      averagePerformance
    };
  }, [employees]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>FactWise Employee Insights</h1>
          <p className="subtitle">
            Interactive analytics dashboard with AG Grid capabilities.
          </p>
        </div>
        <a
          className="header-link"
          href="https://www.ag-grid.com/react-data-grid/"
          target="_blank"
          rel="noreferrer"
        >
          AG Grid Docs
        </a>
      </header>

      <section className="insights-section">
        <InsightCards insights={insights} />
      </section>

      <section className="grid-section">
        <Toolbar
          quickFilter={quickFilter}
          onQuickFilterChange={setQuickFilter}
          onClearSelection={() => setSelectedEmployee(null)}
        />
        <EmployeeGrid
          employees={employees}
          quickFilter={quickFilter}
          onEmployeeSelected={setSelectedEmployee}
        />
      </section>

      {selectedEmployee && (
        <aside className="detail-panel" aria-label="Employee detail panel">
          <button
            type="button"
            className="detail-close"
            onClick={() => setSelectedEmployee(null)}
          >
            ×
          </button>
          <h2>
            {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h2>
          <p className="detail-role">{selectedEmployee.position}</p>
          <div className="detail-meta">
            <div>
              <span className="label">Department</span>
              <span>{selectedEmployee.department}</span>
            </div>
            <div>
              <span className="label">Location</span>
              <span>{selectedEmployee.location}</span>
            </div>
            <div>
              <span className="label">Manager</span>
              <span>{selectedEmployee.manager}</span>
            </div>
            <div>
              <span className="label">Hire Date</span>
              <span>
                {new Date(selectedEmployee.hireDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </span>
            </div>
            <div>
              <span className="label">Performance</span>
              <span>{selectedEmployee.performanceRating.toFixed(1)} / 5</span>
            </div>
            <div>
              <span className="label">Projects Completed</span>
              <span>{selectedEmployee.projectsCompleted}</span>
            </div>
            <div>
              <span className="label">Salary</span>
              <span>
                {selectedEmployee.salary.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD"
                })}
              </span>
            </div>
          </div>
          <div>
            <span className="label">Key skills</span>
            <div className="skill-chip-row">
              {selectedEmployee.skills.map((skill) => (
                <span className="skill-chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;

