import { TOKEN } from "./constans"
import { USER } from "./constans"


export function setToken(data) {
    localStorage.setItem(TOKEN, data);
}


export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function setUserLocally(data) {
    localStorage.setItem(USER, data);
}

export function getUserLocally() {
    return localStorage.getItem(USER);
}

export function deleteLocal() {
    return (
        localStorage.removeItem(TOKEN),
        localStorage.removeItem(USER)

    )

}

