export class Validator {

    required(value, fieldName) {
        value = value.trim();

        if (value === "") {
            return this.error(`${fieldName} is required.`);
        }

        return this.success();
    }

    minLength(value, minLength) {
        value = value.trim();

        if (value.length < minLength) {
            return this.error(
                `Minimum length is ${minLength} characters.`
            );
        }

        return this.success();
    }

    maxLength(value, maxLength) {
        value = value.trim();

        if (value.length > maxLength) {
            return this.error(
                `Maximum length is ${maxLength} characters.`
            );
        }

        return this.success();
    }

    validate({
        value,
        fieldName,
        minLength,
        maxLength,
    }) {

        const rules = [
            this.required(value, fieldName),
            this.minLength(value, minLength),
            this.maxLength(value, maxLength),
        ];

        for (const rule of rules) {
            if (!rule.isValid) {
                return rule;
            }
        }

        return this.success();
    }

    success(message = "") {
        return {
            isValid: true,
            message
        };
    }

    error(message) {
        return {
            isValid: false,
            message,
        };
    }
}