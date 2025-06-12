export class FormDefinition {
    constructor(formName, dataSource){
        this.name = formName || 'Unnamed Form';
        this.fields = []
        this.dataSource = dataSource
    }

    field(f) {
        if(typeof f === 'string'){
            return this.fields.find(field => field.name() === f);
        }
        if (!(f instanceof FieldDefinition)) {
            throw new Error('Field must be an instance of FieldDefinition');
        }
        return this;
    }

    initialValues(){
        const initialValues = {};
        for(let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            initialValues[field.name()] = field.initialValue() || null;
        }
    }

    validationFunctions() {
        const validationFunctions = {};
        for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            if (field.options.validate) {
                validationFunctions[field.name()] = (value, values, path) => { return field.options.validate(value, values, path); };
            }
        }
        return validationFunctions;
    }

    setDataSource(ds){
        this.dataSource = ds
    }

    transformValues(values) {

    }

    onValuesChange(values) {

    }

    watches(){
        
    }
}

export class FieldDefinition {
    constructor() {
        this.options = {};
    }

    name(value) {
        return this.option('name', value);
    }

    type(value) {
        return this.option('type', value);
    }

    initialValue(value) {
        return this.option('initialValue', value);
    }

    validate(value, ...params) {
        if(value===undefined){
            return this.option('validate');
        }
        if(typeof value === 'function') {
            return this.option('validate', value);
        }
        if(typeof value === 'string'){
            return this.option('validate', (v) => { return validationFunctions[value](v, ...params); });
        }
        throw new Error('Validation must be a function or a string representing a validation type');
    }

    option(name, value) {
        if (!name || typeof name !== 'string') {
            throw new Error('Option name must be a non-empty string');
        }
        if(value===undefined){
            return this.options[name];
        }
        this.options[name] = value;
        return this;
    }

    getOptions() {
        return this.options;
    }
}

const validationFunctions = {
    required: (value) => {
        if (value === undefined || value === null || value === '') {
            return 'This field is required';
        }
        return null;
    },
    email: (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return 'Invalid email address';
        }
        return null;
    },
    minLength: (value, length) => {
        if (value.length < length) {
            return `Minimum length is ${length}`;
        }
        return null;
    },
    maxLength: (value, length) => {
        if (value.length > length) {
            return `Maximum length is ${length}`;
        }
        return null;
    },
}