const { admin } = JSON.parse(localStorage.getItem('currentUser'))
      const table = document.querySelector('.table');
      if(admin){
        table.style.display = 'block';
      }else{
        table.style.display = 'none'
      }