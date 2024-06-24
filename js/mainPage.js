document.addEventListener('DOMContentLoaded', function() {
    fetch('data/publishTasks.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('#task-cards .row');

            data.forEach((task, index) => {
                const card = document.createElement('div');
                card.classList.add('card', 'col-md-3');

                card.classList.add(task.status == '3' ? 'green' : task.status == '2' ? 'yellow' : 'red');
                card.setAttribute('data-index', index);

                card.innerHTML = `
                    <i class="icon fas fa-lightbulb"></i>
                    <div class="title">${task.name}</div>
                    <div class="details">
                        <div class="coins"><span>${task.coins}</span> <i id="coinIcon" class="fas fa-coins"></i></div>
                        <div class="subDetails">
                            <div class="assigned-to">Assigned to: ${task.assignedTo}</div>
                            <div class="deadline">Deadline: ${task.deadline}</div>
                        </div>
                    </div>
                `;

                card.addEventListener('click', function() {
                    localStorage.setItem('taskData', JSON.stringify(task));
                    window.location.href = 'taskPage.html';
                });

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
