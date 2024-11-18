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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Tooltip,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  VerticalType,
} from "../types/catalog";
import CatalogDialog from "./CatalogDialog";

const Catalogs: React.FC = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCatalog, setCurrentCatalog] = useState<Partial<Catalog>>({});
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch catalogs from backend
  const fetchCatalogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/catalogs");
      setCatalogs(response.data);
    } catch (error) {
      toast.error("Failed to fetch catalogs");
    } finally {
      setLoading(false);
    }
  };

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

  // Save or update catalog
  const handleSave = async () => {
    setLoading(true);
    try {
      if (isEditMode && currentCatalog.id) {
        await api.put(`/catalogs/${currentCatalog.id}`, currentCatalog);
        toast.success("Catalog updated successfully");
      } else {
        await api.post("/catalogs", currentCatalog as CreateCatalogPayload);
        toast.success("Catalog created successfully");
      }
      fetchCatalogs();
      handleCloseDialog();
    } catch (error) {
      toast.error("Failed to save catalog");
    } finally {
      setLoading(false);
    }
  };

  // Handle selection for bulk delete
  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Bulk delete action
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("No catalogs selected for deletion");
      return;
    }

    setLoading(true);
    try {
      await api.post("/catalogs/bulk_delete", { ids: selectedIds });
      toast.success(`Deleted ${selectedIds.length} catalogs`);
      fetchCatalogs();
      setSelectedIds([]);
    } catch (error) {
      toast.error("Failed to delete catalogs");
    } finally {
      setLoading(false);
    }
  };

const handleSaveCatalog = async (
  payload: CreateCatalogPayload | UpdateCatalogPayload,
) => {
  setLoading(true);
  try {
    if (isEditMode && (payload as UpdateCatalogPayload).id) {
      await api.put(
        `/catalogs/${(payload as UpdateCatalogPayload).id}`,
        payload,
      );
      toast.success("Catalog updated successfully");
    } else {
      await api.post("/catalogs", payload);
      toast.success("Catalog created successfully");
    }
    fetchCatalogs();
    handleCloseDialog();
  } catch (error) {
    toast.error("Failed to save catalog");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCatalogs();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Catalogs Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          <AddIcon /> Add Catalog
        </Button>
        <Button variant="outlined" color="error" onClick={handleBulkDelete}>
          Delete Selected
        </Button>
      </Box>

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
              <TableCell>Locales</TableCell>
              <TableCell>Primary</TableCell>
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
                <TableCell>{catalog.locales.join(", ")}</TableCell>
                <TableCell>{catalog.primary ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(catalog)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleSelect(catalog.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CatalogDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveCatalog}
        isEditMode={isEditMode}
        currentCatalog={currentCatalog}
      />
    </Box>
  );
};

export default Catalogs;
