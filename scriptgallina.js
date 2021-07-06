const gallina = document.getElementById('crear-gallina');
const gallina_methods = gallina.querySelectorAll('método-nuevo');
const crear_gallina = gallina.getElementById('crear-gallina');
const gallina_form = crear_gallina.querySelector('#crear-gallina-form');
const gallina_submit = crear_gallina.querySelector('#submit-crear-gallina'); 

const nivel_alimentación_at = document.getElementById('nivel-alimentación');
const productos_at = document.getElementById('productos'); 
const cantidad_at = document.getElementById('cantidad');
const hidratado_at = document.getElementById('hidratado');
const alimentado_at = document.getElementById('alimentado');

class Animal {
  // hacer clase abstracta
	constructor() {
	  if (new.target === Animal) {
	    throw new Error('Abstract class cannot be instantiated');
	  }		
    this.nivel_alimentación_ = 0;
  	this.producto_ = 0;
  	this.cantidad_ = 0;
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

export class Gallina extends Animal {
  static tipos_gallinas_ = {'Plymouth Rock': 20, 'Orpington': 30, 'Brahma': 25, 'Cochin': 35, 'Blak Plateada': 50};
  
  constructor() {
      
      this.nivel_alimentación_= 0;
      this.cantidad_ = 0;
      this.producto_ = 0;
      this.hidratado_ = false;
  	  this.alimentado_ = false;
    } 
  
  precio(productos, tipo, género, peso) {
    let precio_ = 200;
    
    if (género == 'h') {
      precio_ += 50;
    }
    
    precio_ += Gallina.tipos_gallinas_[tipo];
    
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

  const image = document.getElementById('mover-gallina-imagen');
  
  for (i = 0; i < 3; i++) {
    image.style.marginLeft = '3em';
    image.style.marginLeft = '15em';
  }

}

function saltar(event) {
  event.preventDefault();

  const image = document.getElementById('saltar-gallina-imagen');

  for (i = 0; i < 3; i++) {
    image.marginTop = '1em';
    image.marginTop = '10em';
  }
}

function reproducir(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('reproducir-gallina-form'));

  if (Gallina.cantidad >= 2) {
    if (data.get('reproducir-edad1') > 12 && data.get('reproducir-edad2') > 12) {
      if (data.get('reproducir-género1') != data.get('reproducir-género2')) {
        Gallina.cantidad += data.get('reproducir-cantidad');
      }
    }
    
  }
    
  data.get('reproducir-granja-nombre').gastos_ += Gallina.precio_reja_ * data.get('reproducir-cantidad');
  data.get('reproducir-granja-nombre').dinero_ -= Gallina.precio_reja_ * data.get('reproducir-cantidad');
  
}

function getDataGallina(e) {
  var data = new FormData(gallina_form);

  e.preventDefault();

  alert(data.get('crear-gallina-nombre'));

  crear_gallina.style.borderBottom = '2px solid  #dcdee0'
  
  for (i = 0; i < gallina_methods.length; i++) {
    gallina_methods[i].style.display = 'block';
  }

  Gallina.nombre = data.get('crear-gallina-nombre');
  Gallina.color = data.get('crear-gallina-color');
  Gallina.sonido = data.get('crear-gallina-sonido');
  Gallina.alimento = data.get('crear-gallina-alimento');
  Gallina.precio_alimento = data.get('crear-gallina-precio-alimento');
  Gallina.límite_producto = data.get('crear-gallina-límite-producto'));
  Gallina.precio_producto = data.get('crear-gallina-precio-producto');
  Gallina.precio_reja = data.get('crear-gallina-precio-reja');
  Gallina.agua = data.get('crear-gallina-agua');

} 

nivel_alimentación_at.addEventListener('mouseover', function() {
  nivel_alimentación_at.innerText = Gallina.nivel_alimentación;
});

nivel_alimentación_at.addEventListener('mouseout', function() {
  nivel_alimentación_at.innerText = 'Nivel de Alimentación';
}); 

productos_at.addEventListener('mouseover', function() {
  productos_at.innerText = Gallina.producto;
});

productos_at.addEventListener('mouseout', function() {
  productos_at.innerText = 'Productos';
});

cantidad_at.addEventListener('mouseover', function() {
  cantidad_at.innerText = Gallina.cantidad;
});

cantidad_at.addEventListener('mouseout', function() {
  cantidad_at.innerText = 'Cantidad';
});

hidratado_at.addEventListener('mouseover', function() {
  hidratado_at.innerText = Gallina.hidratado;
});

hidratado_at.addEventListener('mouseout', function() {
  hidratado_at.innerText = 'Hidratado';
});

alimentado_at.addEventListener('mouseover', function() {
  alimentado_at.innerText = Gallina.alimentado;
});

alimentado_at.addEventListener('mouseout', function() {
  alimentado_at.innerText = 'Alimentado';
});

document.addEventListener('DOMContentLoaded', function() {
  gallina_submit.addEventListener('click', getDataGallina, false);
}, false);
