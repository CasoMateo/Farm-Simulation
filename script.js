import {Vaca} from './scriptvaca.js';
import {Gallina} from './scriptgallina.js';
import {Oveja} from './scriptoveja.js';

const main = document.querySelector(".granja-métodos");
const methods = main.querySelectorAll(".método-nuevo");
const basis = main.querySelector("#base");
const form = basis.querySelector(".form");
const submit = form.querySelector(".submit");

const vaca = new Vaca();
const oveja = new Oveja();
const gallina = new Gallina();

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

  var data = new FormData(form);
        
  e.preventDefault();

  alert(data.get('crear-granja-empleados'));

  basis.style.borderBottom = '2px solid #dcdee0';

  for (i = 0; i < methods.length; i++) {
    methods[i].style.display = 'block';

  }

  Granja.nombre =  data.get('crear-granja-nombre');
  Granja.tipos_animales = data.get('crear-granja-tipo-animal');
  Granja.empleados = data.get('crear-granja-empleados');
  Granja.salarios = data.get('crear-granja-salarios')
  Granja.dinero = data.get('crear-granja-dinero-inicial');

}

function comprarAlimento(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('comprar-agua-form'));

  if (!(data.get('comprar-alimento-tipo-animal') in Granja.tipos_animales_ )) {
      return
  }
    
  let alimento_precio = Granja.tipos_animales_[data.get('comprar-alimento-tipo-animal')].precio_alimento_ * data.get('comprar-alimento-cantidad') * Granja.tipos_alimentos_[data.get('comprar-alimento-calidad')];
  
  if (alimento_precio + Granja.empleados_ * Granja.salarios_ <= Granja.dinero_) {
    Granja.dinero_ -= alimento_precio;
    Granja.gastos_ += alimento_precio;
    Granja.alimentos_[data.get('comprar-alimento-calidad')] += data.get('comprar-alimento-cantidad');
    Granja.gastos_ += Granja.empleados_ * Granja.salarios_;
		Granja.dinero_ -= Granja.empleados_ * Granja.salarios_;
  } else {
      alert('NO HAY SUFICIENTE DINERO');
  }

}

function comprarAgua(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('comprar-agua-form'));

  if (data.get('comprar-agua-cantidad') * Granja.litro_agua <= Granja.dinero_ && Granja.empleados_ * Granja.salarios_ <= Granja.dinero_) {
    Granja.dinero_ -= data.get('comprar-agua-cantidad-litros') * Granja.litro_agua;
    Granja.gastos_ += data.get('comprar-agua-cantidad-litros') * Granja.litro_agua;
    Granja.contenedor_agua_ += data.get('comprar-agua-cantidad-litros');
    Granja.dinero_ -= Granja.empleados_ * Granja.salarios_;
    Granja.gastos_ += Granja.empleados_ * Granja.salarios_;

  } else {
    alert('NO HAY SUFICIENTE DINERO ');
  }

}

function darAgua(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('dar-agua-form'));


  if (!(data.get('dar-agua-tipo-animal') in Granja.tipos_animales_)) {
    return
  }
    
  if (Grana.tipos_animales_[data.get('dar-agua-tipo-animal')].agua_ * Granja.tipos_animales_[data.get('dar-agua-tipo-animal')].cantidad_ <= Granja.contenedor_agua_ ) {
    Granja.tipos_animales_[data.get('dar-agua-tipo-animal')].hidratado_ = true;
    Granja.contenedor_agua_ -= Granja.tipos_animales_[data.get('dar-agua-tipo-animal')].agua_ * Granja.tipos_animales_[data.get('dar-agua-tipo-animal')].cantidad_;
      
  } else {
    alert('NO HAY SUFICIENTE AGUA');
  }

}

function alimentar(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('alimentar-form'));

  if (!(data.get('alimentar-tipo-animal') in Granja.tipos_animales_)) {
    return
  }
    
	if (Granja.tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_ <= Granja.alimentos_[data.get('alimentar-calidad')] && Granja.dinero_ >= Granja.empleados_ * Granja.salarios_) {
		  
		Granja.tipos_animales_[data.get('alimentar-tipo-animal')].nivel_alimentación_ += Granja.tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_ + Granja.tipos_alimentos_[data.get('alimentar-calidad')];
		Granja.gastos_ += Granja.empleados_ * Granja.salarios_;
		Granja.dinero_ -= Granja.empleados_ * Granja.salarios_;
		Granja.alimentos_['alimentar-calidad'] -= Granja.tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_;
		
		if (Granja.tipos_animales_[data.get('alimentar-tipo-animal')].nivel_alimentación_ >= Granja.tipos_animales_[data.get('alimentar-tipo-animal')].alimento_ * Granja.tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_) {
		  Granja.tipos_animales_[data.get('alimentar-tipo-animal')].producto_ += Granja.tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_;
		  Granja.tipos_animales_[data.get('alimentar-tipo-animal')].nivel_alimentación_ -= Granja.tipos_animales_[data.get('alimentar-tipo-animal')].cantidad_;
		  Granja.tipos_animales_[data.get('alimentar-tipo-animal')].alimentado_ = true;
		}
	} else {
		alert('NO HAY SUFICIENTES ALIMENTOS o DINERO');
	}
}

function venderProducto(event) {
  event.preventDefault();

  var data = new FormData(document.getElementById('vender-producto-form'));

  if (!(data.get('vender-producto-tipo-animal') in Granja.tipos_animales_ )) {
    return
  }
    
  if (Granja.tipos_animales_[data.get('vender-producto-tipo-animal')].producto_ >= data.get('vender-producto-cantidad') && Granja.dinero_ >= Granja.empleados_ * Granja.salarios_) {
    Granja.tipos_animales_[data.get('vender-producto-tipo-animal')].producto_ -= data.get('vender-producto-cantidad');
    Granja.ganancias_ += Granja.tipos_animales_[data.get('vender-producto-tipo-animal')].precio_producto_ * data.get('vender-producto-cantidad');
    Granja.dinero_ += Granja.tipos_animales_[data.get('vender-producto-tipo-animal')].precio_producto_ * data.get('vender-producto-cantidad');
  } else {
    alert('NO HAY SUFICIENTES PRODUCTOS')
  }

}

function comprarAnimal(event) {
  event.preventDefault();

  var data = new FormData(document.getElementById('comprar-animal-form'));


  if (!(data.get('comprar-animal-tipo-animal') in Granja.tipos_animales_ )) {
    return
  }

  if (Granja.tipos_animales_[data.get('comprar-animal-tipo-animal')].precio(data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-productos', data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('comprar-animal-cantidad') + Granja.empleados_ * Granja.salarios_ <= Granja.dinero_) {
    Granja.tipos_animales_[data.get('comprar-animal-tipo-animal')].cantidad_ += data.get('comprar-animal-cantidad');
    Granja.dinero_ -= Granja.tipos_animales_[data.get('comprar-animal-tipo-animal')].precio(data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-productos', data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('comprar-animal-cantidad') + Granja.salarios_ * Granja.empleados_;
    Granja.gastos_ += Granja.tipos_animales_[data.get('comprar-animal-tipo-animal')].precio(data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-productos', data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('comprar-animal-cantidad') + Granja.salarios_ * Granja.empleados_;
    Granja.dinero_ -= Granja.tipos_animales_[data.get('comprar-animal-tipo-animal')].precio_reja_ * data.get('comprar-animal-cantidad');
    Granja.gastos_ += Granja.tipos_animales_[data.get('comprar-animal-tipo-animal')].precio_reja_ * data.get('comprar-animal-cantidad');
a
  } else {
    alert('NO HAY SUFICIENTE DINERO');
  }
    
}

function venderAnimal(event) {
  event.preventDefault();

  var data = new FormData(document.getElementById('vender-animal-form'));

  if (!(data.get('vender-animal-tipo-animal') in Granja.tipos_animales_ )) {
    return
  }
    
  if (Granja.tipos_animales_[data.get('vender-animal-tipo-animal')].cantidad_  >= data.get('vender-animal-cantidad') && Granja.dinero_ >= Granja.empleados_ * Granja.salarios_) {
    Granja.tipos_animales_[data.get('vender-animal-tipo-animal')].cantidad_ -= data.get('vender-animal-cantidad');
    Granja.dinero_ += Granja.tipos_animales_[data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-productos', data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('vender-animal-cantidad');
    Granja.ganancias_ += Granja.tipos_animales_[data.get('vender-animal-tipo-animal')].precio(data.get('vender-animal-productos', data.get('vender-animal-raza'), data.get('vender-animal-género'), data.get('vender-animal-peso')) * data.get('vender-animal-cantidad');
    Granja.dinero_ += Granja.tipos_animales_[data.get('vender-animal-tipo-animal')].precio_reja_ * data.get('vender-animal-cantidad');
    Granja.ganancias_ += Granja.tipos_animales_[data.get('vender-animal-tipo-animal')].precio_reja_ * data.get('vender-animal-cantidad');
  } else {
    alert('NO HAY SUFICIENTES ANIMALES');
    } 
  }

  animals_at.addEventListener('mouseover', function() {
    animals_at.innerText = Granja.tipos_animales;
  });

  animals_at.addEventListener('mouseout', function() {
    animals_at.innerText = 'Tipos de Animal';
  });

  empleados_at.addEventListener('mouseover', function() {
    empleados_at.innerText = Granja.empleados;
  });

  empleados_at.addEventListener('mouseout', function() {
    empleados_at.innerText = 'Empleados';
  }); 

  salarios_at.addEventListener('mouseover', function() {
    salarios_at.innerText = Granja.salarios;
  });

  salarios_at.addEventListener('mouseout', function() {
    salarios_at.innerText = 'Salarios';
  }); 

  ganancias_at.addEventListener('mouseover', function() {
    ganancias_at.innerText = Granja.ganancias;
  });

  ganancias_at.addEventListener('mouseout', function() {
    ganancias_at.innerText = 'Ganancias';
  });

  gastos_at.addEventListener('mouseover', function() {
    gastos_at.innerText = Granja.gastos;
  });

  gastos_at.addEventListener('mouseout', function() {
    gastos_at.innerText = 'Gastos';
  });

  dinero_at.addEventListener('mouseover', function() {
    dinero_at.innerText = Granja.dinero;
  });

  dinero_at.addEventListener('mouseout', function() {
    dinero_at.innerText = 'Dinero Total';
  });

  niveles_alimento_at.addEventListener('mouseover', function() {
    niveles_alimento_at.innerText = Granja.alimentos;
  });

  niveles_alimento_at.addEventListener('mouseout', function() {
    niveles_alimento_at.innerText = 'Niveles de Alimento';
  }); 

  niveles_agua_at.addEventListener('mouseover', function() {
    niveles_agua_at.innerText = Granja.contenedor_agua;
  });

  niveles_agua_at.addEventListener('mouseout', function() {
    niveles_agua_at.innerText = 'Niveles de Agua';
  });


  document.addEventListener('DOMContentLoaded', function() {
    submit.addEventListener('click', getDataGranja, false);
  }, false);
