export const EMAIL_EXPRESSION: RegExp = /^\S+@\S+\.\S+$/;
export const PASSWORD_EXPRESSION: RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/;
export const USERNAME_EXPRESSION: RegExp =
  /^[^\s][a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+[^\s]$/;
export const BOLIVIAN_WHATSAPP_NUMBER_EXPRESSION: RegExp = /^\+591[467]\d{7}$/;
