import { ChangeEvent } from "react";

interface ToolbarProps {
  quickFilter: string;
  onQuickFilterChange: (value: string) => void;
  onClearSelection: () => void;
}

const Toolbar = ({
  quickFilter,
  onQuickFilterChange,
  onClearSelection
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
        <button
          type="button"
          className="secondary-button"
          onClick={onClearSelection}
        >
          Clear Selection
        </button>
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

