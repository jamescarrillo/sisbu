
class Salida {
    constructor(fecha = null, personal, diagnostico) {
        this.idsalida = 0;
        this.fecha = fecha;
        this.personal = personal;
        this.diagnostico = diagnostico;
    }
}

class Personal {
    constructor(idpersonal = 0) {
        this.idpersonal = idpersonal;

    }
}
class Diagnostico {
    constructor(iddiagnostico = 0) {
        this.iddiagnostico = iddiagnostico;

    }
}
class Presentacion {
    constructor(idpresentacion, fecha_vencimiento, existencia, producto) {
        this.idpresentacion = idpresentacion;
        this.fecha_vencimiento = fecha_vencimiento;
        this.existencia = existencia;
        this.producto = producto;
    }
}
class DetalleSalida {
    constructor() {
        this.iddetalle_salida = 0;
        this.cantidad = 5;
        this.salida = new Salida();
        this.presentacion = null;

    }
}


var ObjectDetalleSalida;
var listDetalleSalida = [];



