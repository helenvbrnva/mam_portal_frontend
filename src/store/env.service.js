import axios from "axios";

class EnvService {
    getAllCity(){
        return axios
            .get('/env/city')
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getCityById(id){
        return axios
            .get(`/env/city/one/${id}`)
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                return e
            })
    }
    addCity(city){
        return axios
            .post("/env/city", city)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateCity(idCity, city){
        return axios
            .put(`/env/city/${idCity}`, city)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getAllTypeArticle(){
        return axios
            .get('/env/type_article')
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getTypeArticleById(id){
        return axios
            .get(`/env/type_article/one/${id}`)
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                return e
            })
    }
    addTypeArticle(typeArticle){
        return axios
            .post("/env/type_article", typeArticle)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateTypeArticle(idTypeArticle, typeArticle){
        return axios
            .put(`/env/type_article/${idTypeArticle}`, typeArticle)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getAllTag(){
        return axios
            .get('/env/tag')
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getTagById(id){
        return axios
            .get(`/env/tag/one/${id}`)
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                return e
            })
    }
    addTag(tag){
        return axios
            .post("/env/tag", tag)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateTag(idTag, tag){
        return axios
            .put(`/env/tag/${idTag}`, tag)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    searchTags(search, count=5){
        return axios
            .get('/env/tag/search', {
                params: {
                    search_field: search,
                    count: count
                }
            })
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new EnvService();