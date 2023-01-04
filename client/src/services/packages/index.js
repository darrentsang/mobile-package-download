import axios from 'axios'

const overviewURL = process.env.REACT_APP_API_ENDPOINT + "/packages/overview"

export const getPackagesOverview = async() => {
    try {
        const result = await axios.get(overviewURL) 
        console.log(result)

        return result
    }
    catch(err) {
        console.log(err)
        throw err
    }

}