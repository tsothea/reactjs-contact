export default function getLocalData() {
    let data = localStorage.getItem('data');
    if (data == null || data == '') {
        data = [];
    } else {
        data = JSON.parse(data);
    }

    return data;
}