import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"relative flex flex-col min-h-screen w-full "+(className ?? "")} style={{ minHeight: "100vh" }}>
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
      {children}
      </main>
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
