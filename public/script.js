const form = document.getElementById("shortenFrom");
const result = document.getElementsByClassName("result")[0];

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("/shorten", {
        method: "POST",
        body: new URLSearchParams(formData)
    });

    const data = await response.json();

    if (!response.ok) {
        result.textContent = data.error;
        return;
    }

    result.innerHTML = `
        ${data.message}
        <br>
        <a href="${data.url}" target="_blank">${data.url}</a>
    `;
});