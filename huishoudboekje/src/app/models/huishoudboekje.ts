export interface Huishoudboekje {
    id?: string;
    name: string;
    description: string;
    owner: string;
    archive: boolean;
    participants?: string[];
}
