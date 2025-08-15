export enum tagTypes {
  AUTH = "auth",
}

// Automatically derive the list from the enum
export const tagTypeList = Object.values(tagTypes);
