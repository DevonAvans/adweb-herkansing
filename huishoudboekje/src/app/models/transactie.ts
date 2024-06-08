import { Timestamp } from "firebase/firestore";

type uitgaven = "uitgaven";
type inkomen = "inkomen";
export type TransactieType = uitgaven | inkomen;

export interface Transactie {
    id?: string;
    amount: number;
    category?: string;
    huishoudboekje: string;
    type: TransactieType;
    dateTime: Timestamp;
}
