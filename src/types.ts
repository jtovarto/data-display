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
}

export enum VenezuelaFuture {
  Optimistic = 1,
  Pessimistic = 2,
  Neutral = 3,
  Uncertain = 4
}