// $(function(){

// 	$(window).on('load', function(){
//         $('.preloader').delay(500).fadeOut('slow', function(){
//         	$(this).attr('style', 'display: none !important');
//         });
//     });


// 	$(window).scroll(function(){
// 		if ($(this).scrollTop() > 300) {
// 			$('.scrollToTop').fadeIn();
// 		} else {
// 			$('.scrollToTop').fadeOut();
// 		}
// 	});

// 	$('.scrollToTop').click(function(){
// 		$('html, body').animate({scrollTop : 0},800);
// 		return false;
// 	});

// });
//authorize


//const changePageContent = () => {
	//const  login = document.querySelectorAll('.user-logo')
// 	const user = currentUser() || {}

// 	if (!user.login) {
// 		userInfo.classList.remove('show')
// 		content.forEach(el => {
// 			el.classList.remove('show')
// 			if (el.classList.contains('content__auth')) el.classList.add('show')
// 		})
// 		return
// 	}
// 	login.textContent = user.login
// 	userInfo.classList.add('show')

// 	switch(user.role) {
// 		case 'admin': 
// 			content.forEach(el => {
// 				el.classList.remove('show')
// 				if (el.classList.contains('content__admin')) el.classList.add('show')
// 			})
// 			break
// 		case 'client': 
// 			content.forEach(el => {
// 				el.classList.remove('show')
// 				if (el.classList.contains('content__client')) el.classList.add('show')
// 			})
// 			break
// 	}
// }
// changePageContent()