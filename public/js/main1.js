const buttonAuth = document.querySelector(".button-auth");
      const modalAuth = document.querySelector(".modal-auth");
      const closeAuth = document.querySelector(".close-auth");
      const buttonOut = document.querySelector(".button-out");
			const inputs = document.querySelector(".navbar-nav");
      const inputsAdmin = document.querySelector(".admin-user");
      const inputsClient = document.querySelector(".client-user");
      const logAuto = document.querySelector('.button-login');
      const login = document.querySelector('#login');
      const password = document.querySelector('#password');
      const client = document.querySelector('.client-call');
      const table = document.querySelector('.table');
      const authForm = document.querySelector('#logInForm')
      const proverka = function(){
        if(localStorage.getItem('currentUser') === null){
          localStorage.setItem('currentUser', JSON.stringify('{}'));
          authorized()
        } else{
          authorized()
          
        }
      }
      const authorized = function() {
        
        const { admin = 'none'} = JSON.parse(localStorage.getItem('currentUser') || {})
        if (admin === 'none') {
	
          buttonOut.style.display = 'none';
          buttonAuth.style.display = 'block'
          inputs.classList.add('hide');

          client.style.display = 'none';
          return
        }
        console.log(admin)
        if (!admin) {
        // modalAuth.classList.toggle('is-open');
          inputs.classList.add('hide');
          console.log('Авторизован');
          buttonAuth.style.display = 'none';
          client.style.display ='block';
          
          buttonOut.style.display = 'block';
          // buttonOut.addEventListener('click', notAuthorized);
        }
        else{
           // modalAuth.classList.toggle('is-open');
          inputs.classList.remove('hide');
          console.log('Авторизован');
          client.style.display = 'none';
          buttonAuth.style.display = 'none';
          buttonOut.style.display = 'block';
          // buttonOut.addEventListener('click', notAuthorized);
          
        }
    
		
  }
  proverka();
 const toogleModalAuth = function() {
        modalAuth.classList.toggle('is-open');
   };
  
    buttonAuth.addEventListener('click', toogleModalAuth);
    closeAuth.addEventListener('click', toogleModalAuth)
    buttonOut.addEventListener('click', () => {
      	localStorage.setItem('currentUser', JSON.stringify('{}'));
      authorized()
    })
      logAuto.addEventListener('click', () => {
        authorized()
        toogleModalAuth()
      });
		
  

  const submitForm = async e => {
	e.preventDefault()

	const body = {} 
	e.target.querySelectorAll('input').forEach(input => {
		const name = input.getAttribute('name')
		if (!name) return
		body[name] = input.value
	})
	// let response = {}
	// if (e.target.dataset.form === 'auth') {
	// 	response = await api.user.auth(body)
	// }
	// if (e.target.dataset.form === 'regis') {
	// 	response = await api.user.regis(body)
	// }
      
      const response = await fetch("api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .catch(err => console.warn(err))
      
      console.log(response)

      if (response.error) {
        return alert(response.status)
      }
	e.target.querySelectorAll('input').forEach(input => input.type !== 'submit' ? input.value = '' : null)
	localStorage.setItem('currentUser', JSON.stringify(response))
  authorized()
}
  authForm.addEventListener('submit', submitForm)
