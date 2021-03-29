import axios from 'axios';
import Utils from './utils';
 

export const client = class client {

    constructor() {

    }

    /**
     * Searches character
     * @param {search}data data for searching
     */
    searchCharacter = async ({name, starts_with, tags, nameSort, height, weight, bust, hip, waist, blood_type, husbando, page}: search) => {
        let headers =  await Utils.getHeaders('https://mywaifulist.moe/browse')
        let body = {
                name: name || '',
                starts_with: starts_with || '',
                tags: tags || [],
                nameSort: nameSort || 'ASC',
                height: height || '',
                weight: weight || '',
                bust: bust || '',
                hip: hip || '',
                waist: waist || '',
                blood_type: blood_type || '',
                husbando: husbando || false
            }
        return axios.post(`https://mywaifulist.moe/api/waifu/advancedsearch?page=${page || 0}`, body, {
            headers: headers
        })
    }

    /**
     * Gets the info of the given character id
     * @param {number}id the Id of the chacracter
     */
    getCharacter = async (id: number): Promise<WaifuResponse> => {
        return (await Utils.fetch(`https://mywaifulist.moe/api/waifu/${id}`, Utils.baseHeaders)).data       
    }

    getAiringAnimes = () => {
        return Utils.fetch('https://mywaifulist.moe/api/season/current', Utils.baseHeaders);
    }
}

export interface WaifuResponse {
    id: string,
    slug?: string,
    name?: string,
    original_name?: string,
    romaji_name?: string,
    display_picture?: string,
    description?: string,
    weight?: string | number,
    height?: string | number,
    bust?: string | number,
    hip?: string |number,
    waist?: string | number,
    blood_type?: string,
    origin?: string,
    age?: number,
    birthday_month?: string,
    birthday_day?: number,
    birthday_year?: string | number,
    likes?: number,
    trash?: number,
    popularity_rank?: number,
    like_rank?: number,
    trash_rank?: number,
    husbando?: false,
    nsfw?: false,
    creator?: creator,
    tags?: string[],
    url?: string,
    appearances?: series[],
    series?: series
}

export interface series       {
    name: string,
    original_name?: string,
    romaji_name?: string,
    description?: string,
    slug?: string,
    airing_start?: string,
    airing_end?: string,
    episode_count?: string,
    release?: string,
    display_picture?: string,
    studio?: string
}


export interface creator {
    id: number 
    name: string
}

export interface search {
    name?: string
    starts_with?: string
    tags?: string[],
    nameSort?: string[]
    height?: number
    weight?: number
    bust?: string
    hip?: string
    waist?: string
    blood_type?: string
    husbando?: boolean
    page?: number
}

