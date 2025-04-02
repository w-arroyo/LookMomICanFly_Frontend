import { Product } from "./Product.model";

export class Accessory extends Product{

    private material!: string;
    
    public getMaterial(): string {
        return this.material;
    }
    public setMaterial(value: string) {
        this.material = value;
    }

}