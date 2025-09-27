export interface FetchedTariff {
    warehouseName: string;
    geoName: string;
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    boxDeliveryAndStorageExpr: string;
}

export interface DbSavedTariff {
    date: string;
    warehouse_name: string;
    geo_name?: string;
    box_delivery_base?: number;
    box_delivery_coef_expr?: number;
    box_delivery_liter?: number;
    box_delivery_marketplace_base?: number;
    box_delivery_marketplace_coef_expr?: number;
    box_delivery_marketplace_liter?: number;
    box_storage_base?: number;
    box_storage_coef_expr?: number;
    box_storage_liter?: number;
    box_delivery_and_storage_expr?: string;
}

export interface ApiResponse {
    response: {
        data: {
            dtNextBox: string;
            dtTillMax: string;
            warehouseList: FetchedTariff[];
        };
    };
}
