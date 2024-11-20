// Enum for vertical types (Assuming common types from the backend service)
export enum VerticalType {
  FASHION = "fashion",
  HOME = "home",
  GENERAL = "general",
}

// Interface for Catalog entity
export interface Catalog {
  id: number;
  name: string;
  vertical: VerticalType;
  primary: boolean;
  locales: string[];
  createdAt: string;
  indexedAt: Date | string;
}

// Payload for creating a new catalog
export interface CreateCatalogPayload {
  name: string;
  vertical: VerticalType;
  primary: boolean;
  locales: string[];
}

// Payload for updating an existing catalog
export interface UpdateCatalogPayload {
  id: number;
  name?: string;
  vertical?: VerticalType;
  primary?: boolean;
  locales?: string[];
}

// Response for a successful delete action
export interface DeleteCatalogResponse {
  message: string;
}

// Payload for bulk delete action
export interface BulkDeletePayload {
  ids: number[];
}

// Response for bulk delete action
export interface BulkDeleteResponse {
  message: string;
  deletedCount: number;
}

// Search filters interface
export interface SearchFilters {
  name?: string;
  multiLocale?: boolean;
}

// API Error Response Interface
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// Interface for API responses containing a list of catalogs
export interface GetCatalogsResponse {
  data: Catalog[];
}
