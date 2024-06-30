export enum PaymentSaving {
  NECESSARY_PAYMENT = "Gastos necesarios",
  ADDITIONAL_PAYMENT = "Gastos adicionales",
  SAVING = "Ahorro",
}

export interface FinancesModel {
  label: PaymentSaving;
  value: number;
  color: string;
  cutout: string;
}
