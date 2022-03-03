const Api = 'https://apiwa.pdtcomunicaciones.com:4050/api'

const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}

export  {
    base_url,
    Api
}