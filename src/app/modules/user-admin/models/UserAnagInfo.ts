interface Uset {
    id: string;
    username: string;
    password: string;
    email: string;
    token?: any;
    tokencreationdate?: any;
    userscreationdate: string;
    role: string;
    regNumInps: string;
    regNumSps: string;
    anagraphicid: string;
}

interface Anag {
    id: string;
    address: string;
    regnuminps?: any;
    birthdate: Date;
    birthplace?: any;
    name: string;
    surname: string;
    contracttype?: any;
    distaccatoda?: any;
    distaccatoa?: any;
    sededilavoro?: any;
    valorerimborsistimato?: any;
    buonipastobool: string;
    sex?: any;
    contractid?: any;
}

interface Data {
    uset: Uset;
    anag: Anag;
}

export interface UserAnagInfo {
    status: string;
    data: Data[];
}