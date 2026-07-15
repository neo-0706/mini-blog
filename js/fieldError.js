export class FieldError {
    constructor(fields) {
        this.fields = fields;
    }

    show(fieldName, message) {
        const field = this.fields[fieldName];

        if (!field) return;

        field.error.textContent = message;
        field.error.classList.add("show");

        field.input.classList.add("error");
        field.input.setAttribute("aria-invalid", "true");
    }

    clear(fieldName) {

        const field = this.fields[fieldName];

        if (!field) return;

        field.error.textContent = "";

        field.error.classList.remove("show");

        field.input.classList.remove("error");

        field.input.removeAttribute("aria-invalid");
    }

    clearAll() {

        Object.keys(this.fields).forEach(fieldName => {

            this.clear(fieldName);

        });

    }
}