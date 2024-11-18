import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  VerticalType,
  CreateCatalogPayload,
  UpdateCatalogPayload,
} from "../types/catalog";
import { toast } from "react-toastify";

interface CatalogDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateCatalogPayload | UpdateCatalogPayload) => void;
  isEditMode: boolean;
  currentCatalog?: Partial<CreateCatalogPayload | UpdateCatalogPayload>;
}

const CatalogDialog: React.FC<CatalogDialogProps> = ({
  open,
  onClose,
  onSave,
  isEditMode,
  currentCatalog = {},
}) => {
  const [name, setName] = useState<string>(currentCatalog.name || "");
  const [vertical, setVertical] = useState<VerticalType>(
    currentCatalog.vertical || VerticalType.RETAIL,
  );
  const [primary, setPrimary] = useState<boolean>(
    currentCatalog.primary || false,
  );
  const [locales, setLocales] = useState<string>(
    currentCatalog.locales?.join(", ") || "",
  );

  // Reset form fields when the dialog opens
  useEffect(() => {
    setName(currentCatalog.name || "");
    setVertical(currentCatalog.vertical || VerticalType.RETAIL);
    setPrimary(currentCatalog.primary || false);
    setLocales(currentCatalog.locales?.join(", ") || "");
  }, [currentCatalog]);

  // Handle save action
  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!locales.trim()) {
      toast.error("Locales are required");
      return;
    }

    const localeArray = locales.split(",").map((locale) => locale.trim());

    const payload: CreateCatalogPayload | UpdateCatalogPayload = {
      name,
      vertical,
      primary,
      locales: localeArray,
    };

    if (isEditMode && currentCatalog.id) {
      (payload as UpdateCatalogPayload).id = currentCatalog.id;
    }

    onSave(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? "Edit Catalog" : "Create Catalog"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Vertical</InputLabel>
              <Select
                value={vertical}
                onChange={(e) => setVertical(e.target.value as VerticalType)}
                fullWidth
              >
                {Object.values(VerticalType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={primary}
                  onChange={(e) => setPrimary(e.target.checked)}
                />
              }
              label="Primary Catalog"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Locales (comma-separated)"
              value={locales}
              onChange={(e) => setLocales(e.target.value)}
              fullWidth
              required
              helperText="Example: en_US, es_ES, fr_FR"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {isEditMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatalogDialog;
