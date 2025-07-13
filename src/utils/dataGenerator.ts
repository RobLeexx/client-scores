import { UserData } from "../types";

const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateRandomFullName = () => {
  const firstNames = [
    "Juan",
    "Maria",
    "Pedro",
    "Ana",
    "Luis",
    "Sofia",
    "Carlos",
    "Laura",
  ];
  const lastNames = [
    "Gomez",
    "Rodriguez",
    "Fernandez",
    "Lopez",
    "Martinez",
    "Perez",
    "Garcia",
    "Sanchez",
  ];
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
};

const generateRandomDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};

const riskCategories: ("A" | "B" | "C" | "D" | "E" | "F")[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

export const generateRandomUserData = (count: number): UserData[] => {
  const data: UserData[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i,
      documentNumber: generateRandomString(10).toUpperCase(),
      fullName: generateRandomFullName(),
      riskCategory:
        riskCategories[Math.floor(Math.random() * riskCategories.length)],
      date: generateRandomDate(),
    });
  }
  return data;
};
