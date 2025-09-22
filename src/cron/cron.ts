import { CronJob } from "cron";

/* import { updateDB, getCurrentTariffs } from "#services/databaseService.js";
import { fetchTariffs } from "#services/wildberriesService.js";
import { reFillSheets } from "#services/googleSheetService.js"; */

export class TariffJob {
    async start(): Promise<void> {
        console.log("Starting tariff first update job...");
        await this.updateTariffs()
            .catch((error) => {
                console.error("Tariff first update job failed:", error.message);
            })
            .then(() => console.log("Tariff first update job completed successfully"));

        const job = new CronJob("* * * * *", async () => {
            console.log("Starting tariff update job...");
            await this.updateTariffs().catch((error) => {
                console.error("Tariff update job failed:", error.message);
            });
            console.log("Tariff update job completed successfully");
        });

        job.start();
        console.log("Tariff update job started.");
    }

    async updateTariffs(): Promise<void> {
        const today = new Date().toISOString().split("T")[0];

        console.log(`[${new Date().toISOString()}] Fetching tariffs for ${today}`);
        /* const tariffs = await fetchTariffs(today);

        console.log(`[${new Date().toISOString()}] Updating database...`);
        await updateDB(today, tariffs);

        console.log(`[${new Date().toISOString()}] Fetching current tariffs from DB...`);
        const current = await getCurrentTariffs();

        console.log(`[${new Date().toISOString()}] Updating Google Sheets...`);
        await reFillSheets(current); */

        console.log(`[${new Date().toISOString()}] Tariffs updated successfully!`);
    }
}
