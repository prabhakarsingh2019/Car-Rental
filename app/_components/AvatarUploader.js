"use client";

import { useState } from "react";
import { uploadAvatar } from "../_lib/data-storage";

export default function AvatarUploader({ userId }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const avatarUrl = await uploadAvatar(file, userId);

      if (avatarUrl) {
        alert("Profile picture updated! Refresh to see changes.");
      }
    } catch (error) {
      console.error("Upload failed:", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="cursor-pointer bg-brand-700 px-4 py-2 rounded-lg hover:bg-brand-600 transition text-brand-50">
      {uploading ? "Uploading..." : "Change Avatar"}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </label>
  );
}
