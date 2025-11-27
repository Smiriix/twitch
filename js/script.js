document.addEventListener("DOMContentLoaded", () => {
    let currentUrl = new URL(location.href),
        queryString = currentUrl.searchParams.get("q") ? currentUrl.searchParams.get("q") : "";
    observFun = (e) => {
        e.forEach(item => {
            if (item.isIntersecting) {
                item.target.classList.add("show");
            } else {
                item.target.classList.remove("show");
            }
        });
    }
    const itemObserv = new IntersectionObserver(observFun);
    document.querySelector(".gameList__search input").value = `${queryString}`;
    fetch("games.json")
        .then(result => result.json())
        .then(data => {
            listItems = document.querySelector(".gameList__wrapper");
            data.filter(k => k.name.toLocaleLowerCase().search(queryString.toLocaleLowerCase()) > -1).forEach(item => {
                let itemCard = document.createElement("div");
                itemCard.className = 'gameList__item';
                itemCard.innerHTML = `
<img src="${item.thumb ? './thumbs/' + item.thumb : './assets/placeholder.jpg'}" width="200" height="300" alt="${item.name}">
<div class="gameList__item_data">
    <p>${item.name}</p>
    <span>Оценка: <b>${item.rate}</b></span>
    <a href="${item.link}">Смотреть</a>
</div>`;
                listItems.appendChild(itemCard);
                itemObserv.observe(itemCard);
            });
        });
});