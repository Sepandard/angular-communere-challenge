export enum Unit {
    Mg = 'Micrograms',
    Ml = 'Milligrams',
    Tablet = 'tablet',
    Capsule = 'capsule',
    Applications = 'Applications',
    Drops = 'Drops',
  }
  

  export interface Medication {
    id: number,
    name: string;
    dosage: number ;
    unit: Unit ;
    days: string[]; 
    times: string[]; 
  }
  