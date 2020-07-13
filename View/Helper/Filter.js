
const helpers = {

    SORT_BY_NAME: function(data){
        return data.sort(function(a,b){
            return a.beneficiary_name.localeCompare(b.beneficiary_name);
        })
    },
    
    SORT_BY_DATE: function(data){
        return data.sort(function(a,b){
            let date_a = a.created_at.split(' ').join().split('-').join().split(':').join();
            let date_b = b.created_at.split(' ').join().split('-').join().split(':').join();
            return date_a.localeCompare(date_b);
        });
    }
}

export default helpers;