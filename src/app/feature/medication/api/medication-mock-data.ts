import { Medication, Unit } from "./medication.model";

export const MOCK_MEDICATION_DATA : Medication[] = [
    {
      id: 1,
      name: 'Paracetamol',
      dosage: 500,
      unit: Unit.Mg,
      days: ['Mon', 'Wed', 'Fri'],
      times: ['08:00', '14:00'],
    },
    {
      id: 2,
      name: 'Ibuprofen',
      dosage: 200,
      unit: Unit.Mg,
      days: ['Tue', 'Thu', 'Sat'],
      times: ['10:00'],
    },
    {
      id: 3,
      name: 'Amoxicillin',
      dosage: 250,
      unit: Unit.Mg,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      times: ['09:00', '17:00'],
    },
    {
      id: 4,
      name: 'Vitamin D',
      dosage: 1,
      unit: Unit.Tablet,
      days: ['Sun'],
      times: ['12:00'],
    },
    {
      id: 5,
      name: 'Metformin',
      dosage: 500,
      unit: Unit.Mg,
      days: ['Mon', 'Wed', 'Fri', 'Sun'],
      times: ['08:00'],
    },
  ];
  