import { UserCircle } from "lucide-react";
import AvatarUploader from "./AvatarUploader";
import Image from "next/image";

export default function ProfileHeader({ user, customer }) {
  const avatarUrl = customer?.avatar || user?.image || null;

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 bg-brand-900 p-6 rounded-xl shadow-md w-full">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex-shrink-0">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profile"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 128px"
            className="rounded-full object-cover border-2 border-brand-400"
          />
        ) : (
          <UserCircle className="w-full h-full text-brand-400" />
        )}
      </div>

      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold break-words">
          {customer?.name || user?.name || "User"}
        </h2>
        <p className="text-brand-300 text-sm sm:text-base break-words">
          {user?.email}
        </p>
        <p className="text-brand-300 text-sm sm:text-base">
          {customer?.phone || "No phone set"}
        </p>
      </div>

      <div className="mt-4 lg:mt-0">
        <AvatarUploader userId={user?.customerId} />
      </div>
    </div>
  );
}
