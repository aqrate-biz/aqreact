export default function initSchema(schema) {
  if (!schema || typeof schema !== 'object') {
    throw new Error('Invalid schema provided. Schema must be an object.');
  }

  // Initialize the schema with default values or structure
  const initializedSchema = { };

  // Perform any additional initialization logic here
  // For example, setting default values for certain fields
  for (const key in schema) {
    initializedSchema[key] = null; // or some other default value
    if(schema[key].type) {
      switch (schema[key].type) {
        case 'string':
          initializedSchema[key] = '';
          break;
        case 'number':
          initializedSchema[key] = 0;
          break;
        case 'boolean':
          initializedSchema[key] = false;
          break;
        case 'object':
          initializedSchema[key] = {};
          break;
        case 'array':
          initializedSchema[key] = [];
          break;
        default:
          throw new Error(`Unsupported type "${schema[key].type}" for key "${key}"`);
      }
    }
  }

  return initializedSchema;
}