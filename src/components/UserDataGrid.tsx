import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { UserData } from "../types";
import { generateRandomUserData } from "../utils/dataGenerator";

const UserTable: React.FC = () => {
  const [rows, setRows] = useState<UserData[]>([]);

  useEffect(() => {
    // Genera 20 filas de datos aleatorios al cargar el componente
    const data = generateRandomUserData(20);
    setRows(data);
  }, []);

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
          {rows.map((row) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
