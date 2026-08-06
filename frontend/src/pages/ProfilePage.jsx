/** @format */

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getProfile, updateProfile } from "@/api/profileApi";
import { useAuth } from "@/context/AuthContext";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  async function fetchProfile(showLoader = true) {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const response = await getProfile();

      setProfile(response.user);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load profile.");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }

  const { updateUser } = useAuth();

  const handleUpdateProfile = async (formData) => {
    try {
      setUpdateLoading(true);

      const response = await updateProfile(formData);

      updateUser(response.user);

      await fetchProfile(false);

      toast.success(response.message);

      setEditDialogOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile.",
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard
            profile={profile}
            onEdit={() => setEditDialogOpen(true)}
          />
        </div>

        <div className="lg:col-span-2">
          <ProfileStats profile={profile} />
        </div>
      </div>

      <EditProfileDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        profile={profile}
        loading={updateLoading}
        onSubmit={handleUpdateProfile}
      />
    </div>
  );
}

export default ProfilePage;
