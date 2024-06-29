export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-1 md:py-2">
      <div className="inline-block text-center justify-center">
        {children}
      </div>
    </section>
  );
}
