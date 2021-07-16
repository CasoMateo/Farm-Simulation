
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

localStorage.setItem('gallina-nivel_alimentación', JSON.stringify(0));
localStorage.setItem('gallina-productos', JSON.stringify(0));
localStorage.setItem('gallina-cantidad', JSON.stringify(0));
localStorage.setItem('gallina-hidratado', JSON.stringify(false));
localStorage.setItem('gallina-alimentado', JSON.stringify(false));

function getDataGallina(e) {
  var data = new FormData(gallina_form);

  e.preventDefault();

  crear_gallina.style.borderBottom = '2px solid  #dcdee0'
  
  for (i = 0; i < gallina_methods.length; i++) {
    gallina_methods[i].style.display = 'block';
  }
  
  localStorage.setItem('gallina-nombre', JSON.stringify(data.get('crear-gallina-nombre')));
  localStorage.setItem('gallina-color', JSON.stringify(data.get('crear-gallina-color')));
  localStorage.setItem('gallina-sonido', JSON.stringify(data.get('crear-gallina-sonido')));
  localStorage.setItem('gallina-alimento', JSON.stringify(data.get('crear-gallina-alimento')));
  localStorage.setItem('gallina-precio_alimento', JSON.stringify(data.get('crear-gallina-precio-alimento')));
  localStorage.setItem('gallina-límite_producto', JSON.stringify(data.get('crear-gallina-límite-producto')));
  localStorage.setItem('gallina-precio_producto', JSON.stringify(data.get('crear-gallina-precio-producto')));
  localStorage.setItem('gallina-precio_reja', JSON.stringify(data.get('crear-gallina-precio-reja')));
  localStorage.setItem('gallina-agua', JSON.stringify(data.get('crear-gallina-agua')));

} 

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

  if (localStorage.getItem('gallina-alimentado')) {
    let new_alimentado = false; 
    localStorage.setItem('gallina-alimentado', JSON.stringify(new_alimentado));

    var audio = new Audio('');
    audio.play();

  } else {
    alert('EL ANIMAL NO ESTÁ ALIMENTADO');
  }
}

function mover(event) {
  
  event.preventDefault();

  if (localStorage.getItem('gallina-alimentado')) {
    let new_alimentado = false; 
    localStorage.setItem('gallina-alimentado', JSON.stringify(new_alimentado));

    const image = document.getElementById('mover-gallina-imagen');
  
    for (i = 0; i < 3; i++) {
      image.style.marginLeft = '3em';
      image.style.marginLeft = '15em';
    }
    
  } else {
    alert('EL ANIMAL NO ESTÁ ALIMENTADO')
  }

}

function saltar(event) {
  event.preventDefault();

  if (localStorage.getItem('gallina-hidratado')) {

    let new_hidratado = false; 
    localStorage.setItem('gallina-hidratado', JSON.stringify(new_hidratado));

    const image = document.getElementById('saltar-gallina-imagen');

    for (i = 0; i < 3; i++) {
      image.style.marginTop = '1em';
      image.style.marginTop = '10em';
    }

  } else {
    alert('EL ANIMAL NO ESTÁ HIDRATADO');
  }
}

function reproducir(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('reproducir-gallina-form'));

  if (localStorage.getItem('gallina-cantidad') >= 2) {
    if (data.get('reproducir-edad1') > 12 && data.get('reproducir-edad2') > 12) {
      if (data.get('reproducir-género1') != data.get('reproducir-género2')) {
        let new_cantidad = localStorage.getItem('gallina-cantidad');
        new_cantidad += data.get('reproducir-cantidad');
        localStorage.setItem('gallina-cantidad', JSON.stringify(new_cantidad));
    }
  }
    
  let new_granja_gastos = localStorage.getItem('granja-gastos');
  new_granja_gastos += localStorage.getItem('granja-precio_reja') * data.get('reproducir-cantidad');
  localStorage.setItem('granja-gastos', JSON.stringify(new_granja_gastos));
  let new_granja_dinero = localStorage.getItem('granja-dinero');
  new_granja_dinero -= localStorage.getItem('granja-precio_reja') * data.get('reproducir-cantidad');
  localStorage.setItem('granja-dinero', JSON.stringify(new_granja_dinero));
  
}


nivel_alimentación_at.addEventListener('mouseover', function() {
  nivel_alimentación_at.innerText = localStorage.getItem('gallina-nivel_alimentación');;
});

nivel_alimentación_at.addEventListener('mouseout', function() {
  nivel_alimentación_at.innerText = 'Nivel de Alimentación';
}); 

productos_at.addEventListener('mouseover', function() {
  productos_at.innerText = localStorage.getItem('gallina-productos');
});

productos_at.addEventListener('mouseout', function() {
  productos_at.innerText = 'Productos';
});

cantidad_at.addEventListener('mouseover', function() {
  cantidad_at.innerText = localStorage.getItem('gallina-cantidad');
});

cantidad_at.addEventListener('mouseout', function() {
  cantidad_at.innerText = 'Cantidad';
});

hidratado_at.addEventListener('mouseover', function() {
  hidratado_at.innerText = localStorage.getItem('gallina-hidratado');
});

hidratado_at.addEventListener('mouseout', function() {
  hidratado_at.innerText = 'Hidratado';
});

alimentado_at.addEventListener('mouseover', function() {
  alimentado_at.innerText = localStorage.getItem('gallina-alimentado');
});

alimentado_at.addEventListener('mouseout', function() {
  alimentado_at.innerText = 'Alimentado';
});

document.addEventListener('DOMContentLoaded', function() {
  gallina_submit.addEventListener('click', getDataGallina, false);
}, false);
