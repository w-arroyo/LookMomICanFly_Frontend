import { Product } from "./Product.model";

export class Sneakers extends Product{

    private sku!: string;


    public getSku(): string {
        return this.sku;
    }
    public setSku(value: string) {
        this.sku = value;
    }

    

}