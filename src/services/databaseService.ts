import knex from "#postgres/knex";
import { DbSavedTariff, FetchedTariff } from "#types/tariff";

export async function updateDB(date: string, tariffs: FetchedTariff[]): Promise<void> {
    try {
        await knex.transaction(async (trx) => {
            for (const t of tariffs) {
                try {
                    await trx("tariffs")
                        .insert({
                            date,
                            warehouse_name: t.warehouseName,
                            geo_name: t.geoName,
                            box_delivery_base: parseFloat(t.boxDeliveryBase.toString()),
                            box_delivery_coef_expr: parseFloat(t.boxDeliveryCoefExpr.toString()),
                            box_delivery_liter: parseFloat(t.boxDeliveryLiter.toString().replace(",", ".")),
                            box_delivery_marketplace_base: parseFloat(t.boxDeliveryMarketplaceBase.toString()),
                            box_delivery_marketplace_coef_expr: parseFloat(t.boxDeliveryMarketplaceCoefExpr.toString()),
                            box_delivery_marketplace_liter: parseFloat(t.boxDeliveryMarketplaceLiter.toString().replace(",", ".")),
                            box_storage_base: parseFloat(t.boxStorageBase.toString()),
                            box_storage_coef_expr: parseFloat(t.boxStorageCoefExpr.toString()),
                            box_storage_liter: parseFloat(t.boxStorageLiter.toString().replace(",", ".")),
                            box_delivery_and_storage_expr: t.boxDeliveryAndStorageExpr,
                        })
                        .onConflict(["date", "warehouse_name"])
                        .merge();
                } catch (err) {
                    console.error(`Failed to update tariff for warehouse ${t.warehouseName}: ${err}`);
                    throw err;
                }
            }
        });
    } catch (err) {
        throw new Error(`Failed to update database: ${err}`);
    }
}

export async function getCurrentTariffs(): Promise<DbSavedTariff[]> {
    const today = new Date().toISOString().split("T")[0];
    return await knex("tariffs").where("date", today).orderBy("box_delivery_coef_expr", "asc");
}
