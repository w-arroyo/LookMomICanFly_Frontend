import { Product } from "./Product.model";

export class Football extends Product{

    private scope!: string;

    public getScope(): string {
        return this.scope;
    }
    public setScope(value: string) {
        this.scope = value;
    }

}