import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEgyptianPhoneConstraint implements ValidatorConstraintInterface {
  validate(phone: any, _args: ValidationArguments) {
    const egyptianPhoneRegex = /^01[0-9]{9}$/;
    return typeof phone === 'string' && egyptianPhoneRegex.test(phone);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Phone number must be a valid Egyptian number starting with 01 and contain 11 digits.';
  }
}

export function IsEgyptianPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEgyptianPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEgyptianPhoneConstraint,
    });
  };
}
