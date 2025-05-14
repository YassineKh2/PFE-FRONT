import { Link } from "@heroui/link";

import  Sidebar  from "@/components/sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen p-4">
      <div className="flex gap-4">
        <div className="hidden lg:block h-screen bg-default-100 border-r rounded-lg border-default-200 ">
        <Sidebar />
        </div>
      <main className="w-full px-10">
        {children}
      </main>
      </div>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
        >
          <span className="text-default-600">BinitNS</span>
        </Link>
      </footer>
    </div>
  );
}
