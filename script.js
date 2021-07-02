const main = document.querySelector(".granja-métodos");
const methods = main.querySelectorAll(".método-nuevo");
const basis = main.querySelector("#base");
const form = basis.querySelector(".form");
const submit = form.querySelector(".submit");

const vaca = document.querySelector('.vaca-métodos');
const vaca_methods = vaca.querySelectorAll('.método-nuevo');
const crear_vaca = vaca.querySelector('#crear-vaca');
const vaca_form = crear_vaca.querySelector('.form');
const vaca_submit = vaca_form.querySelector('#submit-crear-vaca');

const oveja = document.getElementById('crear-oveja');
const oveja_methods = oveja.querySelectorAll('método-nuevo');
const crear_oveja = oveja.getElementById('crear-oveja');
const oveja_form = crear_oveja.querySelector('#crear-oveja-form');
const oveja_submit = crear_oveja.querySelector('#submit-oveja-form');

const gallina = document.getElementById('crear-gallina');
const gallina_methods = gallina.querySelectorAll('método-nuevo');
const crear_gallina = gallina.getElementById('crear-gallina');
const gallina_form = crear_gallina.querySelector('#crear-gallina-form');
const gallina_submit = crear_gallina.querySelector('#submit-crear-oveja');

const animals = document.getElementById('tipos-animal');

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

class Vaca extends Animal {
  
  constructor() {
    
      this.nivel_alimentación_= 0;
      this.cantidad_ = 0;
      this.producto_ = 0;
  	  this.hidratado_ = false;
  	  this.alimentado_ = false;
    } 
  
  
  precio(productos, tipo, género, peso) {
    let precio_ = peso;
    
    if (género == 'm') {
      precio_ += 50;
    }
    
    return precio_;
    
  }
  
}

class Gallina extends Animal {
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

class Oveja extends Animal {
    constructor() {
  
      this.nivel_alimentación_= 0;
      this.cantidad_ = 0;
      this.producto_ = 0;
      this.hidratado_ = false;
  	  this.alimentado_ = false;
    } 
    
    precio(productos, tipo, género, precio) {
      let precio_ = 350;
      
      precio_ -= this.límite_producto_ / productos;
      
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

  set salarios(new_salarios) {
    this.salarios = new_salarios;
  }

  set dinero(new_dinero) {
    this.dinero = new_dinero;
  }
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

function getDataOveja(e) {
  var data = new FormData(oveja_form);

  e.preventDefault();

  alert(data.get('crear-oveja-nombre'));

  crear_oveja.style.borderBottom = '2px solid  #dcdee0
  
  for (i = 0; i < oveja_methods.length; i++) {
    oveja_methods[i].style.display = 'block';
  }

  Oveja.nombre = data.get('crear-oveja-nombre');
  Oveja.color = data.get('crear-oveja-color');
  Oveja.sonido = data.get('crear-oveja-sonido');
  Oveja.alimento = data.get('crear-oveja-alimento');
  Oveja.precio_alimento = data.get('crear-oveja-precio-alimento');
  Oveja.límite_producto = data.get('crear-oveja-límite-producto'));
  Oveja.precio_producto = data.get('crear-oveja-precio-producto');
  Oveja.precio_reja = data.get('crear-oveja-precio-reja');
  Oveja.agua = data.get('crear-oveja-agua');
}

function getDataGallina(e) {
  var data = new FormData(gallina_form);

  e.preventDefault();

  alert(data.get('crear-oveja-nombre'));

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
  var data = new FormData(document.getElementById('comprar-alimento-form'));

  alert(data.get('comprar-alimento-cantidad'));
}


  animals.addEventListener('mouseover', function() {
    animals.innerText = Granja.nombre;
  });

  animals.addEventListener('mouseout', function() {
    animals.innerText = 'Tipos de Animal';
  });

  document.addEventListener('DOMContentLoaded', function() {
    submit.addEventListener('click', getDataGranja, false);
    vaca_submit.addEventListener('click', getDataVaca, false);
    oveja_submit.addEventListener('click', getDataOveja, false);
    gallina_submit.addEventListener('click', getDataGallina, false);
  }, false);
