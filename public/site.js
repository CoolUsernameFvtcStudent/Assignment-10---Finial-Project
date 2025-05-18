async function loadMenuItem(id) {
    try {
        //const res = await fetch(`/menuItems/${id}`);
        const item = await res.json();
        document.getElementById('menu-name').textContent = item.name;
        document.getElementById('menu-desc').textContent = item.description;
    } catch (err) {
      //  console.error(`Could not load item, ${err}`);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const  menuContainer = document.getElementById('menu')

    try {
        const response = await fetch('/api/v1/menu')
        const data = await response.json()

        data.forEach(item => {
            const div = document.createElement('div')
            div.classList.add('menu-card')
            
            div.innerHTML =
            `
                <img src="img/${item.name}.jpg" alt="${item.name}" width=200px height=200px class="menu-img">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p><strong>$${item.price.toFixed(2)}</strong></p>
            `
            menuContainer.appendChild(div)
        });
    }catch (error){
        //console.error(`Failed To Fetch Menu, ${error}`)
    }
})


window.onload = () => {
    loadMenuItem(1);
};
