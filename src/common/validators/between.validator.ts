import {
  isEmpty,
  isInt,
  isNumber,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function BetweenValidator(
  min: number,
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'betweenValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!isEmpty(value)) {
            if (!isNumber(value, { allowInfinity: false, allowNaN: false })) {
              return false;
            } else if (!isInt(value)) return false;

            return +value >= min && +value <= max;
          }

          return true;
        },
      },
    });
  };
}
