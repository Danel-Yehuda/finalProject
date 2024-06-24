document.addEventListener("DOMContentLoaded", function() {
    fetch('data/kids.json')
        .then(response => response.json())
        .then(data => {
            const kidsContainer = document.getElementById('kidsContainer');
            data.forEach(kid => {
                const kidCard = document.createElement('div');
                kidCard.classList.add('col-md-4');
                kidCard.innerHTML = `
                    <div class="card mb-4 shadow-sm">
                        <img src="${kid.image}" class="card-img-top" alt="${kid.name}">
                        <div class="card-body">
                            <h5 class="card-title">${kid.name}</h5>
                            <p class="card-text">Tasks Done: ${kid.tasksDone}</p>
                            <p class="card-text">Coins: ${kid.coins}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button class="btn btn-primary btn-sm">Edit</button>
                                <button class="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                kidsContainer.appendChild(kidCard);
            });
        })
        .catch(error => console.error('Error fetching the kids data:', error));
});
