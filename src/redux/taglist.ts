export enum tagTypes {
  AUTH = "auth",
  COURSE = "course",
}

// Automatically derive the list from the enum
export const tagTypeList = Object.values(tagTypes);
