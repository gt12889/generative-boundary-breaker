
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export type UserRole = "startup" | "data-scientist" | "enterprise" | "all";

interface RoleFilterProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleFilter = ({ selectedRole, onRoleChange }: RoleFilterProps) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Filter size={20} className="text-gray-500" />
      <Select value={selectedRole} onValueChange={(value) => onRoleChange(value as UserRole)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="startup">Startup Founder</SelectItem>
          <SelectItem value="data-scientist">Data Scientist</SelectItem>
          <SelectItem value="enterprise">Enterprise Procurement</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleFilter;
