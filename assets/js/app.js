$(document).ready(function() {
	const params = new URLSearchParams(window.location.search);
	$('#edit_img').hide();
	$('#edit_img_lb').hide();
	$('#edit_make').hide();
	$('#edit_model').hide();
	$('#edit_price').hide();
	$('#edit_desc').hide();
	$('#edit_milage').hide();
	$('#edit_transmission').hide();
	$('#edit_type').hide();
	$('#edit_condition').hide();
	$('#searchresult').hide();

	//preview image
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#preview').attr('src', e.target.result);
			};

			reader.readAsDataURL(input.files[0]);
		}
	}
	//call preview fxn
	$('#vimg').change(function() {
		readURL(this);
	});

	//search
	$('#search').on('click', function(e) {
		e.preventDefault();

		let make = $('#smake').val();
		let type = $('#stype').val();

		$.ajax({
			url: 'http://localhost:3000/listcar',
			type: 'GET',
			success: function(response) {
				let result = response.map((car, i) => {
					// console.log(car.deleted,i);
					if (car.make == make || car.type == type) {
						// console.log(car);
						$('#searchresult').show();

						return `<div class="col-md-4 portfolio-box wow fadeInUp">
	                	<div class="portfolio-box-image">
	                		<img src="assets/img/all/${car.image}" >
	                	</div>
                		<h3><a href="./detail.html?id=${car.id}">${car.make +
							' ' +
							car.model}</a> <i class="fas fa-angle-right"></i></h3>
                		<div class="portfolio-box-date"><i class="far fa-calendar"></i>  ${
											car.price
										}</div>
                		<p>${car.description}</p>
					</div>`;
					}
				});
				window.location.href = `index.html#search`;
				$('#sresult').html(result);
			}
		});
	});

	//featured cars

	$.ajax({
		url: 'http://localhost:3000/featured',
		type: 'GET',
		success: function(response) {
			let result = response.map(car => {
				if (response != '') {
					// console.log(car);
					return `<div class="col-md-4 portfolio-box wow fadeInDown">
					<div class="portfolio-box-image">
						<a href="detail.html?id=${car.id}"><img src="assets/img/featured/${
						car.image
					}" /></a>
					</div>
					<h3>
						<a href="detail.html?id=${car.id}"> ${
						car.name
					} </a> <i class="fas fa-angle-right"></i>
					</h3>
					<div class="portfolio-box-date">
						<i class="far fa-calendar"></i> ${car.date}
					</div>
					<p>
						${car.price}
					</p>
				</div>`;
				}
			});
			$('#featured').html(result);
		}
	});

	//logged in user
	$.ajax({
		url: 'http://localhost:3000/register',
		type: 'GET',
		success: function(response) {
			let result = response.map((x, i) => {
				if (i == 0) {
					// console.log(x);
					return `<h3>Welcome ${x.email.split('@').shift()}</h3>`;
				}
			});
			$('#user').html(result);
		}
	});

	//all car listing

	$.ajax({
		url: 'http://localhost:3000/listcar',
		type: 'GET',
		success: function(response) {
			let result = response.map((car, i) => {
				// console.log(car.deleted,i);
				if (car.deleted == undefined) {
					// console.log(car);
					return `<div class="col-md-4 portfolio-box wow fadeInUp">
	                	<div class="portfolio-box-image">
	                		<a href="./detail.html?id=${car.id}"><img src="assets/img/all/${
						car.image
					}" ></a>
	                	</div>
                		<h3><a href="./detail.html?id=${car.id}">${car.make +
						' ' +
						car.model}</a> <i class="fas fa-angle-right"></i></h3>
                		<div class="portfolio-box-date"><i class="far fa-calendar"></i>  ${
											car.price
										}</div>
                		<p>${car.description}</p>
					</div>`;
				}
			});
			$('#allcars').html(result);
		}
	});

	//registration
	$('#signup').on('click', function(e) {
		e.preventDefault();
		let phone = $('#inputPhone').val();
		let email = $('#inputEmail')
			.val()
			.toLowerCase();
		let password = $('#inputPws').val();
		// console.log(phone);
		// console.log(email);
		// console.log(password);

		//create user
		$.ajax({
			url: 'http://localhost:3000/register',
			success: function(result) {
				// console.log(result);
				console.log('reg successful');
				window.location.reload();
			},
			method: 'POST',
			data: {
				phone,
				email,
				password
			}
		});
	});

	//login
	$('#login').on('click', function(e) {
		let email = $('#email').val();
		let password = $('#pws').val();

		e.preventDefault();
		//login user
		$.ajax({
			url: 'http://localhost:3000/register',
			type: 'GET',
			success: function(response) {
				if (
					response.some(x => {
						return x.email == email && x.password == password;
					})
				) {
					console.log('Login Successful!');

					window.location.href = `profile.html`; //redirect to...
				}
			}
		});
	});

	//create listing
	$('#listcar').on('click', function(e) {
		e.preventDefault();
		let make = $('#vmake').val();
		let model = $('#vmodel').val();
		let milage = $('#vmilage').val();
		let transmission = $('#vtransmission').val();
		let condition = $('#vcondition').val();
		let type = $('#vtype').val();
		let description = $('#vdesc').val();
		let image = $('#vimg')
			.val()
			.split('\\')
			.pop(); //remove the 'c://fakepath'
		let price = $('#vprice').val();
		if (!(model == '' || milage == '' || description == '' || image == '')) {
			$.ajax({
				url: 'http://localhost:3000/listcar',
				success: function(result) {
					console.log(result);
					console.log('list successful');
					window.location.href = `all.html`;
				},
				method: 'POST',
				data: {
					make,
					model,
					milage,
					transmission,
					condition,
					type,
					description,
					image,
					price
				}
			});
		}

		//login page
		$('#login').on('click', function(e) {
			let email = $('#email').val();
			let password = $('#pws').val();

			e.preventDefault();
			//login user
			$.ajax({
				url: `http://localhost:3000/register`,
				type: 'GET',
				success: function(response) {
					if (
						response.some(x => {
							return x.email == email && x.password == password;
						})
					) {
						console.log('Login Successful!');

						window.location.href = `profile.html`; //redirect to...
					}
				}
			});
		});
	});

	//sign-out
	$('#logout').on('click', function(e) {
		e.preventDefault();
		window.location.href = `index.html`;
	});

	//single listing view by id
	let id = params.get('id');
	if (id != null) {
		$.ajax({
			url: `http://localhost:3000/listcar/${id}`,
			type: 'GET',
			success: function(response) {
				let {
					make,
					model,
					milage,
					transmission,
					condition,
					type,
					description,
					image,
					price
				} = response;
				console.log($(' #detailspecs h3').text());
				//asign to fields

				$('#detailimg').attr('src', './assets/img/all/' + image);
				$('#detailtitle').text(make + ' ' + model);
				$('#detailprice').text(price);
				$(' #myTabContent #desc strong').text(description);
				$('#myTabContent #specs #1').text('Milage: ' + milage);
				$('#myTabContent #specs #2').text('Transmission: ' + transmission);
				$('#myTabContent #specs #3').text('Type: ' + type);
				$(' #myTabContent #other ').text('Condition:  ' + condition);

				$('#edit').attr('href', `/detail.html?id=${id}`);
				$('#delete').attr('href', `/detail.html?id=${id}`);
			}
		});
	}

	//delete
	$('#delete').on('click', function(e) {
		// console.log(id);
		e.preventDefault();
		if (confirm('ARE YOU SURE?!..') == true) {
			$.ajax({
				url: `http://localhost:3000/listcar/${id}`,
				type: 'PATCH',
				data: {
					deleted: true
				}
			}).done(function() {
				window.location.href = `all.html`;
				console.log('Successfully Deleted');
			});
		}
	});

	//update listing
	$('#edit').on('click', function(e) {
		e.preventDefault();
		$('#edit').text('Update Listing');

		//hide current record
		$('#detailtitle').hide();
		$('#detailimg').hide();
		$('#detailprice').hide();
		$(' #myTabContent #desc strong').text('');
		$('#myTabContent #specs #1').hide(); //milage
		$('#myTabContent #specs #2').hide(); //transmission
		$('#myTabContent #specs #3').hide(); //type
		$(' #myTabContent #other ').text('');

		if (id != null) {
			$.ajax({
				url: `http://localhost:3000/listcar/${id}`,
				type: 'GET',
				success: function(response) {
					let {
						make,
						model,
						milage,
						transmission,
						condition,
						type,
						description,
						price
					} = response;

					//asign to fields
					// console.log(make,model,price,description,milage,transmission,type,condition);

					$('#edit_desc').text(description);
					// $('#edit_make').text(make);
					// $('#detail p #edit_model').text(model);
					// $('#edit_price').text(price);
					// $('p#edit_milage').val()=milage;
					// $('#myTabContent #specs #edit_transmission').text(transmission);
					// $('#myTabContent #specs #edit_type').text(type);
					// $(' #edit_condition ').text(condition);
				}
			});
		}

		//show edit fields
		$('#edit_img').show();
		$('#edit_img_lb').show();
		$('#edit_make').show();
		$('#edit_model').show();
		$('#edit_price').show();
		$('#edit_desc').show();
		$('#edit_milage').show();
		$('#edit_transmission').show();
		$('#edit_type').show();
		$('#edit_condition').show();

		$('#edit').click(function() {
			//update the record
			if ($('#edit').text() === 'Update Listing') {
				console.log('can change!');

				e.preventDefault();
				let make = $('#edit_make').val();
				let model = $('#edit_model').val();
				let price = $('#edit_price').val();
				let milage = $('#edit_milage').val();
				let transmission = $('#edit_transmission').val();
				let type = $('#edit_type').val();
				let condition = $('#edit_condition').val();
				let description = $('#edit_desc').val();
				let image = $('#edit_img')
					.val()
					.split('\\')
					.pop();
				$.ajax({
					url: `http://localhost:3000/listcar/${id}`,
					method: 'PATCH',
					data: {
						make,
						model,
						price,
						milage,
						transmission,
						type,
						condition,
						description,
						image
					}
				}).done(function() {
					//window.location.href = `/detail.html?id=${id}`;
					$('#edit').text('Edit');
					// alert('Successfully Updated');
				});

				// window.location.reload();
			}
		});
	});
});
