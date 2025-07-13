import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Box,
  TablePagination, // Importar TablePagination
} from "@mui/material";
import { UserData } from "../types";
import { generateRandomUserData } from "../utils/dataGenerator";

const UserTable: React.FC = () => {
  const [allRows, setAllRows] = useState<UserData[]>([]);
  const [documentFilter, setDocumentFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");

  // Estados para la paginación
  const [page, setPage] = useState(0); // Página actual (0-indexado)
  const [rowsPerPage, setRowsPerPage] = useState(10); // Filas por página

  useEffect(() => {
    // Genera 50 filas de datos aleatorios al cargar el componente
    const data = generateRandomUserData(50);
    setAllRows(data);
  }, []);

  // Filtra los datos primero
  const filteredRows = useMemo(() => {
    // Cuando cambian los filtros, volvemos a la primera página
    // Esto es una buena práctica para evitar que el usuario quede en una página vacía
    setPage(0);
    return allRows.filter((row) => {
      const matchesDocument = row.documentNumber
        .toLowerCase()
        .includes(documentFilter.toLowerCase());
      const matchesName = row.fullName
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      return matchesDocument && matchesName;
    });
  }, [allRows, documentFilter, nameFilter]);

  // Aplica la paginación a los datos filtrados
  const paginatedRows = useMemo(() => {
    return filteredRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredRows, page, rowsPerPage]);

  // Manejador para el cambio de página
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Manejador para el cambio de filas por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Volver a la primera página al cambiar las filas por página
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 900, margin: "20px auto" }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ padding: "16px", backgroundColor: "#f5f5f5" }}
      >
        Datos de Usuarios
      </Typography>

      <Box
        sx={{
          padding: "16px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Filtrar por Número de Documento"
          variant="outlined"
          value={documentFilter}
          onChange={(e) => setDocumentFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
        />
        <TextField
          label="Filtrar por Nombre Completo"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
        />
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Número de Documento</TableCell>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Categoría de Riesgo</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.length > 0 ? (
            paginatedRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.documentNumber}
                </TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.riskCategory}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center", py: 3 }}>
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Componente de Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Opciones para el número de filas por página
        component="div"
        count={filteredRows.length} // Total de filas después del filtrado
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:" // Personalizar el texto
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        } // Personalizar el texto de visualización
      />
    </TableContainer>
  );
};

export default UserTable;
