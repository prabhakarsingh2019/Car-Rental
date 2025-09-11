import AsideNav from "../_components/AsideNav";
import ProfileHeader from "../_components/ProfileHeader";
import { auth } from "../_lib/auth";
import { getCustomer } from "../_lib/data-storage";

async function Page({ children }) {
  const session = await auth();
  const customer = await getCustomer(session?.user.email);

  return (
    <div className="min-h-screen bg-brand-900 px-4 sm:px-6 lg:px-12 py-8 flex flex-col lg:flex-row gap-8 md:flex md:flex-row ">
      <main className="flex-1 space-y-8">
        <ProfileHeader user={session.user} customer={customer} />
        {children}
      </main>
    </div>
  );
}

export default Page;
