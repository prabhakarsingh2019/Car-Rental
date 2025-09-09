import AsideNav from "../_components/AsideNav";
import ProfileHeader from "../_components/ProfileHeader";
import { auth } from "../_lib/auth";
import { getCustomer } from "../_lib/data-storage";

async function page({ children }) {
  return (
    <div className="flex min-h-screen">
      <AsideNav />
      <main className="flex-1 p-6">
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

export default page;
