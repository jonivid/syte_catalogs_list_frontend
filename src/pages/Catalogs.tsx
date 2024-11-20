import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import {
  Catalog,
  CreateCatalogPayload,
  UpdateCatalogPayload,
} from "../types/catalog";
import CatalogDialog from "../components/CatalogDialog";
import { AxiosError, isAxiosError } from "axios";
import {
  bulkDeleteCatalogsApi,
  createCatalogApi,
  deleteCatalogApi,
  fetchCatalogsApi,
  updateCatalogApi,
} from "../api/catalogService";

const Catalogs: React.FC = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentCatalog, setCurrentCatalog] = useState<Partial<Catalog>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(""); // Free-text search
  const [multiLocaleFilter, setMultiLocaleFilter] = useState<boolean>(false); // Multi-locale filter

  //UI handlers

  // Open dialog for create/edit
  const handleOpenDialog = (catalog?: Catalog) => {
    setIsEditMode(!!catalog);
    setCurrentCatalog(catalog || { primary: false, locales: [] });
    setOpenDialog(true);
  };
  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCatalog({});
    setIsEditMode(false);
  };
  // Handle selection for bulk delete
  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const fetchCatalogs = async (name?: string, multiLocale?: boolean) => {
    setLoading(true);
    try {
      const data = await fetchCatalogsApi(name, multiLocale);
      setCatalogs(data);
    } catch (error) {
      toast.error("Failed to fetch catalogs");
    } finally {
      setLoading(false);
    }
  };
  const createCatalog = async (payload: CreateCatalogPayload) => {
    try {
      const newCatalog = await createCatalogApi(payload);
      if (newCatalog.primary) {
        setCatalogs((prev) => {
          const arr = prev.map((c) => {
            if (c.vertical === newCatalog.vertical) {
              return { ...c, primary: false };
            } else return c;
          });
          arr.push(newCatalog);
          return arr;
        });
      } else {
        setCatalogs((prev) => [...prev, newCatalog]);
      }
      toast.success("Catalog created successfully");
      handleCloseDialog();
    } catch (error) {
      toast.error("Failed to create catalog");
    }
  };
  const updateCatalog = async (payload: UpdateCatalogPayload) => {
    try {
      const updatedCatalog = await updateCatalogApi(payload.id, payload);

      if (updatedCatalog.primary) {
        // If the updated catalog is set to primary, cascade changes to other catalogs
        setCatalogs((prev) => {
          return prev.map((c) => {
            if (
              c.vertical === updatedCatalog.vertical &&
              c.id !== updatedCatalog.id
            ) {
              return { ...c, primary: false }; // Set primary to false for other catalogs in the same vertical
            } else if (c.id === updatedCatalog.id) {
              return updatedCatalog; // Update the catalog itself
            }
            return c;
          });
        });
      } else {
        // If not primary, simply update the catalog
        setCatalogs((prev) =>
          prev.map((c) => (c.id === updatedCatalog.id ? updatedCatalog : c)),
        );
      }

      toast.success("Catalog updated successfully");
      handleCloseDialog();
    } catch (error) {
      toast.error("Failed to update catalog");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      // Call the utility function to delete the catalog
      await deleteCatalogApi(id);

      // Update the catalogs state locally by removing the deleted catalog
      setCatalogs((prev) => prev.filter((catalog) => catalog.id !== id));

      // Update the selected IDs to ensure the deleted catalog is removed from selections
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

      toast.success("Catalog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete catalog");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No catalogs selected for deletion");
      return;
    }

    try {
      // Call the bulk delete API
      await bulkDeleteCatalogsApi(selectedIds);

      // Update the catalogs state locally by removing the deleted ones
      setCatalogs((prev) =>
        prev.filter((catalog) => !selectedIds.includes(catalog.id)),
      );

      // Clear the selected IDs
      setSelectedIds([]);

      toast.success(`Deleted ${selectedIds.length} catalogs`);
    } catch (error) {
      toast.error("Failed to delete catalogs");
    }
  };

  
  const handleIndexAll = async () => {
    try {
      await api.post("/catalogs/index-all"); // Backend endpoint
      toast.success("All catalogs indexed successfully");
      fetchCatalogs(); // Refresh the catalog list
    } catch (error) {
      toast.error("Failed to index all catalogs");
    }
  };
  useEffect(() => {
    fetchCatalogs();
  }, []);
  useEffect(() => {
    fetchCatalogs(searchText, multiLocaleFilter);
  }, [searchText, multiLocaleFilter]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Catalogs Management
      </Typography>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        {/* Free-Text Search */}
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
        />

        {/* Multi-Locale Filter */}
        <FormControlLabel
          control={
            <Checkbox
              checked={multiLocaleFilter}
              onChange={(e) => setMultiLocaleFilter(e.target.checked)}
              color="primary"
              disabled={loading} // Disable during loading
            />
          }
          label="Multi-Locale Only"
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          <AddIcon /> Add Catalog
        </Button>
        <Button onClick={handleIndexAll} variant="contained" color="success">
          Index All Catalogs
        </Button>
        <Button variant="outlined" color="error" onClick={handleBulkDelete}>
          Delete Selected
        </Button>
      </Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.length === catalogs.length}
                    onChange={() =>
                      setSelectedIds(
                        selectedIds.length === catalogs.length
                          ? []
                          : catalogs.map((c) => c.id),
                      )
                    }
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Vertical</TableCell>
                <TableCell>Multi Local</TableCell>
                <TableCell>Primary</TableCell>
                <TableCell>Last Indexed</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {catalogs.map((catalog) => (
                <TableRow
                  key={catalog.id}
                  hover
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(catalog.id)}
                      onChange={() => handleSelect(catalog.id)}
                    />
                  </TableCell>
                  <TableCell>{catalog.name}</TableCell>
                  <TableCell>{catalog.vertical}</TableCell>
                  <TableCell>
                    {catalog.locales.length > 1 ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>{catalog.primary ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {catalog.indexedAt
                      ? new Date(catalog.indexedAt).toLocaleString()
                      : "Not Indexed Yet"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(catalog)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(catalog.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CatalogDialog
        open={openDialog}
        onClose={handleCloseDialog}
        isEditMode={isEditMode}
        currentCatalog={currentCatalog}
        createCatalog={createCatalog}
        updateCatalog={updateCatalog}
      />
    </Box>
  );
};

export default Catalogs;
