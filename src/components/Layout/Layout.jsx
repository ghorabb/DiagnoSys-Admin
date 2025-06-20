import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 container mx-auto p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
