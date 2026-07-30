/** @format */

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function SubjectDropdown({ subject, onEdit, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <MoreVertical className="h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onEdit?.(subject)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Subject
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={() => onDelete?.(subject)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Subject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SubjectDropdown;
