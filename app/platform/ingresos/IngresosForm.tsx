"use client"

import {
  DateInput, Input, Select, SelectItem, Spacer, Textarea,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button
} from "@nextui-org/react";
import {CalendarDate, parseDate} from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import { IngresoFormData } from "./page";
import { Dispatch, SetStateAction } from "react";
import { DocumentData } from "firebase/firestore";
import { revalidate } from "@/services/revalidate";
import { createDocument, updateData } from "@/services/firebase/database/queries";

const categories = ['Trabajo', 'Transacciones', 'Regalos', 'Tienda', 'Cobros'];
const frequencies = ['Mensual', 'Semanal', 'Trimestral', 'Diario', 'Una sola vez', 'Anual'];

const emptyData = {
  categoria: '',
  fecha: parseDate('2000-01-01'),
  monto: '',
  frecuencia: '',
  detalles: ''
}

const IngresosForm = ({ item, setIsOpen }: { item: DocumentData | null, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { control, handleSubmit } = useForm<IngresoFormData>({
    defaultValues: item || emptyData
  });

  const isEdit = item !== null;

  const handleSubmitForm = async (data: IngresoFormData) => {

    try {
      if (item) {
        await updateData('ingresos', item.id, data);
      } else {
        await createDocument('ingresos', "123", data);
      }
      setIsOpen(false);

      // Refrescar los datos después de agregar o actualizar un documento
      await revalidate('/platform/ingresos')
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => { setIsOpen(false); }}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalContent>
          <ModalHeader>
            <h3>{isEdit ? 'Editar' : 'Agregar'} Ingreso</h3>
          </ModalHeader>
          <ModalBody>
            <Controller
              name="categoria"
              control={control}
              render={({ field }) => (
                <Select {...field}
                  label="Categoría"
                  placeholder="Selecciona una categoría"
                  className="max-w-xs"
                >
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <Spacer y={0.5} />
            <Controller
              name="fecha"
              control={control}
              render={({ field }) => (
                <DateInput {...field}
                  label="Fecha"
                  className="max-w-xs"
                />
              )}
            />
            <Spacer y={0.5} />
            <Controller
              name="monto"
              control={control}
              render={({ field }) => (
                <Input {...field}
                  label="Monto"
                  type="number"
                  placeholder="Monto"
                />
              )}
            />
            <Spacer y={0.5} />
            <Controller
              name="frecuencia"
              control={control}
              render={({ field }) => (
                <Select {...field}
                  label="Frecuencia"
                  placeholder="Selecciona una frecuencia"
                  className="max-w-xs"
                >
                  {frequencies.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>{frequency}</SelectItem>
                  ))}
                </Select>
              )}
            />
            <Spacer y={0.5} />
            <Controller
              name="detalles"
              control={control}
              render={({ field }) => (
                <Textarea {...field}
                  label="Detalles adicionales"
                  placeholder="Detalles adicionales"
                />
              )} />
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={() => { setIsOpen(false); }}>Cancelar</Button>
            <Button type="submit">{isEdit ? 'Actualizar' : 'Guardar'}</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default IngresosForm