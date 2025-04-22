export interface MockData {
  fn: string; // First name
  ln: string; // Last name
  st: string; // State or province
  ct: string; // City
  co: string; // Country
  age: number; // Age
  gen: 'M' | 'F'; // Gender
  sn: string; // Social network
  imv: VenezuelaFuture; // How they imagine Venezuela in 6 months
  hps: HappinessLevel; // Current happiness state of the user
}

export enum VenezuelaFuture {
  Optimistic = 1,
  Pessimistic = 2,
  Neutral = 3,
  Uncertain = 4
}

export enum HappinessLevel {
  VeryUnhappy = 1,
  Unhappy = 2,
  Neutral = 3,
  Happy = 4
}