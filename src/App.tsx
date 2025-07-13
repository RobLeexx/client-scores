import React from "react";
import "./App.css"; // Puedes usar tus estilos CSS existentes o dejarlo vacío
import UserTable from "./components/UserDataGrid";
import { CssBaseline, Container } from "@mui/material"; // Para estilos básicos de Material-UI

function App() {
  return (
    <>
      <CssBaseline /> {/* Normaliza los estilos CSS */}
      <div className="App">
        <header
          className="App-header"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "#3f51b5",
            color: "white",
            padding: "10px",
          }}
        >
          <h1>Mi Aplicación de Datos (con MUI Table)</h1>
        </header>
        <Container maxWidth="md">
          {" "}
          {/* Limita el ancho del contenido */}
          <main style={{ padding: "20px" }}>
            <UserTable />
          </main>
        </Container>
      </div>
    </>
  );
}

export default App;
