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

interface GetDentist{
    success:boolean,
    data:{
        id:string,
        name:string,
        image:string,
        yearsOfExperience:number,
        areaOfExpertise:string,
        bookingPerDay:number,
        bookings:Booking[]
    }

}

interface Booking{
    _id:string,
    user:string,
    dentist:string,
    bookingDate:string,
    createdAt:string
}

interface CheckBooking{
    success:boolean,
    currentBooking:number,
    maxBooking:number
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