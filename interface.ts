interface UserProfile{
    success:boolean,
    data:{
        _id:string,
        name:string,
        tel:string,
        email:string,
        role:string,
        createdAt:Date,
        __v:number
    }
}

interface UserSession{
    success:boolean,
    token:string,
    iat:number,
    exp:number
}

interface GetDentists{
    success:boolean,
    count:number,
    pagination:JSON,
    data:{
        id:string,
        name:string,
        image:string,
        yearsOfExperience:number,
        areaOfExpertise:string,
        bookingPerDay:number
    }[]
}