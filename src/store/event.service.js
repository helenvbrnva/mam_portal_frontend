import axios from "axios";

class EventService {
    getAllStateEvent(){
        return axios
            .get('/event/state_event')
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    addEvent(event) {
        return axios
            .post("/event", event)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getPageEvent(page, tags, city){
        const param = {
            page: page
        }
        console.log(tags, city)
        if (tags && tags.length > 0) {
            param.tags = tags.join(',')
        }
        if(city !== null) {
            param.city = city
        }
        return axios
            .get('/event/page', {params: param})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    searchEvent(search, count=5){
        return axios
            .get('/event/search', {
                params: {
                    search_field: search,
                    count: count
                }
            })
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getEventByUuid(uuid){
        return axios
            .get(`/event/get_one/${uuid}`)
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                return e
            })
    }
    updateEvent(uuid, target){
        return axios
            .put(`/event/${uuid}`, target)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    deleteEvent(uuid){
        return axios
            .delete(`/event/${uuid}`)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    getUserRegInfo(uuidEvent, uuidUser){
        return axios
            .get(`/event/user_registration/${uuidEvent}`, {params: {uuid_user: uuidUser}})
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    addRegUser(uuidEvent){
        return axios
            .post(`/event/user_registration/${uuidEvent}`)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    deleteRegUser(uuidEvent){
        return axios
            .delete(`/event/user_registration/${uuidEvent}`)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    deleteRegUserByAdmin(uuidUser, uuidEvent){
        return axios
            .delete(`/event/user_registration/bny_user/${uuidEvent}/${uuidUser}`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    getPageEventByUser(page){
        return axios
            .get('/event/page/by_user', {params: {page: page}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new EventService();