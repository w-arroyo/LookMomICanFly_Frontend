import { Product } from "./Product.model";

export class Skateboard extends Product{

    private length!: string;
    
    public getLength(): string {
        return this.length;
    }

    public setLength(value: string) {
        this.length = value;
    }

}