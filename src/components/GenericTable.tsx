import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface GenericTableProps<T> {
  data: T[];
  columns: {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
    isCheckbox?: boolean;
  }[];
  selectable?: boolean;
  selectedIds?: number[];
  onRowSelect?: (id: number) => void;
  onSelectAll?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  rowKey: keyof T;
}

const GenericTable = <T extends { [key: string]: any }>({
  data,
  columns,
  selectable = false,
  selectedIds = [],
  onRowSelect,
  onSelectAll,
  onEdit,
  onDelete,
  rowKey,
}: GenericTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedIds.length === data.length}
                  onChange={onSelectAll}
                />
              </TableCell>
            )}
            {columns.map((col, index) => (
              <TableCell key={index}>{col.label}</TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item[rowKey]}
              hover
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(item[rowKey])}
                    onChange={() => onRowSelect?.(item[rowKey])}
                  />
                </TableCell>
              )}
              {columns.map((col, index) => (
                <TableCell key={index}>
                  {col.render ? col.render(item) : item[col.key]}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell>
                  {onEdit && (
                    <IconButton onClick={() => onEdit(item)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton
                      color="error"
                      onClick={() => onDelete(item[rowKey])}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
