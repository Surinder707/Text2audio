let audioElement = null;
let audioBlob = null;

async function generateAudio() {
    try {
        disableButtons(true);
        
        const response = await fetch('YOUR_NETLIFY_FUNCTION_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: document.getElementById('input').value,
                voice: document.getElementById('voice').value,
                instructions: document.getElementById('instructions').value
            })
        });

        if (!response.ok) throw new Error('API request failed');
        
        audioBlob = await response.blob();
        audioElement = new Audio(URL.createObjectURL(audioBlob));
        audioElement.play();
        
        document.getElementById('downloadBtn').disabled = false;
        document.getElementById('stopBtn').disabled = false;

        audioElement.addEventListener('ended', () => disableButtons(false));

    } catch (error) {
        console.error('Error:', error);
        disableButtons(false);
    }
}

// Keep stopAudio(), downloadAudio(), disableButtons() functions same as before
