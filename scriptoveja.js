const oveja = document.getElementById('crear-oveja');
const oveja_methods = oveja.querySelectorAll('método-nuevo');
const crear_oveja = oveja.getElementById('crear-oveja');
const oveja_form = crear_oveja.querySelector('#crear-oveja-form');
const oveja_submit = crear_oveja.querySelector('#submit-oveja-form');

const nivel_alimentación_at = document.getElementById('nivel-alimentación');
const productos_at = document.getElementById('productos'); 
const cantidad_at = document.getElementById('cantidad');
const hidratado_at = document.getElementById('hidratado');
const alimentado_at = document.getElementById('alimentado');

localStorage.setItem('oveja-nivel_alimentación', JSON.stringify(0));
localStorage.setItem('oveja-productos', JSON.stringify(0));
localStorage.setItem('oveja-cantidad', JSON.stringify(0));
localStorage.setItem('oveja-hidratado', JSON.stringify(false));
localStorage.setItem('oveja-alimentado', JSON.stringify(false));

function getDataOveja(e) {
  var data = new FormData(oveja_form);

  e.preventDefault();

  let attributes = ['nombre', 'color', 'sonido', 'alimento', 'precio_alimento', 'límite_producto', 'precio_producto', 'precio_reja', 'agua', 'nivel_alimentación', 'productos', 'cantidad', 'hidratado', 'alimentado'];

  for (i = 0, i < attributes.length; i++) {
    localStorage.removeItem('oveja-' + attributes[i]);
  }

  crear_oveja.style.borderBottom = '2px solid  #dcdee0';
  
  for (i = 0; i < oveja_methods.length; i++) {
    oveja_methods[i].style.display = 'block';
  }

  localStorage.setItem('oveja-nombre', JSON.stringify(data.get('crear-oveja-nombre')));
  localStorage.setItem('oveja-color', JSON.stringify(data.get('crear-oveja-color')));
  localStorage.setItem('oveja-sonido', JSON.stringify(data.get('crear-oveja-sonido')));
  localStorage.setItem('oveja-alimento', JSON.stringify(data.get('crear-oveja-alimento')));
  localStorage.setItem('oveja-precio_alimento', JSON.stringify(data.get('crear-oveja-precio-alimento')));
  localStorage.setItem('oveja-límite_producto', JSON.stringify(data.get('crear-oveja-límite-producto')));
  localStorage.setItem('oveja-precio_producto', JSON.stringify(data.get('crear-oveja-precio-producto')));
  localStorage.setItem('oveja-precio_reja', JSON.stringify(data.get('crear-oveja-precio-reja')));
  localStorage.setItem('oveja-agua', JSON.stringify(data.get('crear-oveja-agua')));
  
} 

function hacerSonido(event) {
  event.preventDefault();

  if (JSON.parse(localStorage.getItem('oveja-alimentado'))) {
    let new_alimentado = false; 
    localStorage.setItem('oveja-alimentado', JSON.stringify(new_alimentado));

    var audio = new Audio('');
    audio.play();

  } else {
    alert('EL ANIMAL NO ESTÁ ALIMENTADO');
  }
}

function mover(event) {
  event.preventDefault();

  if (JSON.parse(localStorage.getItem('oveja-alimentado'))) {
    let new_alimentado = false; 
    localStorage.setItem('oveja-alimentado', JSON.stringify(new_alimentado));

    const image = document.getElementById('mover-oveja-imagen');
  
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

  if (JSON.parse(localStorage.getItem('oveja-hidratado'))) {

    let new_hidratado = false; 
    localStorage.setItem('oveja-hidratado', JSON.stringify(new_hidratado));

    const image = document.getElementById('saltar-oveja-imagen');

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
  var data = new FormData(document.getElementById('reproducir-oveja-form'));

  if (parseInt(localStorage.getItem('oveja-cantidad'), 10) >= 2) {
    if (data.get('reproducir-edad1') > 12 && data.get('reproducir-edad2') > 12) {
      if (data.get('reproducir-género1') != data.get('reproducir-género2')) {
        let new_cantidad = parseInt(localStorage.getItem('oveja-cantidad'), 10);
        new_cantidad += data.get('reproducir-cantidad');
        localStorage.setItem('oveja-cantidad', JSON.stringify(new_cantidad));
    }
  }
    
  let new_granja_gastos = parseInt(localStorage.getItem('granja-gastos'), 10);
  new_granja_gastos += parseInt(localStorage.getItem('granja-precio_reja'), 10); * data.get('reproducir-cantidad');
  localStorage.setItem('granja-gastos', JSON.stringify(new_granja_gastos));
  let new_granja_dinero = parseInt(localStorage.getItem('granja-dinero'), 10);
  new_granja_dinero -= parseInt(localStorage.getItem('granja-precio_reja'), 10); * data.get('reproducir-cantidad');
  localStorage.setItem('granja-dinero', JSON.stringify(new_granja_dinero));
  
}

nivel_alimentación_at.addEventListener('mouseover', function() {
  nivel_alimentación_at.innerText = localStorage.getItem('oveja-nivel_alimentación');
});

nivel_alimentación_at.addEventListener('mouseout', function() {
  nivel_alimentación_at.innerText = 'Nivel de Alimentación';
}); 

productos_at.addEventListener('mouseover', function() {
  productos_at.innerText = localStorage.getItem('oveja-productos');
});

productos_at.addEventListener('mouseout', function() {
  productos_at.innerText = 'Productos';
});

cantidad_at.addEventListener('mouseover', function() {
  cantidad_at.innerText = localStorage.getItem('oveja-cantidad');
});

cantidad_at.addEventListener('mouseout', function() {
  cantidad_at.innerText = 'Cantidad';
});

hidratado_at.addEventListener('mouseover', function() {
  hidratado_at.innerText = localStorage.getItem('oveja-hidratado');
});

hidratado_at.addEventListener('mouseout', function() {
  hidratado_at.innerText = 'Hidratado';
});

alimentado_at.addEventListener('mouseover', function() {
  alimentado_at.innerText = localStorage.getItem('oveja-alimentado');
});

alimentado_at.addEventListener('mouseout', function() {
  alimentado_at.innerText = 'Alimentado';
});

document.addEventListener('DOMContentLoaded', function() {
  oveja_submit.addEventListener('click', getDataOveja, false);  
}, false);

