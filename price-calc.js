const prices = {
    small: { nails: 10, shampoo: 15, bath: 20, cut: 25 },
    medium: { nails: 15, shampoo: 20, bath: 25, cut: 30 },
    large: { nails: 20, shampoo: 25, bath: 30, cut: 35 }
};

let selectedSize = '';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', function() {
        document.getElementById('startButton').classList.add('hidden');
        document.getElementById('selectionScreen').classList.remove('hidden');
    });

    document.querySelectorAll('.sizeButton').forEach(button => {
        button.addEventListener('click', function() {
            selectedSize = this.getAttribute('data-size');
            document.getElementById('selectionScreen').classList.add('hidden');
            document.getElementById('optionsScreen').classList.remove('hidden');
            const dogImage = document.getElementById('dogImage');
            dogImage.style.backgroundImage = `url(images/${selectedSize}.png)`;
            scaleDogImage(selectedSize);
        });
    });

    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('optionsScreen').classList.add('hidden');
        document.getElementById('selectionScreen').classList.remove('hidden');
        resetSelections();
    });

    document.querySelectorAll('.optionButton').forEach(button => {
        button.addEventListener('click', function() {
            const option = this.getAttribute('data-option');
            
            if (option === 'all') {
                const isSelected = this.classList.contains('selected');
                toggleAllOptions(!isSelected);
            } else {
                this.classList.toggle('selected');
                const iconElement = document.getElementById(`${option}Icon`);
                if (iconElement) {
                    iconElement.remove();
                } else {
                    const icon = document.createElement('div');
                    icon.id = `${option}Icon`;
                    icon.classList.add('icon');
                    icon.style.backgroundImage = `url(images/${option}.png)`;
                    positionIcon(option, icon);
                    //Removed as icons not added
                    //document.getElementById('iconsContainer').appendChild(icon);
                }
                updatePrice();
                updateAllButtonState();
            }
        });
    });
});

function updatePrice() {
    let totalPrice = 0;
    document.querySelectorAll('.optionButton.selected').forEach(button => {
        const option = button.getAttribute('data-option');
        if (option !== 'all') {
            totalPrice += prices[selectedSize][option];
        }
    });
    document.getElementById('price').textContent = `Total Price: £${totalPrice}`;
}

function positionIcon(option, icon) {
    switch (option) {
        case 'nails':
            icon.style.top = '10%';
            icon.style.left = '10%';
            break;
        case 'shampoo':
            icon.style.top = '10%';
            icon.style.right = '10%';
            break;
        case 'bath':
            icon.style.bottom = '30%';
            icon.style.left = '30%';
            break;
        case 'cut':
            icon.style.bottom = '10%';
            icon.style.right = '10%';
            break;
    }
}

function resetSelections() {
    document.querySelectorAll('.optionButton').forEach(button => {
        button.classList.remove('selected');
    });
    document.getElementById('iconsContainer').innerHTML = '';
    updatePrice();
}

function scaleDogImage(size) {
    const dogImage = document.getElementById('dogImage');
    let scale = 1;
    
    switch (size) {
        case 'small':
            scale = 0.5;
            break;
        case 'medium':
            scale = 0.75;
            break;
        case 'large':
            scale = 1;
            break;
        default:
            scale = 1;
            break;
    }
    
    dogImage.style.transform = `scale(${scale})`;
}

function toggleAllOptions(select) {
    const allButton = document.querySelector('.optionButton[data-option="all"]');
    allButton.classList.toggle('selected', select);

    document.querySelectorAll('.optionButton').forEach(button => {
        const option = button.getAttribute('data-option');
        if (option !== 'all') {
            if (select) {
                button.classList.add('selected');
                if (!document.getElementById(`${option}Icon`)) {
                    const icon = document.createElement('div');
                    icon.id = `${option}Icon`;
                    icon.classList.add('icon');
                    icon.style.backgroundImage = `url(images/${option}.png)`;
                    positionIcon(option, icon);
                    //Removed as icons not added
                    //document.getElementById('iconsContainer').appendChild(icon);
                }
            } else {
                button.classList.remove('selected');
                const iconElement = document.getElementById(`${option}Icon`);
                if (iconElement) {
                    iconElement.remove();
                }
            }
        }
    });
    updatePrice();
}

function updateAllButtonState() {
    const allButton = document.querySelector('.optionButton[data-option="all"]');
    const totalOptions = document.querySelectorAll('.optionButton').length - 1;
    const selectedOptions = document.querySelectorAll('.optionButton.selected').length - (allButton.classList.contains('selected') ? 1 : 0);

    if (selectedOptions === totalOptions) {
        allButton.classList.add('selected');
    } else {
        allButton.classList.remove('selected');
    }
}
