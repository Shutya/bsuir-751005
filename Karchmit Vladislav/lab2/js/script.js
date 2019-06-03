window.onload = function() {
  
   el = document.getElementById('menu-toggle');
   el.onclick = function() {
      menu = document.getElementById('main-menu');
      if(menu.style.display == "none") {
         menu.style.display = "table";
      } else {
         menu.style.display = "none";
      }
   }
}
