export const ANIMAL_SPECIES = [
  { value: 'BATTLE', label: 'Cattle' },
  { value: 'SHEEP', label: 'Sheep' },
  { value: 'PIG', label: 'Pig' },
  { value: 'GOAT', label: 'Goat' },
  { value: 'POULTRY', label: 'Poultry' },
] as const;

export const HEALTH_EVENT_TYPES = [
  'VACCINATION',
  'ILLNESS',
  'TREATMENT',
  'CHECKUP',
  'BIRTH',
  'DEATH',
] as const;

export const USER_ROLES = [
  'FARMER',
  'VETERINARIAN',
  'INSPECTOR',
  'BUYER'
] as const;
