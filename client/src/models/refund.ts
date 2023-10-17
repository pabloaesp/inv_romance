export class Refund {
    constructor(
        public user: string,
        public products: string,
        public note: string,
        public week: string,
        public date: string 
    ){}
}