export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full font-sans bg-indigo-50 p-3">{children}</div>
  );
}
