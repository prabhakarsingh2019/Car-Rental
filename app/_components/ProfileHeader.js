import { UserCircle } from "lucide-react";
import AvatarUploader from "./AvatarUploader";
import Image from "next/image";

export default function ProfileHeader({ user, customer }) {
  const avatarUrl = customer?.avatar || user.image || null;

  return (
    <div className="flex items-center gap-6 bg-brand-900 p-4 rounded-xl shadow-md">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Profile"
          width={200}
          height={200}
          className="w-20 h-20 rounded-full object-cover border-2 border-brand-400"
        />
      ) : (
        <UserCircle className="w-20 h-20 text-brand-400" />
      )}

      <div className="flex-1">
        <h2 className="text-xl font-semibold">
          {customer?.name || user.name || "User"}
        </h2>
        <p className="text-brand-300">{user.email}</p>
        <p className="text-brand-300">{customer?.phone || "No phone set"}</p>
      </div>

      {/* Avatar change button */}
      <AvatarUploader userId={user.customerId} />
    </div>
  );
}
