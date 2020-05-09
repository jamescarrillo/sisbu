
class Entrada {
    constructor(fecha, personal) {
        this.identrada = 0;
        this.fecha = fecha;
        this.personal = personal;
    }
}

class Personal {
    constructor(idpersonal) {
        this.idpersonal = idpersonal;

    }
}
class Producto {
    constructor(idproducto, nombre) {
        this.idproducto = idproducto;
        this.nombre = nombre;

    }
}
class Presentacion {
    constructor(fecha_vencimiento, existencia) {
        this.idpresentacion = 0;
        this.fecha_vencimiento = fecha_vencimiento;
        this.existencia = existencia;
        this.producto = new Producto();
    }
}

class DetalleEntrada {
    constructor() {
        this.iddetalle_entrada = 0;
        this.cantidad = 5;
        this.entrada = new Entrada();
        this.presentacion = new Presentacion();

    }
}


var ObjectDetalleEntrada;
var listDetalleEntrada = [];



