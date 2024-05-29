const container = document.querySelector('.countries')
const renderPost = async () => {
    let uri = 'https://restcountries.com/v3.1/all';

    const res = await fetch(uri);
    const posts = await res.json();
   console.log(posts)

    let template = '';

    posts.forEach(post => {
        template +=`
         <div class='card col-sm-12 col-md-3 col-lg-3 border border-0>
         <a href='/details.html?id=${post.id}'>
            <div class="card-img-top container w-100">
              <img src="${post.flags.png}" alt="picture">
            </div>  
            <h2 class="card-title">${post.name.common}</h2>
            <h2 class="card-title">Population: ${post.population}</h2>
            <h2 class="card-title">Region: ${post.region}</h2>
            <h2 class="card-title">Capital: ${post.capital}</h2>
            <a href='/details.html?id=${post.id}'>read more</a>
            </div>
        `
    })

    container.innerHTML = template
} 

window.addEventListener('DOMContentLoaded', () => renderPost());
