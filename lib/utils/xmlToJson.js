import xml2js from 'xml2js'

export default function(xml) {
    let jsonResult
    xml2js.parseString(xml, { normalizeTags: true }, (err, result) => {
        jsonResult = result
    })
    return jsonResult
}