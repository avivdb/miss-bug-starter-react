
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'

_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
}


function query(filterBy = {}) {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                bugs = bugs.filter(bug => regExp.test(bug.title))
            }
            return bugs
        })
}
function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data[0])
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove')
}

function save(bug) {
    const url = BASE_URL + 'save'
    var queryParams = `?title=${bug.title}&severity=${bug.severity}&description=${bug.description}`
    if (bug._id) queryParams += `&_id=${bug._id}`
    return axios.get(url + queryParams).then(res => res.data)
}

function _setNextPrevBugId(bug) {
    return query().then((bugs) => {
        const carIdx = bugs.findIndex((currBug) => currBug._id === bug._id)
        const nextBug = bugs[carIdx + 1] ? bugs[carIdx + 1] : bugs[0]
        const prevBug = bugs[carIdx - 1] ? bugs[carIdx - 1] : bugs[bugs.length - 1]
        bug.nextBugId = nextBug._id
        bug.prevBugId = prevBug._id
        return bug
    })
}

function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (!bugs || !bugs.length) {
        bugs = [
            {
                title: "Infinite Loop Detected",
                severity: 4,
                _id: "1NF1N1T3"
            },
            {
                title: "Keyboard Not Found",
                severity: 3,
                _id: "K3YB0RD"
            },
            {
                title: "404 Coffee Not Found",
                severity: 2,
                _id: "C0FF33"
            },
            {
                title: "Unexpected Response",
                severity: 1,
                _id: "G0053"
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, bugs)
    }



}
