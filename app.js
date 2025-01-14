const king = document.querySelector(".king");
const squares = document.querySelectorAll(".square");
const infoDisplay = document.querySelector("#info");

let beingDragged;
let currentRow = 2; // Initial position row
let currentCol = 2; // Initial position column

king.addEventListener("drag", dragging);
king.addEventListener("dragstart", dragStart);

squares.forEach(square => {
    square.addEventListener("dragover", dragOver);
    square.addEventListener("dragenter", dragEnter);
    square.addEventListener("dragleave", dragLeave);
    square.addEventListener("drop", dragDrop);
    square.addEventListener("dragend", dragEnd);
});

function dragging(e) {
    beingDragged = e.target;
}

function dragStart() {
    infoDisplay.textContent = "You are dragging the " + beingDragged.id;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    const targetRow = parseInt(e.target.dataset.row);
    const targetCol = parseInt(e.target.dataset.col);

    // Check if the move is valid
    if (isLegalMove(targetRow, targetCol)) {
        e.target.classList.add("highlight");
    }
}

function dragLeave(e) {
    e.target.classList.remove("highlight");
}

function dragDrop(e) {
    const targetRow = parseInt(e.target.dataset.row);
    const targetCol = parseInt(e.target.dataset.col);

    // Validate move before dropping
    if (isLegalMove(targetRow, targetCol)) {
        e.target.append(beingDragged);
        currentRow = targetRow; // Update the king's position
        currentCol = targetCol;
        infoDisplay.textContent ="The " + beingDragged.id + " has been moved successfully!";
    } else {
        infoDisplay.textContent = "Illegal move for " + "the " + beingDragged.id + "!";
    }
    e.target.classList.remove("highlight");
}

function dragEnd(e) {
    e.target.classList.remove("highlight");
    //infoDisplay.textContent = "";
}

// Function to check if the move is legal
function isLegalMove(targetRow, targetCol) {
    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);
    return (rowDiff <= 1 && colDiff <= 1); // King can move 1 square in any direction
}
