(function($) {
	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function(e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	});

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function(e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
			$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		var $this = $(this),
			$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	$(document).ready(function () {
	$('#support-form').on('submit', function (e) {
		e.preventDefault();

		// Mostrar pantalla de carga
		$('#form-response').removeClass('alert-success alert-danger').addClass('alert-info').text('Enviando...').show();

		const name = $('#name').val();
		const email = $('#email').val();
		const message = $('#message').val();

		// Simulación de envío de correo
		setTimeout(() => {
			// Aquí iría la lógica real de envío de correo

			// Simular éxito en el envío
			$('#form-response').removeClass('alert-info').addClass('alert-success').text('¡Mensaje enviado exitosamente!');

			// Ocultar modal después de 2 segundos
			setTimeout(() => {
				$('#contactModal').modal('hide');
				$('#form-response').hide();
				$('#support-form')[0].reset();
			}, 2000);
		}, 2000);
	});

	// Limpiar mensajes al cerrar la ventana modal
	$('#contactModal').on('hidden.bs.modal', function () {
		$('#form-response').hide();
		$('#support-form')[0].reset();
	});
	});

	/////////////////////////////////////////

	// Traducción de la página
	const translations = {
		en: {
			currency: "USD",
			account: "My Account",
			login: "Login",
			register: "Register",
			search: "Search products...",
		},
		es: {
			currency: "USD",
			account: "Mi Cuenta",
			login: "Iniciar Sesión",
			register: "Registrarse",
			search: "Buscar productos...",
		},
		fr: {
			currency: "USD",
			account: "Mon Compte",
			login: "Se connecter",
			register: "S'inscrire",
			search: "Rechercher des produits...",
		}
	};

	const languageSelector = document.getElementById("language-selector");
	const currencyElement = document.querySelector(".fa-dollar").parentNode;
	const accountElement = document.querySelector(".fa-user-o").parentNode;

	function updateLanguage(lang) {
		localStorage.setItem("selectedLanguage", lang);
		currencyElement.innerHTML = `<i class="fa fa-dollar"></i> ${translations[lang].currency}`;
		accountElement.innerHTML = `<i class="fa fa-user-o"></i> ${translations[lang].account}`;
	}

	languageSelector.addEventListener("change", function() {
		updateLanguage(this.value);
	});

	const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
	languageSelector.value = savedLanguage;
	updateLanguage(savedLanguage);

	/////////////////////////////////////////

	// Cambio de Moneda
	const currencySelector = document.getElementById("currency-selector");

	function updateCurrency(currency) {
		localStorage.setItem("selectedCurrency", currency);
		document.querySelectorAll(".product-price").forEach(price => {
			let amount = parseFloat(price.dataset.originalPrice);
			price.textContent = formatCurrency(amount, currency);
		});
	}

	function formatCurrency(amount, currency) {
		const rates = { USD: 1, EUR: 0.91, MXN: 17.56, GBP: 0.76 };
		let converted = amount * rates[currency];
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency
		}).format(converted);
	}

	currencySelector.addEventListener("change", function() {
		updateCurrency(this.value);
	});

	const savedCurrency = localStorage.getItem("selectedCurrency") || "USD";
	currencySelector.value = savedCurrency;
	updateCurrency(savedCurrency);

	/////////////////////////////////////////

	// Inicio de Sesión y Registro
	const loginBtn = document.getElementById("login-btn");
	const registerBtn = document.getElementById("register-btn");

	loginBtn.addEventListener("click", function() {
		let email = prompt("Enter your email:");
		let password = prompt("Enter your password:");

		if (email && password) {
			localStorage.setItem("loggedInUser", email);
			updateAccountStatus(email);
		}
	});

	registerBtn.addEventListener("click", function() {
		let email = prompt("Enter your email to register:");
		let password = prompt("Set your password:");

		if (email && password) {
			localStorage.setItem("loggedInUser", email);
			alert("Registration successful!");
			updateAccountStatus(email);
		}
	});

	function updateAccountStatus(email) {
		document.querySelector(".account-toggle").innerHTML = `<i class="fa fa-user-o"></i> ${email}`;
		document.getElementById("account-menu").innerHTML = `
			<li><a href="#" id="logout-btn">Logout</a></li>
		`;

		document.getElementById("logout-btn").addEventListener("click", function() {
			localStorage.removeItem("loggedInUser");
			location.reload();
		});
	}

	let savedUser = localStorage.getItem("loggedInUser");
	if (savedUser) updateAccountStatus(savedUser);

})(jQuery);
