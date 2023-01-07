import axios from 'axios'

export const getPackagesOverview = async() => {
    try {
        const url = process.env.REACT_APP_API_ENDPOINT + "/packages/overview"
        const result = await axios.get(url) 
        console.log(result)

        return result.data
    }
    catch(err) {
        console.log(err)
        throw err
    }

}
export const getPackage = async(id) => {
    try {
        const url = process.env.REACT_APP_API_ENDPOINT + `/packages/${id}`
        const result = await axios.get(url) 
        console.log(result)

        return result.data
    }
    catch(err) {
        console.log(err)
        throw err
    }

}

export const postPckageVersionHistory = async(name) => {
    try {

        const url = process.env.REACT_APP_API_ENDPOINT + `/packages/versionHistory`
        const result = await axios.post(url, {
            name: name
        }) 
        console.log(result)

        return result.data
    }
    catch(err) {
        console.log(err)
        throw err
    }

}