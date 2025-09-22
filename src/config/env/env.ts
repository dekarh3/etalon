import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    APP_PORT: z.union([
        z.undefined(),
        z
            .string()
            .regex(/^[0-9]+$/)
            .transform((value) => parseInt(value)),
    ]),

    GOOGLE_TABLE_IDS: z.string().min(1, "Google table identifiers is required"),
    GOOGLE_TABLE_SHEET_NAME: z.string().min(1, "Google table sheet name is required"),
    GOOGLE_API_KEY_FILE_PATH: z.string().regex(/^\/(?:[a-zA-Z0-9_.-]+\/?)*$/, "Path to Google api JSON key file is required"),
    WB_API_URL: z.string().url("WB URL is required"),
    WB_API_KEY: z.string().min(1, "WB API key is required"),
});

const env = envSchema.parse({
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    GOOGLE_TABLE_IDS: process.env.GOOGLE_TABLE_IDS,
    GOOGLE_TABLE_SHEET_NAME: process.env.GOOGLE_TABLE_SHEET_NAME,
    GOOGLE_API_KEY_FILE_PATH: process.env.GOOGLE_API_KEY_FILE_PATH,
    WB_API_URL: process.env.WB_API_URL,
    WB_API_KEY: process.env.WB_API_KEY,
});

export default env;
