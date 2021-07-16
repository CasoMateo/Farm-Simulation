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

localStorage.setItem('vaca-nivel_alimentación', JSON.stringify(0));
localStorage.setItem('vaca-productos', JSON.stringify(0));
localStorage.setItem('vaca-cantidad', JSON.stringify(0));
localStorage.setItem('vaca-hidratado', JSON.stringify(false));
localStorage.setItem('vaca-alimentado', JSON.stringify(false));

function getDataVaca(event) {

  var data = new FormData(vaca_form);

  event.preventDefault();

  crear_vaca.style.borderBottom = '2px solid  #dcdee0';

  for (i = 0; i < vaca_methods.length; i++) {
    vaca_methods[i].style.display = 'block';
  }

  localStorage.setItem('vaca-nombre', JSON.stringify(data.get('crear-vaca-nombre')));
  localStorage.setItem('vaca-color', JSON.stringify(data.get('crear-vaca-color')));
  localStorage.setItem('vaca-sonido', JSON.stringify(data.get('crear-vaca-sonido')));
  localStorage.setItem('vaca-alimento', JSON.stringify(data.get('crear-vaca-alimento')));
  localStorage.setItem('vaca-precio_alimento', JSON.stringify(data.get('crear-vaca-precio-alimento')));
  localStorage.setItem('vaca-límite_producto', JSON.stringify(data.get('crear-vaca-límite-producto')));
  localStorage.setItem('vaca-precio_producto', JSON.stringify(data.get('crear-vaca-precio-producto')));
  localStorage.setItem('vaca-precio_reja', JSON.stringify(data.get('crear-vaca-precio-reja')));
  localStorage.setItem('vaca-agua', JSON.stringify(data.get('crear-vaca-agua')));

} 

function hacerSonido(event) {

  event.preventDefault();

  if (localStorage.getItem('vaca-alimentado')) {
    let new_alimentado = false; 
    localStorage.setItem('vaca-alimentado', JSON.stringify(new_alimentado));

    var audio = new Audio('');
    audio.play();

  } else {
    alert('EL ANIMAL NO ESTÁ ALIMENTADO');
  }
}

function mover(event) {
  event.preventDefault();

  if (localStorage.getItem('vaca-alimentado')) {
    let new_alimentado = false; 
    localStorage.setItem('vaca-alimentado', JSON.stringify(new_alimentado));

    const image = document.getElementById('mover-vaca-imagen');
  
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

  if (localStorage.getItem('vaca-hidratado')) {

    let new_hidratado = false; 
    localStorage.setItem('vaca-hidratado', JSON.stringify(new_hidratado));

    const image = document.getElementById('saltar-vaca-imagen');

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
  var data = new FormData(document.getElementById('reproducir-vaca-form'));

  if (localStorage.getItem('vaca-cantidad') >= 2) {
    if (data.get('reproducir-edad1') > 12 && data.get('reproducir-edad2') > 12) {
      if (data.get('reproducir-género1') != data.get('reproducir-género2')) {
        let new_cantidad = localStorage.getItem('vaca-cantidad');
        new_cantidad += data.get('reproducir-cantidad');
        localStorage.setItem('vaca-cantidad', JSON.stringify(new_cantidad));
      }
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
  nivel_alimentación_at.innerText = localStorage.getItem('vaca-nivel_alimentación');
});

nivel_alimentación_at.addEventListener('mouseout', function() {
  nivel_alimentación_at.innerText = 'Nivel de Alimentación';
}); 

productos_at.addEventListener('mouseover', function() {
  productos_at.innerText = localStorage.getItem('vaca-productos');
});

productos_at.addEventListener('mouseout', function() {
  productos_at.innerText = 'Productos';
});

cantidad_at.addEventListener('mouseover', function() {
  cantidad_at.innerText = localStorage.getItem('vaca-cantidad');
});

cantidad_at.addEventListener('mouseout', function() {
  cantidad_at.innerText = 'Cantidad';
});

hidratado_at.addEventListener('mouseover', function() {
  hidratado_at.innerText = localStorage.getItem('vaca-hidratado');
});

hidratado_at.addEventListener('mouseout', function() {
  hidratado_at.innerText = 'Hidratado';
});

alimentado_at.addEventListener('mouseover', function() {
  alimentado_at.innerText = localStorage.getItem('vaca-alimentación');
});

alimentado_at.addEventListener('mouseout', function() {
  alimentado_at.innerText = 'Alimentado';
});

