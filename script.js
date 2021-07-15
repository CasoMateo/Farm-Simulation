const main = document.querySelector(".granja-métodos");
const methods = main.querySelectorAll(".método-nuevo");
const basis = main.querySelector("#base");
const form = basis.querySelector(".form");
const submit = form.querySelector(".submit");

const tipos_alimentos = {'alta-calidad': 3, 'regular': 2, 'baja-calidad': 1};
const litro_agua = 10;
localStorage.setItem('granja-ganancias', '0');
localStorage.setItem('granja-gastos', '0');
localStorage.setItem('granja-alimentos', JSON.stringify({"alta-calidad": 0, "regular": 0, "baja-calidad": 0}));
localStorage.setItem('granja-contenedor_agua', '0');


const animals_at = document.getElementById('tipos-animal');
const empleados_at = document.getElementById('empleados');
const salarios_at = document.getElementById('salarios');
const ganancias_at = document.getElementById('ganancias');
const gastos_at = document.getElementById('gastos');
const dinero_at = document.getElementById('dinero-total');
const niveles_alimento_at = document.getElementById('niveles-alimento');
const niveles_agua_at = document.getElementById('niveles-agua');


class Granja {
  static tipos_alimentos = {'alta-calidad': 3, 'regular': 2, 'baja-calidad': 1};

  constructor() {
    this.ganancias = 0;
    this.gastos = 0;
    this.alimentos = {'alta-calidad': 0, 'regular': 0, 'baja-calidad': 0};
    this.contenedor_agua = 0;
          
  }

  set nombre(new_nombre) {
    this.nombre = new_nombre;
  } 

  set tipos_animales(new_tipos_animales) {
    this.tipos_animales = new_tipos_animales;
  }

  set empleados(new_empleados) {
    this.empleados = new_empleados;
  }

  set salarios(new_salarios) {
    this.salarios = new_salarios;
  }

  set dinero(new_dinero) {
    this.dinero = new_dinero;
  }
}


function getDataGranja(e) {

  let attributes = ['nombre, tipos_animales', 'empleados', 'salarios', 'dinero', 'ganancias', 'gastos', 'alimentos', 'contenedor_agua'];

  for (i = 0; i < attributes.length; i++) {
    localStorage.removeItem('granja-' + attributes[i]);
  }

  var data = new FormData(form);
        
  e.preventDefault();

  alert(data.get('crear-granja-empleados'));

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
    
  let alimento_precio = tipos_animales_[data.get('comprar-alimento-tipo-animal')].precio_alimento_ * data.get('comprar-alimento-cantidad') * tipos_alimentos[data.get('comprar-alimento-calidad')];
  
  if (alimento_precio + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios') <= localStorage.getItem('granja-dinero')) {
    let new_dinero = localStorage.getItem('granja-dinero') - alimento_precio;
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_gastos = localStorage.getItem('granja-gastos') + alimento_precio;
    localStorage.setItem('granja-gastos', JSON.stringify(new_gastos)); 
    let new_alimentos = JSON.parse(localStorage.getItem('granja-alimentos'));
    new_alimentos[data.get('comprar-alimento-calidad')] += data.get('comprar-alimento-cantidad');
    localStorage.setItem('granja-alimentos', JSON.stringify(new_alimentos));
    let gastos_final = localStorage.getItem('granja-gastos');
    let dinero_final = localStorage.getItem('granja-dinero');
    gastos_final += localStorage.getItem('granja-empleados') + localStorage.getItem('granja-salarios');
    dinero_final += localStorage.getItem('granja-empleados') + localStorage.getItem('granja-salarios');

    localStorage.setItem('granja-gastos', JSON.stringify(gastos_final)); 
		localStorage.setItem('granja-dinero', JSON.stringify(dinero_final));
  } else {
      alert('NO HAY SUFICIENTE DINERO');
  }
  

}

function comprarAgua(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('comprar-agua-form'));

  if (data.get('comprar-agua-cantidad') * litro_agua <= localStorage.getItem('granja-dinero') && localStorage.getItem('granja-empleados') * localStorage.getItem('grnaja-salarios') <= localStorage.getItem('granja-dinero')) {
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero -= data.get('comprar-agua-cantidad-litros') * litro_agua;
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_gastos = localStorage.getItem('granja-gastos');
    new_gastos += data.get('comprar-agua-cantidad-litros') * litro_agua;
    localStorage.setItem('granja-gastos', JSON.stringify(new_gastos));
    let new_contenedor_agua = localStorage.getItem('granja-contenedor_agua');
    new_contenedor_agua += data.get('comprar-agua-cantidad-litros');
    localStorage.setItem('granja-contenedor_agua', JSON.stringify(new_contenedor_agua));
    let gastos_final = localStorage.getItem('granja-gastos');
    let dinero_final = localStorage.getItem('granja-gastos');
    gastos_final += localStorage.getItem('granja-empleados') + localStorage.getItem('granja-salarios');
    dinero_final -= localStorage.getItem('granja-empleados') + localStorage.getItem('granja-salarios');

    localStorage.getItem('granja-gastos', JSON.stringify(gastos_final));
    localStorage.getItem('granja-dinero', JSON.stringify(dinero_final));

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
    
  if (tipos_animales_[data.get('dar-agua-tipo-animal')].agua_ * tipos_animales_[data.get('dar-agua-tipo-animal')].cantidad_ <= localStorage.getItem('granja-contenedor_agua') {
    tipos_animales_[data.get('dar-agua-tipo-animal')].hidratado_ = true;
    let new_contenedor_agua = data.getItem('granja-contenedor_agua');
    new_contenedor_agua -= tipos_animales_[data.get('dar-agua-tipo-animal')].agua_ * tipos_animales_[data.get('dar-agua-tipo-animal')].cantidad_;
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
    
	if (tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_ <= alimentos_[data.get('alimentar-calidad')] && localStorage.getItem('granja-dinero') >= localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios')) {
		  
		tipos_animales_[data.get('alimentar-tipo-animal')].nivel_alimentación_ += tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_ + tipos_alimentos_[data.get('alimentar-calidad')];
    let new_gastos = localStorage.getItem('granja-gastos');
    new_gastos += localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
		localStorage.setItem('granja-gastos', JSON.stringify(new_gastos));
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero -= localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
		localStorage.setItem('granja-dinero', new_dinero);
		alimentos_['alimentar-calidad'] -= tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_;
		
		if (tipos_animales_[data.get('alimentar-tipo-animal')].nivel_alimentación_ >= tipos_animales_[data.get('alimentar-tipo-animal')].alimento_ * tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_) {
		  tipos_animales_[data.get('alimentar-tipo-animal')].producto_ += tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_;
		  tipos_animales_[data.get('alimentar-tipo-animal')].nivel_alimentación_ -= tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_;
		  tipos_animales_[data.get('alimentar-tipo-animal')].alimentado_ = true;
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
    
  if (tipos_animales_[data.get('vender-producto-tipo-animal')].producto_ >= data.get('vender-producto-cantidad') && localStorage.get('granja-dinero') >= localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios')) {
    tipos_animales_[data.get('vender-producto-tipo-animal')].producto_ -= data.get('vender-producto-cantidad');
    let new_ganancias = localStorage.getItem('granja-ganancias');
    new_ganancias += tipos_animales_[data.get('vender-producto-tipo-animal')].precio_producto_ * data.get('vender-producto-cantidad');
    localStorage.setItem('granja-ganancias', JSON.stringify(new_ganancias));
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero +=  tipos_animales_[data.get('vender-producto-tipo-animal')].precio_producto_ * data.get('vender-producto-cantidad');
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

  if (tipos_animales_[data.get('comprar-animal-tipo-animal')].precio(data.get('comprar-animal-tipo-animal')].precio(data.get('comprar-animal-productos', data.get('comprar-animal-raza'), data.get('comprar-animal-género'), data.get('comprar-animal-peso')) * data.get('comprar-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios') <= localStorage.getItem('granja-dinero')) {
    tipos_animales_[data.get('comprar-animal-tipo-animal')].cantidad_ += data.get('comprar-animal-cantidad');
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero -= tipos_animales_[data.get('comprar-animal-tipo-animal')].precio(data.get('comprar-animal-tipo-animal'), precio(data.get('comprar-animal-productos', data.get('comprar-animal-raza'), data.get('comprar-animal-género'), data.get('comprar-animal-peso')) * data.get('comprar-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_gastos = localStorage.getItem('granja-gastos');
    new_gastos += tipos_animales_[data.get('comprar-animal-tipo-animal')].precio(data.get('comprar-animal-tipo-animal'), data.get('comprar-animal-productos'), data.get('comprar-animal-raza'), data.get('comprar-animal-género'), data.get('comprar-animal-peso')) * data.get('comprar-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-gastos', JSON.stringify(new_gastos));
    let dinero_final = localStorage.getItem('granja-dinero');
    dinero_final -= tipos_animales_[data.get('comprar-animal-tipo-animal')].precio_reja_ * data.get('comprar-animal-cantidad');
    localStorage.setItem('granja-dinero', JSON.stringify(dinero_final));
    let gastos_final = localStorage.getItem('granja-gastos');
    gastos_final += tipos_animales_[data.get('comprar-animal-tipo-animal')].precio_reja_ * data.get('comprar-animal-cantidad');
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
    tipos_animales_[data.get('vender-animal-tipo-animal')].cantidad_ -= data.get('vender-animal-cantidad');
    let new_dinero = localStorage.getItem('granja-dinero');
    new_dinero += tipos_animales_[data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-tipo-animal'), precio(data.get('vender-animal-productos', data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('vender-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-dinero', JSON.stringify(new_dinero));
    let new_ganancias = localStorage.getItem('granja-ganancias');
    new_ganancias += tipos_animales_[data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-tipo-animal'), data.get('vender-animal-productos'), data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('vender-animal-cantidad') + localStorage.getItem('granja-empleados') * localStorage.getItem('granja-salarios');
    localStorage.setItem('granja-ganancias', JSON.stringify(new_ganancias));
    
    let dinero_final = localStorage.getItem('granja-dinero');
    dinero_final += tipos_animales_[data.get('vender-animal-tipo-animal')].precio_reja_ * data.get('vender-animal-cantidad');
    localStorage.setItem('granja-dinero', JSON.stringify(dinero_final));
    let ganancias_final = localStorage.getItem('granja-ganancias');
    ganancias_final += tipos_animales_[data.get('vender-animal-tipo-animal')].precio_reja_ * data.get('vender-animal-cantidad');
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

