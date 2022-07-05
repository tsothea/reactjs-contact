import getLocalData from "./getLocalData";

export default function deleteLocalData(id) {
    let data = getLocalData();
    let index = data.map(function(item) {
        return item.id
    }).indexOf(id);
    data.splice(index, 1);

    localStorage.setItem('data', JSON.stringify(data));
}