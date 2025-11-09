import { ChangeEvent } from "react";

interface ToolbarProps {
  quickFilter: string;
  onQuickFilterChange: (value: string) => void;
  onResetView: () => void;
  showReset: boolean;
}

const Toolbar = ({
  quickFilter,
  onQuickFilterChange,
  onResetView,
  showReset
}: ToolbarProps): JSX.Element => {
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQuickFilterChange(event.target.value);
  };

  return (
    <div className="grid-toolbar">
      <div className="toolbar-left">
        <label className="toolbar-field">
          <span>Quick Search</span>
          <input
            type="search"
            placeholder="Search by name, department, skill..."
            value={quickFilter}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div className="toolbar-actions">
        {showReset && (
          <button
            type="button"
            className="secondary-button"
            onClick={onResetView}
          >
            Reset View
          </button>
        )}
        <a
          className="primary-button"
          href="https://www.factwise.com/"
          target="_blank"
          rel="noreferrer"
        >
          Visit FactWise
        </a>
      </div>
    </div>
  );
};

export default Toolbar;

