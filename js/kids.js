document.addEventListener("DOMContentLoaded", function () {
    fetch('data/kids.json')
        .then(response => response.json())
        .then(data => {
            const kidsContainer = document.getElementById('kidsContainer');
            data.forEach(kid => {
                const kidCard = createKidCard(kid);
                kidsContainer.appendChild(kidCard);
            });
            createAddKidButton();
            AddKid();
            DeleteKid();
        })
        .catch(error => console.error('Error fetching the kids data:', error));
});

function createKidCard(kid) {
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
                    <button class="btn btn-danger btn-sm delete-kid">Delete</button>
                </div>
            </div>
        </div>
    `;
    return kidCard;
}

function createAddKidButton() {
    const addButton = document.createElement('button');
    addButton.classList.add('btn', 'btn-success', 'mt-4', 'Addkid');
    addButton.textContent = 'Add Kid';
    addButton.addEventListener('click', function () {
        console.log('Add Kid button clicked');
    });

    const container = document.querySelector('.container');
    container.appendChild(addButton);
}

function AddKid() {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'addKidModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'addKidModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addKidModalLabel">Add Kid</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addKidForm">
                        <div class="mb-3">
                            <label for="kidName" class="form-label">Kid's Name</label>
                            <input type="text" class="form-control" id="kidName" required>
                        </div>
                        <div class="mb-3">
                            <label for="kidPhoto" class="form-label">Kid's Photo</label>
                            <input type="file" class="form-control" id="kidPhoto">
                        </div>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const addKidModal = new bootstrap.Modal(document.getElementById('addKidModal'));

    document.querySelector('.Addkid').addEventListener('click', function () {
        addKidModal.show();
    });

    const addKidForm = document.getElementById('addKidForm');
    addKidForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const kidName = document.getElementById('kidName').value;
        const kidPhoto = document.getElementById('kidPhoto').files[0];

        console.log("Adding kid:", kidName, kidPhoto);

        addKidModal.hide();
        addKidForm.reset();

        const newKid = {
            name: kidName,
            image: '',
            tasksDone: 0,
            coins: 0
        };
        console.log(`POST https://taskids/api/kids/`);
        console.log("Request body:", {
            newKid: newKid
        });
    });
}

function DeleteKid() {
    const kidsContainer = document.getElementById('kidsContainer');

    const modalHtml = `
        <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmDeleteModalLabel">Confirm Deletion</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this kid?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" id="confirmDelete">Yes</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));

    let cardToDelete = null;

    kidsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-kid')) {
            cardToDelete = event.target.closest('.card');
            if (cardToDelete) {
                confirmDeleteModal.show();
            }
        }
    });

    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (cardToDelete) {
            console.log(`POST https://taskids/api/kids/`);
            console.log("Request body:",{
                cardToDelete: cardToDelete
            });
            confirmDeleteModal.hide();
        }
    });

    document.querySelector('.btn-secondary').addEventListener('click', function () {
        confirmDeleteModal.hide();
    });
}
