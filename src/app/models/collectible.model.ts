import { Product } from "./Product.model";

export class Collectible extends Product{

    private collectionName!: string;

    public getCollectionName(): string {
        return this.collectionName;
    }
    public setCollectionName(value: string) {
        this.collectionName = value;
    }

}