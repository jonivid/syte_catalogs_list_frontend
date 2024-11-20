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
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  VerticalType,
  CreateCatalogPayload,
  UpdateCatalogPayload,
} from "../types/catalog";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

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
    currentCatalog.vertical || VerticalType.FASHION,
  );
  const [primary, setPrimary] = useState<boolean>(
    currentCatalog.primary || false,
  );
  const [locales, setLocales] = useState<string[]>(
    currentCatalog.locales || [],
  );
  const [newLocale, setNewLocale] = useState<string>(""); // For the TextField

  // Reset form fields when the dialog opens
  useEffect(() => {
    setName(currentCatalog.name || "");
    setVertical(currentCatalog.vertical || VerticalType.FASHION);
    setPrimary(currentCatalog.primary || false);
    setLocales(currentCatalog.locales || []);
  }, [currentCatalog]);

  // Handle save action
  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!locales.length) {
      toast.error("At least one locale is required");
      return;
    }

    const invalidLocales = locales.filter(
      (locale) => !/^[a-z]{2}_[A-Z]{2}$/.test(locale),
    );

    if (invalidLocales.length > 0) {
      toast.error(`Invalid locales: ${invalidLocales.join(", ")}`);
      return;
    }

    if (isEditMode && currentCatalog?.id) {
      const payload: UpdateCatalogPayload = {
        id: currentCatalog.id,
        name,
        vertical,
        primary,
        locales,
      };
      onSave(payload); // TypeScript knows this is UpdateCatalogPayload
    } else {
      const payload: CreateCatalogPayload = {
        name,
        vertical,
        primary,
        locales,
      };
      onSave(payload); // TypeScript knows this is CreateCatalogPayload
    }
  };

  const handleAddLocale = () => {
    if (!newLocale.trim()) {
      toast.error("Locale cannot be empty");
      return;
    }

    if (!/^[a-z]{2}_[A-Z]{2}$/.test(newLocale)) {
      toast.error("Invalid locale format. Use format: en_US");
      return;
    }

    if (locales.includes(newLocale)) {
      toast.error("Locale already exists");
      return;
    }

    setLocales((prev) => [...prev, newLocale]);
    setNewLocale(""); // Clear the TextField after adding
  };

  const handleLocalDelete = (localToDelete: string): void => {
    setLocales((pre) => {
      const localsState = [...pre];
      return localsState.filter(
        (local) => local.toLowerCase() !== localToDelete.toLowerCase(),
      );
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? "Edit Catalog" : "Create Catalog"}
      </DialogTitle>
      <DialogContent
        style={{
          maxHeight: "500px",
          minHeight: "400px",
          overflowY: "auto",
          padding: "16px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ marginTop: "15px" }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "15px" }}>
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
              label="Add Locale"
              value={newLocale}
              onChange={(e) => setNewLocale(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddLocale();
                  e.preventDefault(); // Prevent form submission
                }
              }}
              fullWidth
              helperText="Press Enter or click Add to add a locale (format: en_US)"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleAddLocale}
                      style={{ color: "white" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {locales.length > 0 && (
              <div style={{ marginTop: "15px" }}>
                {locales.map((local) => (
                  <Chip
                    key={local}
                    label={local}
                    variant="outlined"
                    onDelete={() => handleLocalDelete(local)}
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                  />
                ))}
              </div>
            )}
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
