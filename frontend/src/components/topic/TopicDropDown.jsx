/** @format */

import { Archive, MoreVertical, Pencil, RotateCcw, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TopicDropdown({ topic, onEdit, onArchive, onUnarchive, onDelete }) {
  const { isArchived } = topic;
  console.log("Dropdown topic:", topic.name, topic.isArchived);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <MoreVertical className="h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        {!isArchived ? (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onEdit?.(topic)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Topic
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onArchive?.(topic)}
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive Topic
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer text-emerald-600 focus:text-emerald-600"
            onClick={() => onUnarchive?.(topic)}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore Topic
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={() => onDelete?.(topic)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Topic
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TopicDropdown;
