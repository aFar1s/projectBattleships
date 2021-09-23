
//! this should be working but is not right now. figure out why

const emptyCell = document.querySelectorAll(".emptyCell");
  
  function changeColorOnClick() {
    this.style.backgroundColor = "red";
  }

  document.querySelectorAll(".emptyCell").addEventListener("click", changeColorOnClick);
