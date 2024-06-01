import { Timestamp } from "firebase/firestore";

export interface Transactie {
    id?: string;
    amount: number;
    category: string | undefined;
    huishoudboekje: string;
    type: string;
    dateTime: Timestamp;
}
