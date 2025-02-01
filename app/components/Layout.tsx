import Footer from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-indigo-50 font-sans bg-gradient-to-br from-gray-800 via-gray-900 to-black p-3">
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
