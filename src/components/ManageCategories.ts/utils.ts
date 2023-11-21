import { RegisterOptions } from "react-hook-form";
export type Messages = { [key in keyof RegisterOptions]?: string };
type Fields = "image" | "name" | "description" | "start_date" | "end_date" | "category" | "color";

type Validator = { [key in keyof RegisterOptions]?: any };
export type Validators = {
    [key in Fields]?: Validator;
};

export const messages: Messages = {
    minLength: "Minimal length not reached, should be at least ",
    maxLength: "Max length exceeded ",
    required: "This field is required ",
    pattern: "Not a valid content",
};
export const criterions = {
    description: {
        required: true,
        pattern: /^.*[a-zA-Z0-9]+.*$/,
    },
    name: {
        required: true,
        pattern: /^.*[a-zA-Z0-9]+.*$/,
    },
    category: {
        required: true,
        pattern: /^.*[a-zA-Z0-9]+.*$/,
    },
    color: {
        required: true,
        pattern: /#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})\b$/i,
    },

    image: {
        required: true,
        pattern:
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },
    start_date: {
        required: true,
    },
    end_date: {
        required: true,
    },
};
export const validators: Validators = {
    description: { ...criterions.description },
    name: { ...criterions.name },
    image: { ...criterions.image },
    start_date: { ...criterions.start_date },
    end_date: { ...criterions.end_date },
    category: { ...criterions.category },
    color: { ...criterions.color },
};
