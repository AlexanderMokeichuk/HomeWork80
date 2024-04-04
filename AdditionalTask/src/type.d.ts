export interface CategoryFromFrontend {
  name: string,
  description: string | null,
}

export interface PlaceFromFrontend extends CategoryFromFrontend {}

export interface ItemsFromFrontend {
  categoryId: number,
  placeId: number,
  name: string,
  description: string | null,
  image: string | null
}