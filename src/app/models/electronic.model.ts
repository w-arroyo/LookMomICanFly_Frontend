import { Product } from "./Product.model";

export class Electronic extends Product{

    private caution!: boolean;

    public getCaution(): boolean {
        return this.caution;
    }
    public setCaution(value: boolean) {
        this.caution = value;
    }

}