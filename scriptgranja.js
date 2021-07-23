const main = document.querySelector(".granja-métodos");
const methods = main.querySelectorAll(".método-nuevo");
const basis = main.querySelector("#base");
const form = basis.querySelector(".form");
const submit = form.querySelector(".submit");

const tipos_alimentos = {'alta-calidad': 3, 'regular': 2, 'baja-calidad': 1};
const litro_agua = 10;
localStorage.setItem('granja-ganancias', JSON.stringify(0));
localStorage.setItem('granja-gastos', JSON.stringify(0));
localStorage.setItem('granja-alimentos', JSON.stringify({"alta-calidad": 0, "regular": 0, "baja-calidad": 0}));
localStorage.setItem('granja-contenedor_agua', JSON.stringify(0));

const animals_at = document.getElementById('tipos-animal');
const empleados_at = document.getElementById('empleados');
const salarios_at = document.getElementById('salarios');
const ganancias_at = document.getElementById('ganancias');
const gastos_at = document.getElementById('gastos');
const dinero_at = document.getElementById('dinero-total');
const niveles_alimento_at = document.getElementById('niveles-alimento');
const niveles_agua_at = document.getElementById('niveles-agua');

function precioVaca(productos, tipo, género, peso) {
  let precio_ = peso;
    
  if (género == 'm') {
    precio_ += 50;
  }
    
  return precio_;

}

function precioOveja(productos, tipo, género, precio) {
  let precio_ = 350;
      
  precio_ -= this.límite_producto_ / productos;
      
  return precio_;

}

let tipos_gallinas_ = {'Plymouth Rock': 20, 'Orpington': 30, 'Brahma': 25, 'Cochin': 35, 'Blak Plateada': 50};

function precioGallina(productos, tipo, género, peso) {
  let precio_ = 200;
    
  if (género == 'h') {
    precio_ += 50;
  }
    
  precio_ += tipos_gallinas_[tipo];
    
  return precio_;

}

let precios = {'vaca-': precioVaca, 'oveja-': precioOveja, 'gallina-': precioGallina};

function getDataGranja(e) {

  e.preventDefault();
  
  let attributes = ['nombre, tipos_animales', 'empleados', 'salarios', 'dinero', 'ganancias', 'gastos', 'alimentos', 'contenedor_agua'];

  for (i = 0; i < attributes.length; i++) {
    localStorage.removeItem('granja-' + attributes[i]);
  }

  var data = new FormData(form);

  basis.style.borderBottom = '2px solid #dcdee0';

  for (i = 0; i < methods.length; i++) {
    methods[i].style.display = 'block';

  }

  localStorage.setItem('granja-nombre', JSON.stringify(data.get('crear-granja-nombre')));
  localStorage.setItem('granja-tipos_animales', JSON.stringify(data.get('crear-granja-tipo-animal')));
  localStorage.setItem('granja-empleados', JSON.stringify(data.get('crear-granja-empleados')));
  localStorage.setItem('granja-salarios', JSON.stringify(data.get('crear-granja-salarios')));
  localStorage.setItem('granja-dinero', JSON.stringify(data.get('crear-granja-dinero-inicial')));

}

function comprarAlimento(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('comprar-agua-form'));

  let tipos_animales_ = JSON.parse(localStorage.getItem('granja-tipos_animales'));

  if (!(data.get('comprar-alimento-tipo-animal') in tipos_animales_)) {
      return
  }
    
  let alimento_precio = parseInt(localStorage.getItem(tipos_animales_[data.get('comprar-alimento-tipo-animal')] + 'precio_alimento'), 10) * data.get('comprar-alimento-cantidad') * tipos_alimentos[data.get('comprar-alimento-calidad')];
  
  if (alimento_precio + parseInt(localStorage.getItem('granja-empleados'), 10) * parseInt(localStorage.getItem('granja-salarios'), 10) <= parseInt(localStorage.getItem('granja-dinero'), 10)) {
    let new_dinero = parseInt(localStorage.getItem('granja-dinero'), 10)) - alimento_precio;
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_gastos = parseInt(localStorage.getItem('granja-gastos'), 10)) + alimento_precio;
    localStorage.setItem('granja-gastos', JSON.stringify(new_gastos)); 
    let new_alimentos = JSON.parse(localStorage.getItem('granja-alimentos'));
    new_alimentos[data.get('comprar-alimento-calidad')] += data.get('comprar-alimento-cantidad');
    localStorage.setItem('granja-alimentos', JSON.stringify(new_alimentos));
    let gastos_final = parseInt(localStorage.getItem('granja-gastos'), 10));
    let dinero_final = parseInt(localStorage.getItem('granja-dinero'), 10));
    gastos_final += parseInt(localStorage.getItem('granja-empleados'), 10) * parseInt(localStorage.getItem('granja-salarios'), 10);
    dinero_final += parseInt(localStorage.getItem('granja-empleados'), 10) * parseInt(localStorage.getItem('granja-salarios'), 10);
    localStorage.setItem('granja-gastos', JSON.stringify(gastos_final)); 
		localStorage.setItem('granja-dinero', JSON.stringify(dinero_final));
  } else {
      alert('NO HAY SUFICIENTE DINERO');
  }
  

}

function comprarAgua(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('comprar-agua-form'));

  if (data.get('comprar-agua-cantidad') * litro_agua <= parseInt(localStorage.getItem('granja-dinero'), 10)) && parseInt(localStorage.getItem('granja-empleados'), 10) * parseInt(localStorage.getItem('granja-salarios'), 10) <= parseInt(localStorage.getItem('granja-dinero'), 10)) {
    let new_dinero = parseInt(localStorage.getItem('granja-dinero'), 10));
    new_dinero -= data.get('comprar-agua-cantidad-litros') * litro_agua;
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_gastos = parseInt(localStorage.getItem('granja-gastos'), 10));
    new_gastos += data.get('comprar-agua-cantidad-litros') * litro_agua;
    localStorage.setItem('granja-gastos', JSON.stringify(new_gastos));
    let new_contenedor_agua = parseInt(localStorage.getItem('granja-contenedor_agua'), 10));
    new_contenedor_agua += data.get('comprar-agua-cantidad-litros');
    localStorage.setItem('granja-contenedor_agua', JSON.stringify(new_contenedor_agua));
    let gastos_final = parseInt(localStorage.getItem('granja-gastos'), 10));
    let dinero_final = parseInt(localStorage.getItem('granja-dinero'), 10));
    gastos_final += localStorage.getItem('granja-empleados'), 10) * parseInt(localStorage.getItem('granja-salarios'), 10);
    dinero_final -= localStorage.getItem('granja-empleados'), 10) * parseInt(localStorage.getItem('granja-salarios'), 10);

    localStorage.setItem('granja-gastos', JSON.stringify(gastos_final));
    localStorage.setItem('granja-dinero', JSON.stringify(dinero_final));

  } else {
    alert('NO HAY SUFICIENTE DINERO ');
  }

}

function darAgua(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('dar-agua-form'));

  let tipos_animales_ = JSON.parse(localStorage.getItem('granja-tipos_animales'));


  if (!(data.get('dar-agua-tipo-animal') in tipos_animales_)) {
    return
  }
    
  if (parseInt(localStorage.getItem(tipos_alimentos[data.get('dar-agua-tipo-animal')] + 'agua'), 10) * parseInt(localStorage.getItem(tipos_animales_[data.get('dar-agua-tipo-animal')] + 'cantidad'), 10) <= parseInt(localStorage.getItem('granja-contenedor_agua'), 10)) {
    localStorage.setItem(tipos_animales_[data.get('dar-agua-tipo-animal')] + 'hidratado', JSON.stringify(true));;
    let new_contenedor_agua = parseInt(localStorage.getItem('granja-contenedor_agua'), 10))
    new_contenedor_agua -= parseInt(localStorage.getItem(tipos_animales_[data.get('dar-agua-tipo-animal')] + 'agua'), 10) * parseInt(localStorage.getItem(tipos_animales_[data.get('dar-agua-tipo-animal')] + 'cantidad'), 10);
    localStorage.setItem('granja-contenedor_agua', JSON.stringify(new_contenedor_agua));
      
  } else {
    alert('NO HAY SUFICIENTE AGUA');
  }

}

function alimentar(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('alimentar-form'));

  let tipos_animales_ = JSON.parse(localStorage.getItem('granja-tipos_animales'));
  let alimentos_ = JSON.parse(localStorage.getItem('granja-alimentos'));

  if (!(data.get('alimentar-tipo-animal') in tipos_animales_)) {
    return
  }
    
	if (parseInt(localStorage.getItem(tipos_animales_[data.get('dar-agua-tipo-animal')] + 'cantidad'), 10) <= alimentos_[data.get('alimentar-calidad')] && parseInt(localStorage.getItem('granja-dinero'), 10) >= parseInt(localStorage.getItem('granja-empleados'), 10)) * parseInt(localStorage.getItem('granja-salarios'), 10) {
		  
		let new_nivel_alimentación = parseInt(localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'nivel_alimentación'), 10);
    new_nivel_alimentación += parseInt(localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'cantidad'), 10) + tipos_alimentos_[data.get('alimentar-calidad')];
    localStorage.setItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'nivel_alimentación', JSON.stringify(new_nivel_alimentación));
    let new_gastos = parseInt(localStorage.getItem('granja-gastos'), 10);
    new_gastos += parseInt(localStorage.getItem('granja-empleados'), 10)) * parseInt(localStorage.getItem('granja-salarios'), 10);
		localStorage.setItem('granja-gastos', JSON.stringify(new_gastos));
    let new_dinero = parseInt(localStorage.getItem('granja-dinero'), 10);
    new_dinero -= lparseInt(localStorage.getItem('granja-empleados'), 10)) * parseInt(localStorage.getItem('granja-salarios'), 10);
		localStorage.setItem('granja-dinero', new_dinero);
		alimentos_['alimentar-calidad'] -= parseInt(localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'cantidad'), 10);
		
		if (localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'nivel_alimentación') >= localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'alimento') * localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'cantidad')) {
      let new_producto = localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'producto');
      new_producto += localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'cantidad');
      localStorage.setItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'producto', JSON.stringify(new_producto));
      let nivel_alimentación_final = localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'nivel_alimentación');
      nivel_alimentación_final -= localStorage.getItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'cantidad');
		  localStorage.setItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'nivel_alimentación', JSON.stringify(nivel_alimentación_final));
      localStorage.setItem(tipos_animales_[data.get('alimentar-tipo-animal')] + 'alimentado', JSON.stringify(true));

		}
	} else {
		alert('NO HAY SUFICIENTES ALIMENTOS o DINERO');
	}

  localStorage.setItem('granja-alimentos', JSON.stringify(alimentos_);
}

function venderProducto(event) {
  event.preventDefault();

  var data = new FormData(document.getElementById('vender-producto-form'));

  let tipos_animales_ = JSON.parse(localStorage.getItem('granja-tipos_animales'));

  if (!(data.get('vender-producto-tipo-animal') in tipos_animales_ )) {
    return
  }
    
  if (localStorage.getItem(tipos_animales_[data.get('vender-producto-tipo-animal')] + 'producto') >= data.get('vender-producto-cantidad') && localStorage.get('granja-dinero') >= localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios')) {
    let new_producto = localStorage.getItem(tipos_animales_[data.get('vender-producto-tipo-animal')] + 'producto');
    new_producto -= data.get('vender-producto-cantidad');
    localStorage.setItem(tipos_animales_[data.get('vender-producto-tipo-animal')] + 'producto', JSON.stringify(new_producto));
    let new_ganancias = localStorage.getItem('granja-ganancias');
    new_ganancias += localStorage.getItem(tipos_animales_[data.get('vender-producto-tipo-animal')] + 'precio_producto') * data.get('vender-producto-cantidad');
    localStorage.setItem('granja-ganancias', JSON.stringify(new_ganancias));
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero +=  localStorage.getItem(tipos_animales_[data.get('vender-producto-tipo-animal')] + 'precio_producto') * data.get('vender-producto-cantidad');
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
  } else {
    alert('NO HAY SUFICIENTES PRODUCTOS')
  }

}

function comprarAnimal(event) {
  event.preventDefault();

  var data = new FormData(document.getElementById('comprar-animal-form'));
  
  let tipos_animales_ = JSON.parse(localStorage.getItem('granja-tipos_animales'));


  if (!(data.get('comprar-animal-tipo-animal') in tipos_animales_ )) {
    return
  }

  if (precios[tipos_animales_[data.get('comprar-animal-tipo-animal')]](data.get('comprar-animal-productos'), data.get('comprar-animal-raza'), data.get('comprar-animal-género'), data.get('comprar-animal-peso')) * data.get('comprar-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios') <= localStorage.getItem('granja-dinero')) {
    let new_cantidad = localStorage.getItem(tipos_animales_[data.get('comprar-animal-tipo-animal')] + 'cantidad');
    new_cantidad += data.get('comprar-animal-cantidad');
    localStorage.setItem(tipos_animales_[data.get('comprar-animal-tipo-animal')] + 'cantidad', JSON.stringify(new_cantidad));
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero -= precios[tipos_animales_[data.get('comprar-animal-tipo-animal')]](data.get('comprar-animal-productos'), data.get('comprar-animal-raza'), data.get('comprar-animal-género'), data.get('comprar-animal-peso')) * data.get('comprar-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_gastos = localStorage.getItem('granja-gastos');
    new_gastos += precios[tipos_animales_[data.get('comprar-animal-tipo-animal')]](data.get('comprar-animal-productos'), data.get('comprar-animal-raza'), data.get('comprar-animal-género'), data.get('comprar-animal-peso')) * data.get('comprar-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-gastos', JSON.stringify(new_gastos));
    let dinero_final = localStorage.getItem('granja-dinero');
    dinero_final -= localStorage.getItem(tipos_animales_[data.get('comprar-animal-tipo-animal')] + 'precio_reja') * data.get('comprar-animal-cantidad');
    localStorage.setItem('granja-dinero', JSON.stringify(dinero_final));
    let gastos_final = localStorage.getItem('granja-gastos');
    gastos_final += localStorage.getItem(tipos_animales_[data.get('comprar-animal-tipo-animal')] + 'precio_reja') * data.get('comprar-animal-cantidad');
    localStorage.setItem('granja-gastos', JSON.stringify(gastos_final));

  } else {
    alert('NO HAY SUFICIENTE DINERO');
  }
    
}

function venderAnimal(event) {
  event.preventDefault();

  var data = new FormData(document.getElementById('vender-animal-form'));

  let tipos_animales_ = JSON.parse(localStorage.getItem('granja-tipos_animales'));

  if (!(data.get('vender-animal-tipo-animal') in tipos_animales_ )) {
    return
  }
    
  if (tipos_animales_[data.get('vender-animal-tipo-animal')].cantidad_  >= data.get('vender-animal-cantidad') && localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios') <= localStorage.getItem('granja-dinero')) {
    let new_cantidad = localStorage.getItem(tipos_animales_[data.get('vender-animal-tipo-animal')] + 'cantidad');
    new_cantidad += data.get('vender-animal-cantidad');
    localStorage.setItem(tipos_animales_[data.get('vender-animal-tipo-animal')] + 'cantidad', JSON.stringify(new_cantidad));
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero += precios[tipos_animales_[data.get('vender-animal-tipo-animal')]](data.get('vender-animal-productos'), data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('vender-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_ganancias = localStorage.getItem('granja-ganancias');
    new_ganancias += precios[tipos_animales_[data.get('vender-animal-tipo-animal')]](data.get('vender-animal-productos'), data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('vender-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-ganancias', JSON.stringify(new_ganancias));
    
    let dinero_final = localStorage.getItem('granja-dinero');
    dinero_final += localStorage.getItem(tipos_animales_[data.get('vender-animal-tipo-animal')] + 'precio_reja') * data.get('vender-animal-cantidad');
    localStorage.setItem('granja-dinero', JSON.stringify(dinero_final));
    let ganancias_final = localStorage.getItem('granja-ganancias');
    ganancias_final += localStorage.getItem(tipos_animales_[data.get('vender-animal-tipo-animal')] + 'precio_reja') * data.get('vender-animal-cantidad');
    localStorage.setItem('granja-gastos', JSON.stringify(ganancias_final));
    
  } else {
    alert('NO HAY SUFICIENTES ANIMALES');
    } 
  }

  animals_at.addEventListener('mouseover', function() {
    animals_at.innerText = localStorage.getItem('granja-tipos_animales');
  });

  animals_at.addEventListener('mouseout', function() {
    animals_at.innerText = 'Tipos de Animal';
  });

  empleados_at.addEventListener('mouseover', function() {
    empleados_at.innerText = localStorage.getItem('granja-empleados');
  });

  empleados_at.addEventListener('mouseout', function() {
    empleados_at.innerText = 'Empleados';
  }); 

  salarios_at.addEventListener('mouseover', function() {
    salarios_at.innerText = localStorage.getItem('granja-salarios');
  });

  salarios_at.addEventListener('mouseout', function() {
    salarios_at.innerText = 'Salarios';
  }); 

  ganancias_at.addEventListener('mouseover', function() {
    ganancias_at.innerText = localStorage.getItem('granja-ganancias');
  });

  ganancias_at.addEventListener('mouseout', function() {
    ganancias_at.innerText = 'Ganancias';
  });

  gastos_at.addEventListener('mouseover', function() {
    gastos_at.innerText = localStorage.getItem('granja-gastos');
  });

  gastos_at.addEventListener('mouseout', function() {
    gastos_at.innerText = 'Gastos';
  });

  dinero_at.addEventListener('mouseover', function() {
    dinero_at.innerText = localStorage.getItem('granja-dinero-total');
  });

  dinero_at.addEventListener('mouseout', function() {
    dinero_at.innerText = 'Dinero Total';
  });

  niveles_alimento_at.addEventListener('mouseover', function() {
    niveles_alimento_at.innerText = localStorage.getItem('granja-alimentos');
  });

  niveles_alimento_at.addEventListener('mouseout', function() {
    niveles_alimento_at.innerText = 'Niveles de Alimento';
  }); 

  niveles_agua_at.addEventListener('mouseover', function() {
    niveles_agua_at.innerText = localStorage.getItem('granja-contenedor_agua');
  });

  niveles_agua_at.addEventListener('mouseout', function() {
    niveles_agua_at.innerText = 'Niveles de Agua';
  });

  document.addEventListener('DOMContentLoaded', function() {
    submit.addEventListener('click', getDataGranja, false);
  }, false);
