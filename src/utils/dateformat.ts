const dateFormats = {
    dateBr: (): string => {
        let date: Date = new Date();
        let dateFormat: string =  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

        return dateFormat;
    },
    dateUs: (): string => {
        let date: Date = new Date();
        let dateFormat: string =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        return dateFormat;
    }
};

export default dateFormats;