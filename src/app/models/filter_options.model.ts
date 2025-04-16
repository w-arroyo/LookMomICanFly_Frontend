export class FilterSelectedOptions{

    subcategories:string[]=[];
    years:number[]=[];
    colors:string[]=[];
    manufacturers:string[]=[];

    clearOptions(){
        this.subcategories=[];
        this.years=[];
        this.colors=[];
        this.manufacturers=[];
    }

}