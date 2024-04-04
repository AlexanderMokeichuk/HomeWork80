export interface CategoryFromFrontend {
  name: string,
  description: string | null,
}

export interface PlaceFromFrontend extends CategoryFromFrontend {}