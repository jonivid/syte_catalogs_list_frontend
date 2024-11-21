import {
  Catalog,
  CreateCatalogPayload,
  IndexCatalogsResponse,
  UpdateCatalogPayload,
} from "../types/catalog";
import api from "./axiosInstance";

export const fetchCatalogsApi = async (
  name?: string,
  multiLocale?: boolean,
): Promise<Catalog[]> => {
  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (multiLocale) params.append("multiLocale", "true");

  const response = await api.get<Catalog[]>(`/catalogs?${params.toString()}`);
  return response.data;
};

export const createCatalogApi = async (
  payload: CreateCatalogPayload,
): Promise<Catalog> => {
  const response = await api.post<Catalog>("/catalogs", payload);
  return response.data;
};

export const updateCatalogApi = async (
  id: number,
  payload: UpdateCatalogPayload,
): Promise<Catalog> => {
  const response = await api.put<Catalog>(`/catalogs/${id}`, payload);
  return response.data;
};

export const deleteCatalogApi = async (id: number): Promise<void> => {
  await api.delete(`/catalogs/${id}`);
};

export const bulkDeleteCatalogsApi = async (ids: number[]): Promise<void> => {
  await api.post("/catalogs/bulk_delete", { ids });
};

export const indexCatalogsByIdApi = async (
  ids: number[],
): Promise<IndexCatalogsResponse> => {
  const response = await api.post<IndexCatalogsResponse>(
    "/catalogs/index_selected",
    { ids },
  );
  return response.data;
};
