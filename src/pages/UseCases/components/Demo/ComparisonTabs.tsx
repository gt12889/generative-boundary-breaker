
import { Comparison } from "./data";

interface ComparisonTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  comparisons: Comparison[];
}

const ComparisonTabs = ({ activeTab, setActiveTab, comparisons }: ComparisonTabsProps) => {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex space-x-2 mb-8 min-w-max border-b overflow-x-auto whitespace-nowrap">
        {comparisons.map((comparison) => (
          <button
            key={comparison.id}
            onClick={() => setActiveTab(comparison.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === comparison.id
                ? "text-rose-600 border-b-2 border-rose-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {comparison.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTabs;
