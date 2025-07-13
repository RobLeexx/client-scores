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
  TextField, // Importar TextField
  Box, // Importar Box para organizar los TextField
} from "@mui/material";
import { UserData } from "../types";
import { generateRandomUserData } from "../utils/dataGenerator";

const UserTable: React.FC = () => {
  const [allRows, setAllRows] = useState<UserData[]>([]); // Almacena todos los datos originales
  const [documentFilter, setDocumentFilter] = useState<string>(""); // Estado para el filtro de documento
  const [nameFilter, setNameFilter] = useState<string>(""); // Estado para el filtro de nombre

  useEffect(() => {
    // Genera 50 filas de datos aleatorios al cargar el componente
    const data = generateRandomUserData(50);
    setAllRows(data);
  }, []);

  // Use useMemo para filtrar los datos solo cuando cambian los filtros o los datos originales
  const filteredRows = useMemo(() => {
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

      {/* Contenedor para las barras de búsqueda */}
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
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => (
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
    </TableContainer>
  );
};

export default UserTable;
