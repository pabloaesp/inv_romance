export class User {
    constructor(
        public name: string,
        public surname: string,
        public nick: string,
        public dni: string, 
        public telephone: string,
        public password: string,
        public role: string,
        public image: string,
        public status: string
    ){}
}