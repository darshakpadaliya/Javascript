document.addEventListener("DOMContentLoaded", function () {
    const draggables = document.querySelectorAll(".draggable");
    const boxes = document.querySelectorAll(".box");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
        draggable.addEventListener("dragend", dragEnd);
    });

    boxes.forEach(box => {
        box.addEventListener("dragover", dragOver);
        box.addEventListener("dragenter", dragEnter);
        box.addEventListener("dragleave", dragLeave);
        box.addEventListener("drop", dragDrop);
    });

    let draggedItem = null;

    function dragStart(e) {
        draggedItem = this;
        setTimeout(() => this.classList.add("dragging"), 0);
    }

    function dragEnd() {
        this.classList.remove("dragging");
        draggedItem = null;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add("over");
    }

    function dragLeave() {
        this.classList.remove("over");
    }

    function dragDrop() {
        this.classList.remove("over");
        if (draggedItem) {
            this.append(draggedItem);
        }
    }
});
