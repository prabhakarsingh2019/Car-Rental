import AsideNav from "../_components/AsideNav";
import ProfileHeader from "../_components/ProfileHeader";
import { auth } from "../_lib/auth";
import { getCustomer } from "../_lib/data-storage";

async function page({ children }) {
  const session = await auth();
  const customer = await getCustomer(session?.user.email);

  return <ProfileHeader user={session.user} customer={customer} />;
}

export default page;
