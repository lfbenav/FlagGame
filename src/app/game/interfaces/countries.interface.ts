export interface Country {
  flag: string;
  name: string;
}

export interface SearchResponse {
  flags: Flags;
  name:  Name;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common:   string;
}