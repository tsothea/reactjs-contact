export default function updateLocalData(data) {
    localStorage.setItem('data', JSON.stringify(data));
}