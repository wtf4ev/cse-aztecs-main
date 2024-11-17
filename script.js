// Fetch memories from the server and display them
async function loadMemories() {
    const response = await fetch('http://localhost:3000/memories');
    const memories = await response.json();
    
    const memoriesContainer = document.getElementById('memories');
    memoriesContainer.innerHTML = '';
    
    memories.forEach(memory => {
        const memoryDiv = document.createElement('div');
        memoryDiv.classList.add('memory');
        memoryDiv.innerHTML = `<strong>${memory.username}</strong>: ${memory.memory}`;
        memoriesContainer.appendChild(memoryDiv);
    });
}

// Post a new memory to the server
document.getElementById('memoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const memory = document.getElementById('memory').value;
    
    const response = await fetch('http://localhost:3000/memories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, memory })
    });

    const newMemory = await response.json();
    loadMemories();  // Refresh the memory list
});

// Initial load of memories
loadMemories();
