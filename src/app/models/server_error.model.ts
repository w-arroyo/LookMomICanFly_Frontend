export class ServerError{

    private errorName!: string;
    private errorDetails!: string;
    private errorList!: string[];
    
    public getErrorName(): string {
        return this.errorName;
    }
    public setErrorName(value: string) {
        this.errorName = value;
    }
    public getErrorDetails(): string {
        return this.errorDetails;
    }
    public setErrorDetails(value: string) {
        this.errorDetails = value;
    }
    public getErrorList(): string[] {
        return this.errorList;
    }
    public setErrorList(value: string[]) {
        this.errorList = value;
    }

}