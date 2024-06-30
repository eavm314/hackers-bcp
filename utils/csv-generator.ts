function escapeCSVField(field: string | number) {
  if (field === null || field === undefined) return "";
  const stringField = String(field);
  const escapedField = stringField.replace(/"/g, '""');

  return `"${escapedField}"`;
}

export function exportToCSV(
  data: { name: string; role: string; status: string }[],
  filename: string,
) {
  const csvRows = [
    ["NAME", "ROLE", "STATUS"], // Encabezados del CSV
    ...data.map((item) => [
      escapeCSVField(item.name),
      escapeCSVField(item.role),
      escapeCSVField(item.status),
    ]),
  ];

  const csvString = csvRows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href);
}
