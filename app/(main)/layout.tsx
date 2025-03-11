export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="fixed inset-0 z-[-2] bg-white/60"></div>
      {children}
    </section>
  );
}
