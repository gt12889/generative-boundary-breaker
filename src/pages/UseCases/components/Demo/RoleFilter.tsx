
import { UserRole } from "./types";

interface RoleFilterProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleFilter = ({ selectedRole, onRoleChange }: RoleFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onRoleChange("all")}
        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          selectedRole === "all"
            ? "bg-rose-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Users
      </button>
      <button
        onClick={() => onRoleChange("startup")}
        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          selectedRole === "startup"
            ? "bg-rose-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Startups
      </button>
      <button
        onClick={() => onRoleChange("enterprise")}
        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          selectedRole === "enterprise"
            ? "bg-rose-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Enterprise
      </button>
      <button
        onClick={() => onRoleChange("data-scientist")}
        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          selectedRole === "data-scientist"
            ? "bg-rose-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Data Scientists
      </button>
    </div>
  );
};

export default RoleFilter;
