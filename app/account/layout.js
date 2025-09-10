import AsideNav from "../_components/AsideNav";

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
