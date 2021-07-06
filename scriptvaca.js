import {Granja} from './scriptgranja.js';

const vaca = document.querySelector('.vaca-métodos');
const vaca_methods = vaca.querySelectorAll('.método-nuevo');
const crear_vaca = vaca.querySelector('#crear-vaca');
const vaca_form = document.getElementById('crear-vaca-form')
const vaca_submit = document.getElementById('submit-crear-vaca');

const nivel_alimentación_at = document.getElementById('nivel-alimentación');
const productos_at = document.getElementById('productos'); 
const cantidad_at = document.getElementById('cantidad');
const hidratado_at = document.getElementById('hidratado');
const alimentado_at = document.getElementById('alimentado');

const granja = new Granja();

class Animal {
  // hacer clase abstracta
	constructor() {
	  if (new.target === Animal) {
	    throw new Error('Abstract class cannot be instantiated');
	  }		
    this.nivel_alimentación = 0;
  	this.producto = 0;
  	this.cantidad = 0;
  	this.hidratado = false;
  	this.alimentado = false;
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
    
  }
  
  precio() {
    console.log('Este es el precio del animal');
  }

  set nombre(new_nombre) {
    this.nombre = new_nombre;
  }

  set color(new_color) {
    this.color = new_color;
  }

  set sonido(new_sonido) {
    this.sonido = new_sonido;
  }

  set alimento(new_alimento) {
    this.alimento = new_alimento;
  }

  set precio_alimento(new_precio_alimento) {
    this.precio_alimento = new_precio_alimento;
  }

  set límite_producto(new_límite_producto) {
    this.límite_producto = new_límite_producto;
  }

  set precio_producto(new_precio_producto) {
    this.precio_producto = new_precio_producto;
  }

  set precio_reja(new_precio_reja) {
    this.precio_reja = new_precio_reja;
  }

  set agua(new_agua) {
    this.agua = new_agua;
  }

}

export class Vaca extends Animal {
  
  constructor() {
    
      this.nivel_alimentación = 0;
      this.cantidad = 0;
      this.producto = 0;
  	  this.hidratado = false;
  	  this.alimentado = false;
    } 
  
  
  precio(productos, tipo, género, peso) {
    let precio_ = peso;
    
    if (género == 'm') {
      precio_ += 50;
    }
    
    return precio_;
    
  }
  
}

function hacerSonido(event) {
  event.preventDefault();

  var audio = new Audio('');
  audio.play();
}

function mover(event) {
  event.preventDefault();

  const image = document.getElementById('mover-vaca-imagen');
  
  for (i = 0; i < 3; i++) {
    image.style.marginLeft = '3em';
    image.style.marginLeft = '15em';
  }

}

function saltar(event) {
  event.preventDefault();

  const image = document.getElementById('saltar-vaca-imagen');

  for (i = 0; i < 3; i++) {
    image.style.marginTop = '1em';
    image.style.marginTop = '10em';
  }
}

function reproducir(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('reproducir-vaca-form'));

  if (Vaca.cantidad >= 2) {
    if (data.get('reproducir-edad1') > 12 && data.get('reproducir-edad2') > 12) {
      if (data.get('reproducir-género1') != data.get('reproducir-género2')) {
        Vaca.cantidad += data.get('reproducir-cantidad');
      }
    }
    
  }
    
  data.get('reproducir-granja-nombre').gastos_ += Vaca.precio_reja_ * data.get('reproducir-cantidad');
  data.get('reproducir-granja-nombre').dinero_ -= Vaca.precio_reja_ * data.get('reproducir-cantidad');
  
}


function getDataVaca(e) {

  var data = new FormData(vaca_form);

  e.preventDefault();

  alert(data.get('crear-vaca-nombre'));

  for (i = 0; i < vaca_methods.length; i++) {
    vaca_methods.style.display = 'block';
  }

  Vaca.nombre = data.get('crear-vaca-nombre');
  Vaca.color = data.get('crear-vaca-color');
  Vaca.sonido = data.get('crear-vaca-sonido');
  Vaca.alimento = data.get('crear-vaca-alimento');
  Vaca.precio_alimento = data.get('crear-vaca-precio-alimento');
  Vaca.límite_producto = data.get('crear-vaca-límite-producto'));
  Vaca.precio_producto = data.get('crear-vaca-precio-producto');
  Vaca.precio_reja = data.get('crear-vaca-precio-reja');
  Vaca.agua = data.get('crear-vaca-agua');

} 

nivel_alimentación_at.addEventListener('mouseover', function() {
  nivel_alimentación_at.innerText = Vaca.nivel_alimentación;
});

nivel_alimentación_at.addEventListener('mouseout', function() {
  nivel_alimentación_at.innerText = 'Nivel de Alimentación';
}); 

productos_at.addEventListener('mouseover', function() {
  productos_at.innerText = Vaca.producto;
});

productos_at.addEventListener('mouseout', function() {
  productos_at.innerText = 'Productos';
});

cantidad_at.addEventListener('mouseover', function() {
  cantidad_at.innerText = Vaca.cantidad;
});

cantidad_at.addEventListener('mouseout', function() {
  cantidad_at.innerText = 'Cantidad';
});

hidratado_at.addEventListener('mouseover', function() {
  hidratado_at.innerText = Vaca.hidratado;
});

hidratado_at.addEventListener('mouseout', function() {
  hidratado_at.innerText = 'Hidratado';
});

alimentado_at.addEventListener('mouseover', function() {
  alimentado_at.innerText = Vaca.alimentado;
});

alimentado_at.addEventListener('mouseout', function() {
  alimentado_at.innerText = 'Alimentado';
});

document.addEventListener('DOMContentLoaded', function() {
  vaca_submit.addEventListener('click', getDataVaca, false);
 
}, false);
