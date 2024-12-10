export enum Unit {
    Mg = 'mg',
    Ml = 'ml',
    Tablet = 'tablet',
    Capsule = 'capsule',
  }
  

  export interface Medication {
    id: number,
    name: string;
    dosage: number ;
    unit: Unit ;
    days: string[]; // Array of selected days
    times: string[]; // Array of times
  }
  