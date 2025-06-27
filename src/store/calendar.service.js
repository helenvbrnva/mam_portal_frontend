import axios from "axios";

class CalendarService {
    getCalendarByUuidUser(){
        return axios
            .get(`/calendar/calendar/user`)
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                throw e
            })
    }
    createCalendar(calendar){
        return axios
            .post('/calendar', calendar)
            .then(response => {
                if(response.status === 205)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    addItemCalendar(uuidCalendar, form){
        return axios
            .post(`/calendar/${uuidCalendar}`, form)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateItemCalendar(uuidCalendar, date, form){
        return axios
            .put(`/calendar/${uuidCalendar}/${date}`, form)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteCalendarItem(uuidCalendar, date){
        return axios
            .delete(`/calendar/${uuidCalendar}/${date}`)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new CalendarService();