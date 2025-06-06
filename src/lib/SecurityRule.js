
/*

{ "field": "authenticated", value: true, 
  "operator": "equals", "type": "boolean" }
{ "field": "role", value: "admin", 
  "operator": "equals", "type": "string" }
{ "field": "age", value: 18, 
  "operator": "greaterThan", "type": "number" } 
{ "field" : "role", value: ["admin", "editor"], 
  "operator": "in", "type": "array" }

*/

class SecurityRule {
    constructor(rule) {
        this.field = rule.field || null;
        this.value = rule.value || null;
        this.operator = rule.operator || 'equals';
        this.type = rule.type || null;

        if (!this.field || !this.value) {
            throw new Error('Invalid rule: field, value, and operator are required');
        }
    }

    isAllowed(user) {
        if (!user || !user.hasOwnProperty(this.field)) {
            return false;
        }

        const userValue = user[this.field];

        switch (this.operator) {
            case 'equals':
                return userValue == this.value;
            case 'greaterThan':
                return this.greaterThan(userValue, this.value);
            case 'in':
                return Array.isArray(this.value) && this.value.includes(userValue);
            default:
                throw new Error(`Unsupported operator: ${this.operator}`);
        }
    }
}

export default SecurityRule;