import { Categorie } from "@models/categorie";
import { Huishoudboekje } from "@models/huishoudboekje";
import { UitgavenInkomsten } from "@models/uitgaven-inkomsten";
import { User } from "@models/user";

type FieldNames<T> = { [K in keyof T]: K };

export const COLLECTION = {
    USERS: {
        NAME: "users",
        FIELDS: {} as FieldNames<User>,
    },
    HUISHOUDBOEKJES: {
        NAME: "huishoudboekjes",
        FIELDS: {} as FieldNames<Huishoudboekje>,
    },
    CATEGORIEEN: {
        NAME: "categorieen",
        FIELDS: {} as FieldNames<Categorie>,
    },
    UITGAVEN_INKOMSTEN: {
        NAME: "uitgaven-inkomsten",
        FIELDS: {} as FieldNames<UitgavenInkomsten>,
    },
};

export const LOCALSTORAGE = {
    USER_KEY: "loggedInUser",
};

export const ROUTES = {
    BASE: "",
    DASHBOARD: "dashboard",
    LOGIN: "login",
};
