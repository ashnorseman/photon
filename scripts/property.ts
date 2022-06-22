export interface Property {
  name: string;
  value?: string;
  fontFamily?: string;
  [k: string]: string;
}

export interface PropertyConfig {
  [k: string]: Property[];
}
