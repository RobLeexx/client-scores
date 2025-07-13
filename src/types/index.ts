export interface UserData {
  id: number; // Siempre es buena práctica tener un ID único para cada fila
  documentNumber: string;
  fullName: string;
  riskCategory: "A" | "B" | "C" | "D" | "E" | "F";
  date: string; // O Date si prefieres manejarlo como objeto Date
}
