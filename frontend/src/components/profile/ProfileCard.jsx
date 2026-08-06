/** @format */

import { CalendarDays, Mail, Pencil } from "lucide-react";

import GradientButton from "@/components/reusable-componets/GradientButton";

function ProfileCard({ profile, onEdit }) {
  const joinedDate = new Date(profile.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col items-center">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Profile</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information.
          </p>
        </div>
        <img
          src={
            profile.avatar ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(profile.name)
          }
          alt={profile.name}
          className="h-32 w-32 rounded-full border-4 border-orange-100 object-cover shadow-md"
        />

        <h2 className="mt-5 text-2xl font-bold text-slate-900">
          {profile.name}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-slate-500">
          <Mail className="h-4 w-4" />
          <span>{profile.email}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="h-4 w-4" />
          <span>Joined {joinedDate}</span>
        </div>

        <GradientButton
          onClick={onEdit}
          className="mt-6 flex items-center gap-2"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </GradientButton>
      </div>
    </div>
  );
}

export default ProfileCard;
