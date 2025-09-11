"use client";

import { useState } from "react";
import { uploadAvatar } from "../_lib/data-storage";
import { toast } from "react-toastify";

export default function AvatarUploader({ userId }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const avatarUrl = await uploadAvatar(file, userId);

      if (avatarUrl) {
        toast.success("Profile picture updated!");
      } else {
        toast.error("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Upload failed:", error.message);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
      <label className="cursor-pointer bg-accent-500 px-4 py-2 rounded-lg hover:bg-accent-600 transition text-white text-center w-full sm:w-auto">
        {uploading ? "Uploading..." : "Change Avatar"}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
