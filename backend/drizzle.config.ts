import {ENV} from "./src/config/env";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema:"./src/db/schema.ts",
    dialect:"postgresql",
    dbCredentials:{
       url:ENV.DB_URL!,
    }
})