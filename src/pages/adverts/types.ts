export type Tag = "lifestyle" | "mobile" | "motor" | "work";

export interface Advert {
  id?: string;
  createdAt?: string;
  name: string;
  sale?: boolean;
  type?: string;
  price: number;
  tags: string[];
  photo: string | File;
  [key: string]: string | number | boolean | string[] | File | undefined;
}

export interface AdvertSimple
  extends Omit<Advert, "id" | "type" | "createdAt" | "photo" | "sale"> {
  sale: boolean;
  photo?: File;
}

export type AdvertResponse = Omit<AdvertSimple, "photo"> & {
  id: string;
  createdAt: string;
  photo: string | File;
};

export interface FilterByAdverts {
  name: string;
  tags: string[];
  sale?: boolean;
}

export type FiltersKey = keyof FilterByAdverts

export type FiltersTypeValues = FilterByAdverts["name"] | FilterByAdverts["tags"] | FilterByAdverts["sale"];


export interface RadioType {
  value: string;
  state: boolean;
}
