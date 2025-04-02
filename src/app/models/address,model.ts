export class Address{

    private id!: string;
    private userId!: string;
    private fullName!: string;
    private street!: string;
    private city!: string;
    private zipCode!: string;
    private country!: string;
    

    public getUserId(): string {
        return this.userId;
    }
    public setUserId(value: string) {
        this.userId = value;
    }
    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }
    public getFullName(): string {
        return this.fullName;
    }
    public setFullName(value: string) {
        this.fullName = value;
    }
    public getCountry(): string {
        return this.country;
    }
    public setCountry(value: string) {
        this.country = value;
    }
    public getZipCode(): string {
        return this.zipCode;
    }
    public setZipCode(value: string) {
        this.zipCode = value;
    }
    public getCity(): string {
        return this.city;
    }
    public setCity(value: string) {
        this.city = value;
    }
    public getStreet(): string {
        return this.street;
    }
    public setStreet(value: string) {
        this.street = value;
    }

}