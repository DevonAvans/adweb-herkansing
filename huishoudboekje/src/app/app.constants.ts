import { Categorie } from "@models/categorie";
import { Huishoudboekje } from "@models/huishoudboekje";
import { Transactie } from "@models/transactie";
import { User } from "@models/user";

type FieldNames<T> = { [K in keyof T]: K };

export const COLLECTIONS = {
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
    TRANSACTIE: {
        NAME: "transacties",
        FIELDS: {} as FieldNames<Transactie>,
    },
};

export const INJECTS = {
    FIREBASE_APP: "FIREBASE_APP",
    FIRESTORE: "FIRESTORE",
};

export const LOCALSTORAGE = {
    USER_KEY: "loggedInUser",
};

export const ROUTES = {
    BASE: "",
    DASHBOARD: "dashboard",
    LOGIN: "login",
    HUISHOUDBOEKJEDETAILS: "huishoudboekje/:id",
    HUISHOUDBOEKJEEDIT: "huishoudboekje/edit/:id",
    CATEGORIEDETAILS: "categorie/:id",
    CATEGORIEEDIT: "categorie/edit/:id",
};
