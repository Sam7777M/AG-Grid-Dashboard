interface InsightCardsProps {
  insights: {
    totalEmployees: number;
    activeEmployees: number;
    departmentCount: number;
    averageSalary: number;
    averagePerformance: number;
  };
}

const InsightCards = ({ insights }: InsightCardsProps): JSX.Element => (
  <div className="insight-card-grid">
    <article className="insight-card">
      <header>Total Employees</header>
      <p className="insight-value">{insights.totalEmployees}</p>
      <span className="insight-hint">
        Capturing everyone in the 20-row sample dataset
      </span>
    </article>

    <article className="insight-card">
      <header>Active Workforce</header>
      <p className="insight-value">{insights.activeEmployees}</p>
      <span className="insight-hint">
        Represents currently employed teammates
      </span>
    </article>

    <article className="insight-card">
      <header>Departments</header>
      <p className="insight-value">{insights.departmentCount}</p>
      <span className="insight-hint">
        Includes Engineering, Product, Marketing and more
      </span>
    </article>

    <article className="insight-card">
      <header>Average Salary</header>
      <p className="insight-value">
        {insights.averageSalary.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0
        })}
      </p>
      <span className="insight-hint">
        Shows mean salary across the organization
      </span>
    </article>

    <article className="insight-card">
      <header>Avg. Performance</header>
      <p className="insight-value">
        {insights.averagePerformance.toFixed(1)} / 5
      </p>
      <span className="insight-hint">
        Quick view into employee performance ratings
      </span>
    </article>
  </div>
);

export default InsightCards;

