document.addEventListener('DOMContentLoaded', function() {
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
});
