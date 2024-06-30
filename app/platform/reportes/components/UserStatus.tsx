import {
  Table,
  Input,
  Button,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import moment from "moment";
import { useEffect, useState } from "react";

import Title from "../../../../components/Title";
import { exportToCSV } from "../../../../utils/csv-generator";
import { useGlobalStore } from "../../../../store/StoreProvider";

interface Props {
  data: any[];
}

function UserStatus({ data }: Props) {
  const { ginit, gend, setGinit, setGend } = useGlobalStore();

  const [table, setTable] = useState([]);

  const saveReport = () => {
    exportToCSV(data, "reporte_ingresos_egresos");
  };

  // Función para generar un tipo de gasto aleatorio
  const getRandomType = () => {
    const types = ["Gastos Adicionales", "Gastos Necesarios", "Ahorro"];

    return types[Math.floor(Math.random() * types.length)];
  };

  // Función para generar un monto aleatorio
  const getRandomAmount = () => {
    return (Math.random() * 1000).toFixed(2);
  };

  // Función para generar datos para la tabla
  const generateTableData = (numRows: any) => {
    const tableData = [];

    for (let i = 0; i < numRows; i++) {
      const type = getRandomType();
      const amount = getRandomAmount();
      const init = moment()
        .subtract(Math.floor(Math.random() * 30), "days")
        .format("YYYY-MM-DD");
      const end = moment(init)
        .add(Math.floor(Math.random() * 30), "days")
        .format("YYYY-MM-DD");
      const date = moment().format("YYYY-MM-DD");

      tableData.push({
        type: type,
        amount: amount,
        init: init,
        end: end,
        date: date,
      });
    }

    return tableData;
  };

  useEffect(() => {
    setTable(generateTableData(3));
  }, []);

  return (
    <div>
      <Title size={1} text={"Estado de transacciones"} />
      <div>
        <Input
          className="my-2"
          placeholder="Fecha inicio"
          type="date"
          onChange={(value) => setGinit(value)}
        />
        <Input
          className="my-2"
          placeholder="Fecha final"
          type="date"
          onChange={(value) => setGend(value)}
        />
        <Button className="my-2" color="primary" onClick={saveReport}>
          Descargar
        </Button>
      </div>
      <Table
        aria-label="Employee status table"
        style={{
          marginTop: "$10",
        }}
      >
        <TableHeader>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Monto</TableColumn>
          <TableColumn>Inicio de Rango</TableColumn>
          <TableColumn>Fin de Rango</TableColumn>
          <TableColumn>Fecha Reporte</TableColumn>
        </TableHeader>
        <TableBody>
          {(data || table).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.init}</TableCell>
              <TableCell>{item.end}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserStatus;
