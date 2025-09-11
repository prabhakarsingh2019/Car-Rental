import AsideNav from "../_components/AsideNav";

async function Page({ children }) {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row min-h-screen bg-brand-900">
      <AsideNav />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

export default Page;
