import axios from "axios";

class ArticleService {
    addArticle(article) {
        return axios
            .post("/article", article)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getPageArticle(page, tags, topic){
        const param = {
            page: page
        }
        console.log(tags, topic)
        if (tags && tags.length > 0) {
            param.tags = tags.join(',')
        }
        if(topic !== null) {
            param.topic = topic
        }
        return axios
            .get('/article/page', {params: param})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    searchArticle(search, count=5){
        return axios
            .get('/article/search', {
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
    getArticleByUuid(uuid){
        return axios
            .get(`/article/get_one/${uuid}`)
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                return e
            })
    }
    updateArticle(uuid, target){
        return axios
            .put(`/article/${uuid}`, target)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    deleteArticle(uuid){
        return axios
            .delete(`/article/${uuid}`)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    getCommentary(uuid){
        return axios
            .get(`/article/commentary/${uuid}`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    getLikeInfo(uuid_article, uuid_user){
        return axios
            .get(`/article/like/${uuid_article}`, {params: {uuid_user: uuid_user}})
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    addLike(uuidArticle){
        return axios
            .post(`/article/like/${uuidArticle}`)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    deleteLike(uuidArticle){
        return axios
            .delete(`/article/like/${uuidArticle}`)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    addComment(uuidArticle, comment){
        return axios
            .post(`/article/commentary/${uuidArticle}`, comment)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    deleteComment(uuidComment){
        return axios
            .delete(`/article/commentary/${uuidComment}`)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    getPageArticleByUser(page){
        return axios
            .get('/article/page/by_user', {params: {page: page}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new ArticleService();