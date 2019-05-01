export class Events {
    id?: number;
    name: '';
    type: '';
    length: number;
    views: number;
    checked?:boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
