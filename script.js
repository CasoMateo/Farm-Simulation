const main = document.querySelector(".granja-métodos");
const methods = main.querySelectorAll(".método-nuevo");
const basis = main.querySelector("#base");
const form = basis.querySelector(".form");
const submit = form.querySelector(".submit");
const animals = document.getElementById('tipos-animal');

const vaca = document.getElementById('vaca-métodos');
const vaca_methods = vaca.querySelectorAll('método-nuevo');
const crear_vaca = vaca.getElementById('crear-vaca');
const vaca_submit = crear_vaca.querySelector('.submit-vaca');
const vaca_form = crear_vaca.querySelector('.crear-vaca-form');

const main_oveja = document.getElementById('crear-oveja');
const main_gallina = document.getElementById('crear-gallina');

class Animal {
  // hacer clase abstracta
	constructor(nombre, color, sonido, alimento, precio_alimento, límite_producto, precio_producto, precio_reja, agua) {
	  if (new.target === Animal) {
	    throw new Error('Abstract class cannot be instantiated');
	  }
	  this.nombre_ = nombre;
  	this.color_ = color;
		this.sonido_ = sonido;
    this.alimento_ = alimento; 			
    this.nivel_alimentación_ = 0;
  	this.precio_alimento_ = precio_alimento; 
  	this.límite_producto_ = límite_producto;
  	this.producto_ = 0;
  	this.precio_producto_ = precio_producto;
  	this.cantidad_ = 0;
  	this.precio_reja_ = precio_reja;
  	this.agua_ = agua;
  	this.hidratado_ = false;
  	this.alimentado_ = false;
  }
  
  hacer_sonido() {
    // toggle class alimentado
    // hacer sonido
    if (this.alimentado_) {
      console.log(this.sonido_);
      this.alimentado_ = false;
    } else {
      console.log('No estoy alimentado');
    }
  }
  
  mover() {
    // toggle class alimentado
    // moverse
    if (this.alimentado_) {
      console.log(this.nombre_, 'se está moviendo');
      this.alimentado_ = false;
    } else {
      console.log('No estoy alimentado');
    }
  }
  
  hidratado() {
    // toggle class hidratado
    // saltar
    if (this.hidratado_) {
      console.log(this.nombre_, 'está saltando porque está hidratado');
      this.hidratado_ = false;
    } else {
      console.log('No estoy hidratado');
    }
    
  }
  
  reproducir(edad1, edad2, género1, género2, cantidad, nombre_granja) {
    if (this.cantidad_ >= 2) {
      if (edad1 > 12 && edad2 > 12) {
        if (género1 != género2) {
          this.cantidad_ += cantidad;
        }
      }
      
    }
    
    nombre_granja.gastos_ += this.precio_reja_ * cantidad;
    nombre_granja.dinero_ -= this.precio_reja_ * cantidad;
    
    return this.cantidad_;
    
  }
  
  precio() {
    console.log('Este es el precio del animal');
  }
}

class Vaca extends Animal {
  
  constructor(nombre, color, sonido, alimento, precio_alimento, límite_producto, precio_producto, precio_reja, agua) {
      super(nombre, color, sonido, alimento, precio_alimento, límite_producto, precio_producto, precio_reja, agua);
      this.nivel_alimentación_= 0;
      this.cantidad_ = 0;
      this.producto_ = 0;
    } 
  
  
  precio(productos, tipo, género, peso) {
    let precio_ = peso;
    
    if (género == 'm') {
      precio_ += 50;
    }
    
    return precio_;
    
  }
  
}

    
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

  set dinero(new_dinero) {
    this.dinero = new_dinero;
  }
}

function getDataVaca(e) {

  var data = new FormData(form);

  e.preventDefualt();

  alert(data.get('crear-granja-nombre'));

  for (i = 0; i < vaca_methods.length; i++) {
    vaca_methods.style.display = 'block';
    
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
  Granja.dinero = data.get('crear-granja-dinero-inicial');

}


function comprarAlimento(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('comprar-alimento-form'));

  alert(data.get('comprar-alimento-cantidad'));
}


      // checar resultado 
      // checar métodos separados
      // checar atributos granjas

  animals.addEventListener('mouseover', function() {
    animals.innerText = Granja.nombre;
  });

  animals.addEventListener('mouseout', function() {
    animals.innerText = 'Tipos de Animal';
  });

  document.addEventListener('DOMContentLoaded', function() {
    submit.addEventListener('click', getDataGranja, false);
    vaca_submit.addEventListener('click', getDataVaca, false);
  }, false);
