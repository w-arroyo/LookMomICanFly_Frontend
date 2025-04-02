import { Product } from "./Product.model";

export class Clothing extends Product{

    private season!: string;

    public getSeason(): string {
        return this.season;
    }
    public setSeason(value: string) {
        this.season = value;
    }

}