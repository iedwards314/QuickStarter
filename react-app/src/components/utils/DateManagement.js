function SetDate(endDate) {

    let DATEDICT = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12',
    }
    let NEWDATE = endDate.slice(5, 17)
    let NDATE = NEWDATE.split(' ')
    let day = NDATE[0]
    let year = NDATE[2]
    let fMonth = NDATE[1]
    let month = DATEDICT[fMonth]
    let theDate = `${year}-${month}-${day}`
    return theDate
}

export default SetDate
