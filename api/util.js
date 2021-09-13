const url = {
    login: 'https://ajax.test-danit.com/api/v2/cards/login',
    cards: 'https://ajax.test-danit.com/api/v2/cards',
};
const token = "token";

export const makeRequest = (url, method = "GET", config, errorMessage = "Error") => {
    return fetch(url, {method, ...config})
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(errorMessage);
            }
        });
};

export const postData = (url, requestBody, errorMessage) =>
    makeRequest(
        url,
        "POST",
        {
            body: requestBody,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(token)}`,
            },
        },
        errorMessage
    );

export const getCard = (url) =>
    makeRequest(url, "GET", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(token)}`,
        },
    });

export const updateCard = (url, requestBody) =>
    makeRequest(url, "PUT", {
        body: requestBody,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(token)}`,
        },
    });

export const deleteCard = (url) =>
    makeRequest(url, "DELETE", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(token)}`,
        },
    });