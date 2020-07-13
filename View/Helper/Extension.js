const extension = {

    CURRENCY_FORMAT: function(number){
        return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    
    DATE_FORMAT: function(date){
        const monthNames = [
            "Januari", 
            "Februari", 
            "Maret", 
            "April", 
            "Mei", 
            "Juni",
            "Juli", 
            "Agustus", 
            "September", 
            "Oktober", 
            "November", 
            "Desember"
        ];
        var strSplitDate = String(date).split(' ');
        var date = new Date(strSplitDate[0]);
        // alert(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        date =  dd + " " + monthNames[mm] + " " + yyyy;
        return date.toString();
    }
}

export default extension;