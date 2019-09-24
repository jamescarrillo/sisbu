
class MenuSemanal {
    constructor(idmenu_semanal,fechai,fechaf,observacion) {
        this.idmenu_semanal = idmenu_semanal;
        this.fechai = fechai;
        this.fechaf = fechaf;
        this.observacion = observacion;
    }
}

class DetalleCronogramaCu {
    constructor() {
        this.iddetalle_cronogramacu = 0;
        this.fecha = null;
        this.menu_semanal = new MenuSemanal();
        this.comida_dsegundo = new Comida();
        this.comida_dpostre = new Comida();
        this.comida_dbebida = new Comida();
        this.comida_asegundo = new Comida();
        this.comida_asopa = new Comida();
        this.comida_abebida = new Comida();
        this.comida_apostre = new Comida();
        this.comida_csegundo = new Comida();
        this.comida_csopa = new Comida();
        this.comida_cbebida = new Comida();
        this.comida_cpostre = new Comida();
    }
}

class Comida {
    constructor(idcomida,descripcion,tipo) {
        this.idcomida = idcomida;
        this.descripcion = descripcion;
        this.tipo = tipo;
    }
}

var dms;
var listDMS = [];



