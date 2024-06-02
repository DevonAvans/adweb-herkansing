import { Timestamp } from "firebase/firestore";

export type uitgaven = "uitgaven";
export type inkomen = "inkomen";

export interface Transactie {
    id?: string;
    amount: number;
    category: string | undefined;
    huishoudboekje: string;
    type: uitgaven | inkomen;
    dateTime: Timestamp;
}
