<%-- 
    Document   : index
    Created on : 21 set. 2019, 13:08:49
    Author     : James Carrillo
--%>
<div class="row justify-content-center" style="margin-top: 70px">
    <div class="col-lg-4 col-sm-6">
        <h2 class="text-center">Hola <span class="text-info">Juan</span>, felicicidades por tu ingreso a nuestra UNPRG. 
        </h2>
        <p class="text-center" style="font-size: 18px">
            Tu información es importante
            para brindarte un mejor servicio. Agradecemos tu sinceridad al momento de 
            responder las distintas evaluaciones virtuales.
        </p>
        <p class="text-center text-danger" style="font-size: 12px">
            ***Nota: Te sugerimos ver los videos tutoriales sobre como llenar correctamente las evaluaciones, 
            si aún no lo has hecho, dale click a este enlace 
            <a href="<%=request.getContextPath()%>/app/ate/tutoriales-sisbu-cachimbo"><i class="icon icon-arrow-right icon-fw mr-2 mr-sm-1"></i> Videos Tutoriaales</a>
        </p>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-primary">Empezar</button>
    </div>
</div>