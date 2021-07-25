export const setCommonHeaders = ({res, rType}) => {
    switch (rType) {
        case "json":
            res.setHeader("Content-Type", "application/json")
            break
        default:
            res.setHeader("Content-Type", "text/plain")
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
}