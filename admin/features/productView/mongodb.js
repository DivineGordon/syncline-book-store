import {authHeader} from '../../utilities/auth'
export const saveBookMongo=async({url,body})=>{
const headers = { ...authHeader() }
            const res = await fetch(url, { method: 'post', headers, body})
            const data = await res.json()
            return data
}