import { Timestamp } from "firebase/firestore";

export interface Categorie {
    id?: string;
    name: string;
    budget: number;
    endDate?: Timestamp | null;
    endDateFormatted?: string;
    huishoudboekje?: string;
}
