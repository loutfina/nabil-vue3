export const config = {
    "apiUrl" : "http://localhost:8080",
    "endpoints": {
        "search-rca": {
            "path": "rca-mock.json",
            "isCached": false
        },
        "search-item2": {
            "path": "item2-mock.json",
            "isCached": false
        },
        "print-pdf": {
            "path": "v1/print/pdf",
            "isCached": false
        },
        "print-pdf-signed": {
            "path": "v1/print/pdf-signed",
            "isCached": false
        }          

    }
}