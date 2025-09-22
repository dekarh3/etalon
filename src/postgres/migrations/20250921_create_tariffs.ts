import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tariffs", (table) => {
        table.date("date").notNullable();
        table.string("warehouse_name").notNullable();
        table.string("geo_name");
        table.decimal("box_delivery_base", 10, 2);
        table.decimal("box_delivery_coef_expr", 10, 2);
        table.decimal("box_delivery_liter", 10, 2);
        table.decimal("box_delivery_marketplace_base", 10, 2);
        table.decimal("box_delivery_marketplace_coef_expr", 10, 2);
        table.decimal("box_delivery_marketplace_liter", 10, 2);
        table.decimal("box_storage_base", 10, 2);
        table.decimal("box_storage_coef_expr", 10, 2);
        table.decimal("box_storage_liter", 10, 2);
        table.string("box_delivery_and_storage_expr");
        table.primary(["date", "warehouse_name"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tariffs");
}
