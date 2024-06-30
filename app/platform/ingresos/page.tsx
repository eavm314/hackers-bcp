"use client";

import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Textarea, Select, Spacer } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { createDocument, getData, deleteData2, updateData } from "../../../services/firebase/database/queries";

const categories = ['Trabajo', 'Transacciones', 'Regalos', 'Tienda', 'Cobros'];
const frequencies = ['Mensual', 'Semanal', 'Trimestral', 'Diario', 'Una sola vez', 'Anual'];

const IngresosPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoria: '',
    fecha: '',
    monto: '',
    frecuencia: '',
    detalles: ''
  });
  const [filters, setFilters] = useState({
    categoria: '',
    fecha: '',
    monto: ''
  });
  const [editId, setEditId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
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
    applyFilters();
  }, [filters, data]);

  useEffect(() => {
    applySorting();
  }, [sortConfig]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async () => {
    if (parseFloat(formData.monto) <= 0) {
      alert("El monto debe ser mayor que 0");
      return;
    }

    try {
      if (editId) {
        await updateData('ingresos', editId, userId, formData);
      } else {
        await createDocument('ingresos', userId, formData);
      }
      setModalOpen(false);
      setFormData({ categoria: '', fecha: '', monto: '', frecuencia: '', detalles: '' });
      setEditId(null);

      // Refrescar los datos después de agregar o actualizar un documento
      const result = await getData('ingresos');
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      categoria: item.categoria,
      fecha: new Date(item.fecha.seconds * 1000).toISOString().split('T')[0],
      monto: item.monto,
      frecuencia: item.frecuencia,
      detalles: item.detalles
    });
    setEditId(item.id);
    setModalOpen(true);
  };

  const handleDelete = async (docId) => {
    try {
      await deleteData2('ingresos', docId, userId);
      setData(data.filter(item => item.id !== docId));
      setFilteredData(filteredData.filter(item => item.id !== docId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const formatFirestoreDate = (date) => {
    if (date && date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString();
    }
    return "";
  };

  const applyFilters = () => {
    const filtered = data.filter(item => {
      const formattedDate = formatFirestoreDate(item.fecha);
      return (
        item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
        formattedDate.includes(filters.fecha) &&
        item.monto.toString().includes(filters.monto)
      );
    });
    setFilteredData(filtered);
  };

  const applySorting = () => {
    let sortedData = [...filteredData];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.key === 'fecha') {
          return (new Date(aValue.seconds * 1000) - new Date(bValue.seconds * 1000)) * (sortConfig.direction === 'asc' ? 1 : -1);
        } else {
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }
    setFilteredData(sortedData);
  };

  const requestSort = key => {
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
      <Table aria-label="Tabla de ingresos" css={{ height: "auto", minWidth: "100%" }}>
        <TableHeader>
          <TableColumn>
            Categoría
            <Input size="xs" name="categoria" placeholder="Filtrar" onChange={handleFilterChange} />
          </TableColumn>
          <TableColumn>
            Fecha
            <Input size="xs" name="fecha" type="date" placeholder="Filtrar" onChange={handleFilterChange} />
          </TableColumn>
          <TableColumn>
            Monto
            <Input size="xs" name="monto" type="number" placeholder="Filtrar" onChange={handleFilterChange} />
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
                <Button auto onClick={() => handleEdit(item)}>Editar</Button>
                <Button auto onClick={() => handleDelete(item.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditId(null); }}>
        <ModalContent>
          <ModalHeader>
            <h3>{editId ? 'Editar' : 'Agregar'} Ingreso</h3>
          </ModalHeader>
          <ModalBody>
            <Select
              label="Categoría"
              placeholder="Selecciona una categoría"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="max-w-xs"
            >
              {categories.map((category) => (
                <Select.Option key={category} value={category}>{category}</Select.Option>
              ))}
            </Select>
            <Spacer y={0.5} />
            <Input
              name="fecha"
              label="Fecha"
              type="date"
              placeholder="Fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]} // No permite fechas futuras
            />
            <Spacer y={0.5} />
            <Input
              name="monto"
              label="Monto"
              type="number"
              placeholder="Monto"
              value={formData.monto}
              onChange={handleInputChange}
              min="0.01"
            />
            <Spacer y={0.5} />
            <Select
              label="Frecuencia"
              placeholder="Selecciona una frecuencia"
              value={formData.frecuencia}
              onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
              className="max-w-xs"
            >
              {frequencies.map((frequency) => (
                <Select.Option key={frequency} value={frequency}>{frequency}</Select.Option>
              ))}
            </Select>
            <Spacer y={0.5} />
            <Textarea
              name="detalles"
              label="Detalles adicionales"
              placeholder="Detalles adicionales"
              value={formData.detalles}
              onChange={handleInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button flat auto onClick={() => { setModalOpen(false); setEditId(null); }}>Cancelar</Button>
            <Button onClick={handleSubmit}>{editId ? 'Actualizar' : 'Guardar'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default IngresosPage;
