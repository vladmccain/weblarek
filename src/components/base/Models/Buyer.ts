import { TPayment, IBuyer, ValidationError } from '../../../types/index';

export class Buyer {
  payment: TPayment | '' = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getOrderData(): IBuyer {
    return {
      payment: this.payment as TPayment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clearBuyer(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validate(): ValidationError {
    const errors: ValidationError = {};

    if (!this.payment) {
      errors.payment = 'Выберите тип оплаты';
    }
    if (!this.email) {
      errors.email = 'Укажите адрес электронной почты';
    }
    if (!this.phone) {
      errors.phone = 'Укажите номер телефона';
    }
    if (!this.address) {
      errors.address = 'Укажите адрес доставки';
    }

    return errors;
  }
}