export enum tagTypes {
  AUTH = "auth",
  COURSE = "course",
  USERS = "user",
  ORDERS = "orders",
  MYCLASS = "myclass",
  LECTURE = "lectures",
  MODULE = "modules",
}

// Automatically derive the list from the enum
export const tagTypeList = Object.values(tagTypes);
