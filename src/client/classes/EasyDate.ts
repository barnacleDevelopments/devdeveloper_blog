/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: EasyDate.ts
*/

class EasyDate {
    constructor() {

    }

    getRegDate() {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        const date = new Date();
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const todayDate = `${month} ${day}, ${year}`;
        return todayDate;
    }
}

export default EasyDate;
