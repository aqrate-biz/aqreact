import React from 'react';

import {
  Button,
  Code,
  Group,
  NumberInput,
  PasswordInput,
  Text,
  Checkbox,
  TextInput,
  Stepper,
} from "@mantine/core";
import { Form as MantineForm, hasLength, useForm } from "@mantine/form";
import { FormDefinition } from '../lib/FormDefinition';
import { useLogger } from '../hooks/useLogger.js';

function renderField(field, form) {
    switch (field.type) {
        case 'text':
            return <TextInput 
                        key={field.name} 
                        label={field.label}
                        placeholder={field.placeholder}
                        leftSection={field.leftSection} 
                        {...form.getInputProps(field.name)} />;
        case 'checkbox':
            return <Checkbox key={field.name} label={field.label} {...form.getInputProps(field.name, { type: 'checkbox' })} />;
        default:
            return null;
    }
}

export default function Form({ form }){

    const logger = useLogger('Form-'+form.name);

    if(!(form instanceof FormDefinition)){
        throw new Error("Form must be an instance of FormDefinition");
    }    

    const mantineForm = useForm({
        mode: 'uncontrolled',
        initialValues: form.initialValues(),
        validate: form.validationFunctions(),
        transformValues: form.transformValues ? (values) => { return form.transformValues(values) } : undefined,
        onValuesChange: form.onValuesChange ? (values) => { return form.onValuesChange(values) } : undefined,
        onSubmit: (values) => {
            
        },
    });

    for(const watchKey in form.watches){
        mantineForm.watch(watchKey, form.watches[watchKey])
    }

    React.useEffect(() => {
        //TODO load from datasource usando poi mantineForm.setValues e .initialize
    }, [form])

    return (
        <form onSubmit={mantineForm.onSubmit}>
            {
                form.fields.map((field) => {
                    return renderField(field, mantineForm)
                })
            }
        </form>
    )
}