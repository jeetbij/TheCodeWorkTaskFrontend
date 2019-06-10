import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api/';


export async function getAllToDos() {
    return axios.get('todo')
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    });
}

export async function addToDo(title, content) {
    return axios.post('todo/', {
        "title": title,
        "text": content
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    });
}

export async function editToDo(id, title, content) {
    return axios.put('todo/?id='+id, {
        "title": title,
        "text": content
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    });
}

export async function deleteToDo(id) {
    return axios.delete('todo/?id='+id)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    });
}

export async function markAsCompleted(id) {
    return axios.post('todo_complete/?id='+id)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    });
}