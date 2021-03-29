import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import cheerioModule from 'cheerio'
import { existsSync, readFileSync } from 'fs'

export default class Utils {

    /**
     * Returns a random number
     * @param {number}min least possible number
     * @param {number}max highest possible number
     * @returns {number}Random number based on the input
     */
    static randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

    /**
     * Fetches the given url
     * @param {string}link url to fetch
     * @param {AxiosRequestConfig}options response options to pass to axios
     */
    static fetch = async (link: string, options: AxiosRequestConfig) => (await axios.get(link, options)).data

    /**
     * Converts file in the given url/filepath to buffer
     * @param {string}path url/filepath to convert to buffer
     * @returns {Promise<Buffer|false>}
     */
    static toBuffer = async (path: string): Promise<Buffer | false> => {
        if (path.startsWith('.')) {
            if (!existsSync(path)) return false
            return readFileSync(path)
        }
        try {
            return Utils.fetch(path, { responseType: 'arraybuffer'})
        } catch(err) {
            return false
        }
    }

    static getHeaders = async (page: string) => {
        let response = await axios.get(page)
        let headers = response.headers
        let xsrf = headers['set-cookie'][1].replace('XSRF-TOKEN=', '').split(";")[0]
        let laravel = headers["set-cookie"][2].replace("laravel_session=", "").split(";")[0]
        let csrf = cheerioModule("meta[name=csrf-token]", response.data)[0].attribs.content
        let cookie = `XSRF-TOKEN=${xsrf}; laravel_session=${laravel};`
        let final = {
            'x-csrf-token': csrf,
            cookie: cookie,
            'x-requested-with': 'XMLHttpRequest',
            'x-xsrf-token': xsrf.replace(/%3D/g, '=')
        }
        console.log(response.headers)
        return final
    }

    static baseHeaders = {
        headers: {
            "x-requested-with": "XMLHttpRequest"
        }
    }
}