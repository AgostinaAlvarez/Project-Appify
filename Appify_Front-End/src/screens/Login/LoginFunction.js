import {jwt} from 'jsonwebtoken';


export function decodeToken (tkn) {
    const tokenDecode = jwt.decode(tkn)
    return tokenDecode
}