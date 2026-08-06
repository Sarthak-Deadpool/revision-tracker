/** @format */

import { Bell, LogOut, Settings, User, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ProfileDropdown({ user, navigate, onLogout }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          flex
          items-center
          gap-2
          rounded-xl
          p-1.5
          transition-all
          duration-200
          hover:bg-slate-100
          focus:outline-none
        "
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
          />
        ) : (
          <UserCircle className="h-10 w-10 text-slate-500" />
        )}

        <div className="hidden xl:block text-left">
          <p className="max-w-36 truncate text-sm font-semibold text-slate-900">
            {user?.name}
          </p>

          <p className="max-w-36 truncate text-xs text-slate-500">
            {user?.email}
          </p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
      >
        {/* User Info */}

        <div className="flex items-center gap-3 rounded-xl p-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="h-12 w-12 text-slate-400" />
          )}

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">
              {user?.name}
            </p>

            <p className="truncate text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigate("/dashboard/profile")}
            className="cursor-pointer rounded-lg py-2.5"
          >
            <User className="mr-2 h-4 w-4" />
            My Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate("/dashboard/settings")}
            className="cursor-pointer rounded-lg py-2.5"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate("/dashboard/notifications")}
            className="cursor-pointer rounded-lg py-2.5"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          variant="destructive"
          className="cursor-pointer rounded-lg py-2.5"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
