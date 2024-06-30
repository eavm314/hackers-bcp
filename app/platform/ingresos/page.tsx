"use client";

import { Button, DateValue, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { DocumentData, Timestamp } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';
import { deleteData2, getData } from "../../../services/firebase/database/queries";
import IngresosForm from "./IngresosForm";
import {CalendarDate, parseDate} from "@internationalized/date";

// import IngresosForm, { IngresoFormData } from './IngresosForm';

type sortConfigType = {
  key: string | null;
  direction: string;
};

export interface IngresoFormData {
  categoria: string;
  fecha: DateValue;
  monto: string;
  frecuencia: string;
  detalles: string;
}

const IngresosPage = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [filteredData, setFilteredData] = useState<DocumentData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<IngresoFormData | null>(null);

  console.log(data)

  const [filters, setFilters] = useState({
    categoria: '',
    fecha: '',
    monto: ''
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<sortConfigType>({ key: null, direction: 'asc' });
  const userId = '1b06yJgdi422b2Unpu8w'; // Reemplaza con el ID del usuario correspondiente

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('ingresos');
      setData(result);
      setFilteredData(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // applyFilters();
  }, [filters, data]);

  useEffect(() => {
    applySorting();
  }, [sortConfig]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleEdit = (item: DocumentData) => {
    setFormData({
      categoria: item.categoria,
      // fecha: new Date(item.fecha.seconds * 1000).toISOString().split('T')[0],
      fecha: parseDate(formatFirestoreDate(item.fecha)),
      monto: item.monto,
      frecuencia: item.frecuencia,
      detalles: item.detalles
    });
    setEditId(item.id);
    setModalOpen(true);
  };

  const handleDelete = async (docId: string) => {
    try {
      await deleteData2('ingresos', docId, userId);
      setData(data.filter(item => item.id !== docId));
      setFilteredData(filteredData.filter(item => item.id !== docId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const formatFirestoreDate = (date: Timestamp) => {
    if (date && date.seconds) {
      const formatDate = new Date(date.seconds * 1000)
      // return new CalendarDate(formatDate.getFullYear(), formatDate.getMonth(), formatDate.getDay());
      return formatDate.toISOString().split('T')[0];
    }
    // return new CalendarDate(2000, 1, 1);
    return new Date('2000-01-01').toISOString().split('T')[0];
  };

  const applyFilters = () => {
    const filtered = data.filter(item => {
      const formattedDate = formatFirestoreDate(item.fecha);
      return (
        (item.categoria.toLowerCase() === filters.categoria.toLowerCase()) &&
        (formattedDate.toString() === filters.fecha) &&
        item.monto == filters.monto
      );
    });
    setFilteredData(filtered);
  };

  const applySorting = () => {
    let sortedData = [...filteredData];
    if (sortConfig.key !== null) {
      sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key as string];
        const bValue = b[sortConfig.key as string];
        if (sortConfig.key === 'fecha') {
          return (aValue.seconds - bValue.seconds) * (sortConfig.direction === 'asc' ? 1 : -1);
        } else {
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }
    setFilteredData(sortedData);
  };

  const requestSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h1>Ingresos</h1>
      <Button onClick={() => setModalOpen(true)}>Agregar</Button>
      <Table aria-label="Tabla de ingresos" className="h-auto w-full">
        <TableHeader>
          <TableColumn>
            Categoría
            <Input size="sm" name="categoria" placeholder="Filtrar" onChange={handleFilterChange} />
          </TableColumn>
          <TableColumn>
            Fecha
            <Input size="sm" name="fecha" type="date" placeholder="Filtrar" onChange={handleFilterChange} />
          </TableColumn>
          <TableColumn>
            Monto
            <Input size="sm" name="monto" type="number" placeholder="Filtrar" onChange={handleFilterChange} />
          </TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.categoria}</TableCell>
              <TableCell>{formatFirestoreDate(item.fecha)}</TableCell>
              <TableCell>{item.monto}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(item)}>Editar</Button>
                <Button onClick={() => handleDelete(item.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        modalOpen &&
        <IngresosForm item={formData} setIsOpen={setModalOpen} />
      }
    </div>
  );
};

export default IngresosPage;
