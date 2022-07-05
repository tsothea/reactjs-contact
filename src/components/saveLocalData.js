import getLocalData from "./getLocalData";

export default function saveLocalData(newContact) {
    let data = getLocalData();
    data.push(newContact);

    localStorage.setItem('data', JSON.stringify(data));
}