import { RegisterOptions } from "react-hook-form";

export type Messages = { [key in keyof RegisterOptions]?: string };

type Fields = "firstName" | "surName" | "password" | "email" | "dob" | "address" | "city" | "state" | "zip";

type Validator = { [key in keyof RegisterOptions]?: any };
export type Validators = {
    [key in Fields]?: Validator;
};
