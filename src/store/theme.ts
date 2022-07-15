import { atom } from "jotai";

export const isDark = atom(false); // light is the default
export const CText = atom(get => get(isDark) ? "text-light" : "text-dark"); // text class
export const CBg = atom(get => get(isDark) ? "bg-dark" : "bg-light"); // background class
export const foreVariant = atom(get => get(isDark) ? "light" : "dark"); // light variant;
export const backVariant = atom(get => get(isDark) ? "dark" : "light"); // dark variant;
export const border = atom(get => get(isDark) ? "secondary" : "");
