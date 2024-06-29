window.onload = function() {
    const taskData = JSON.parse(localStorage.getItem('taskData'));
    if (!taskData) {
        window.location.href = 'index.html'; // Redirect if no task data is found
    }

    document.getElementById('task-title').innerText = taskData.name;
    document.getElementById('task-assigned-to').innerText = taskData.assignedTo;
    document.getElementById('task-deadline').innerText = taskData.deadline;
    document.getElementById('task-status').innerText = taskData.status;
    document.getElementById('task-coins').innerText = taskData.coins;

    // Fetch and display history
    fetch('data/taskHistory.json')
        .then(response => response.json())
        .then(historyData => {
            const historyList = document.getElementById('task-history');
            const taskHistory = historyData[taskData.id];
            if (taskHistory) {
                taskHistory.forEach(history => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');

                    // Determine the class for action based on its value
                    const actionClass = history.action.toLowerCase() === 'approved' ? 'text-success' : 'text-danger';

                    listItem.innerHTML = `<strong>${history.date}</strong> ${history.kid} - <span class="${actionClass}">${history.action}</span>`;
                    historyList.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `No history available for this task.`;
                historyList.appendChild(listItem);
            }
        })
        .catch(error => console.error('Error fetching history:', error));

    const modalHtml = `
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this task?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" id="confirmDelete">Yes</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    // Handle task deletion
    document.querySelector('.fa-trash').addEventListener('click', function() {
        deleteModal.show();
    });

    document.getElementById('confirmDelete').addEventListener('click', function() {
        console.log(`DELETE https://taskids/api/kids/${id}`);
        deleteModal.hide();
        window.location.href = 'index.html'; // Redirect to the main page
    });
};
