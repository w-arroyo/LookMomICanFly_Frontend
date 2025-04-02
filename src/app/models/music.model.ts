import { Product } from "./Product.model";

export class Music extends Product{

    private format!: string;
    
    public getFormat(): string {
        return this.format;
    }
    public setFormat(value: string) {
        this.format = value;
    }

}