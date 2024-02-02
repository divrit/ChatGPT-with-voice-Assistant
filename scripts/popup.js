function createPopup(content) {
    // Create the popup container
    let popupContainer = document.createElement('div');
    popupContainer.setAttribute('id', 'speech-popup');
    popupContainer.style.position = 'fixed';
    popupContainer.style.bottom = '20px';
    popupContainer.style.right = '20px';
    popupContainer.style.padding = '10px';
    popupContainer.style.backgroundColor = 'white';
    popupContainer.style.border = '1px solid black';
    popupContainer.style.zIndex = '1000';

    // Create the content paragraph
    let popupContent = document.createElement('p');
    popupContent.innerText = content;

    // Add content to the container
    popupContainer.appendChild(popupContent);

    // Append the container to the body
    document.body.appendChild(popupContainer);
}

function removePopup() {
    let existingPopup = document.getElementById('speech-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
}
