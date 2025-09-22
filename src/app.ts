import env from "#config/env/env";
import { TariffJob } from "#cron/cron";

async function bootstrap() {
    console.log("Running migrations...");
    /* await migrate.latest();

    console.log("Running seeds...");
    await seed.run();

    console.log("All migrations and seeds have been run"); */

    if (env.GOOGLE_API_KEY_FILE_PATH && env.GOOGLE_TABLE_IDS && env.GOOGLE_TABLE_SHEET_NAME && env.WB_API_URL && env.WB_API_KEY) {
        try {
            const tariffJob = new TariffJob();
            await tariffJob.start();
        } catch (error: any) {
            console.log("Tariff job was crashed:", error.message);
        }
    }
}

bootstrap();
