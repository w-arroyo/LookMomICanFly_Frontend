export class PhoneNumber{

    private id!: string;
    private prefix!: string;
    private number!: string;
    
    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }
    public getPrefix(): string {
        return this.prefix;
    }
    public setPrefix(value: string) {
        this.prefix = value;
    }
    public getNumber(): string {
        return this.number;
    }
    public setNumber(value: string) {
        this.number = value;
    }

}