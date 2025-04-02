export class BankAccount{

    private id!: string;
    private number!: string;
    private userId!: string;
    
    public getUserId(): string {
        return this.userId;
    }
    public setUserId(value: string) {
        this.userId = value;
    }

    public getNumber(): string {
        return this.number;
    }
    public setNumber(value: string) {
        this.number = value;
    }

    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }

}