document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const orderSelect = document.getElementById('orderSelect');
    const wpmSlider = document.getElementById('wpmSlider');
    const wpmValue = document.getElementById('wpmValue');
    const fontStyleSelect = document.getElementById('fontStyleSelect'); // New
    const fontSizeSlider = document.getElementById('fontSizeSlider');   // New
    const fontSizeValue = document.getElementById('fontSizeValue');     // New
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const currentWordDisplay = document.getElementById('currentWord');
    const sidebar = document.getElementById('sidebar');
    const hideSidebarButton = document.getElementById('hideSidebar');

    let words = [];
    let currentIndex = 0;
    let intervalId;
    let isRunning = false;

    // Sidebar hide/show functionality
    hideSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        if (sidebar.classList.contains('hidden')) {
            hideSidebarButton.textContent = '>';
            hideSidebarButton.style.right = '0px'; // Position closer when hidden
        } else {
            hideSidebarButton.textContent = '<';
            hideSidebarButton.style.right = '-25px'; // Default position when visible
        }
    });

    // Update WPM display
    wpmSlider.addEventListener('input', () => {
        wpmValue.textContent = wpmSlider.value;
    });

    // Update Font Style
    fontStyleSelect.addEventListener('change', () => {
        currentWordDisplay.style.fontFamily = fontStyleSelect.value;
    });

    // Update Font Size
    fontSizeSlider.addEventListener('input', () => {
        fontSizeValue.textContent = fontSizeSlider.value;
        currentWordDisplay.style.fontSize = `${fontSizeSlider.value}em`;
    });

    startButton.addEventListener('click', () => {
        if (isRunning) return;

        const rawText = wordInput.value.trim();
        if (!rawText) {
            alert("Please enter some words first!");
            return;
        }

        words = rawText.split(/\s+/).filter(word => word.length > 0);

        if (words.length === 0) {
            alert("No words found after splitting the text.");
            return;
        }

        if (orderSelect.value === 'random') {
            // Shuffle words for random order
            for (let i = words.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [words[i], words[j]] = [words[j], words[i]];
            }
        }

        currentIndex = 0;
        isRunning = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        startReading();
    });

    stopButton.addEventListener('click', () => {
        stopReading();
    });

    function startReading() {
        const wpm = parseInt(wpmSlider.value);
        if (wpm === 0) {
            currentWordDisplay.textContent = "Adjust WPM (cannot be 0)";
            stopReading(); // Stop if WPM is 0
            return;
        }
        const msPerWord = (60 / wpm) * 1000;

        // Clear any existing interval
        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(() => {
            if (currentIndex < words.length) {
                currentWordDisplay.textContent = words[currentIndex];
                currentIndex++;
            } else {
                stopReading();
                currentWordDisplay.textContent = "End of text!";
            }
        }, msPerWord);
    }

    function stopReading() {
        clearInterval(intervalId);
        isRunning = false;
        startButton.disabled = false;
        stopButton.disabled = true;
    }

    // Initialize font style and size based on default values
    currentWordDisplay.style.fontFamily = fontStyleSelect.value;
    currentWordDisplay.style.fontSize = `${fontSizeSlider.value}em`;
});