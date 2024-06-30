import MenuItem from "./MenuItem";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { path: "Dashboard", icon: "iconoir:stats-report" },
    { path: "Planes", icon: "icon-park-outline:plan" },
    { path: "Gastos", icon: "mdi:task-minus" },
    { path: "Ingresos", icon: "mdi:task-add" },
  ]
  return (
    <div className="flex">
      <menu className="flex flex-col bg-background h-screen w-10 gap-4">
        {menu.map((item) => (
          <MenuItem item={item} />
        ))}
      </menu>
      <section className="flex flex-col items-center w-full gap-4 p-4 md:p-10">
        {children}
      </section>
    </div>
  );
}
