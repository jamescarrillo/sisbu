/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ogbu.unprg.sisbu.filter;

import com.ogbu.unprg.sisbu.util.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author James Carrillo
 */
@WebFilter(
        urlPatterns = {
            "/*"
        }
        //initParams = @WebInitParam(name = "fileTypes", value = "doc;xls;zip;txt;jpg;png;gif")
        //initParams = @WebInitParam(name = "credentials", value = "true")
)
public class FilterURL implements Filter {

    private static final Logger LOG = Logger.getLogger(FilterURL.class.getName());
    private final Map<String, String> subProjects = new HashMap<>();
    private List<Resource> list_resources;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        LOG.info("Inicializando filtros URL");
        loaderSubProjects();
        loaderResources();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        //-> context/url
        String URI = req.getRequestURI();
        String CONTEXT = req.getContextPath();
        String URL = URI.substring(CONTEXT.length(), URI.length());
        //BUSCAMOS SI LA URL EXISTE EN LA LISTA, SIEMPRE Y CUANDO NO SEAN RECURSOS .js o .css, u otros SOLITITADOS
        if (URL.contains(".js")
                || URL.contains(".css")
                || URL.contains(".scss")
                || URL.contains(".ico")
                || URL.contains(".jpg")
                || URL.contains(".png")
                || URL.contains(".gif")
                || URL.contains(".svg")
                || URL.contains(".woff")) {
            if (URL.contains(".jsp")) {
                //MANDAMOS AL 404, SI NO ES EL index.jsp
                req.getRequestDispatcher("/zerror_pages/404.jsp").forward(request, response);
            } else {
                //LOG.info(URL);
                chain.doFilter(request, response);
            }
        } else {
            /*
            if (URL.equals("/") || URL.equals("/index.jsp")) {
                //REDIRECCIONAMOS AL LOGIN
                res.sendRedirect(req.getContextPath() + "/auth/login");
            } else {

            }
             */
            if (URL.equals("/login")) {
                //REDIRECCIONAMOS AL LOGIN
                //res.sendRedirect(req.getContextPath() + "/auth/login");
                res.sendRedirect(req.getContextPath() + "/index");
            } else {
                String subProject = getSubProject(URL);
                int pos_resource = getResource(URL);
                if (pos_resource != -1) {
                    //ENCONTRÓ MANDAMOS ESOS PARAMETROS
                    //LOG.info(this.list_resources.get(pos_resource).toString());
                    req.setAttribute("resource", this.list_resources.get(pos_resource));
                    req.getRequestDispatcher(subProject).forward(request, response);
                } else {
                    //MANDAMOS AL 404
                    req.getRequestDispatcher("/zerror_pages/404.jsp").forward(request, response);
                }
            }
        }
    }

    @Override
    public void destroy() {

    }

    private void loaderSubProjects() {
        this.subProjects.put("/", "/index.jsp");
        this.subProjects.put("/auth", "/auth.jsp");
        this.subProjects.put("/recovery", "/recovery.jsp");
        this.subProjects.put("/signup", "/signup.jsp");
        this.subProjects.put("/app", "/app.jsp");
    }

    private void loaderResources() {
        String version_project = "?v=";
        version_project += "0.14";
        this.list_resources = new ArrayList<>();
        Resource resource;

        /*SUBPROJECT INDEX*/
        // 
        resource = new Resource();
        resource.setUrl("/");
        resource.setPath("/views/subprojects/index/index/index.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/index/index/index.js" + version_project
        });
        this.list_resources.add(resource);
        //INDEX
        resource = new Resource();
        resource.setUrl("/index");
        resource.setPath("/views/subprojects/index/index/index.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/index/index/index.js" + version_project
        });
        this.list_resources.add(resource);
        //NOTICIAS
        resource = new Resource();
        resource.setUrl("/news");
        resource.setPath("/views/subprojects/index/new/new.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/index/new/new.js" + version_project
        });
        this.list_resources.add(resource);
        //DESCARGAS
        resource = new Resource();
        resource.setUrl("/downloads");
        resource.setPath("/views/subprojects/index/download/download.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/index/download/download.js" + version_project
        });
        this.list_resources.add(resource);
        //PROYECTO SISBU - QUE ES
        resource = new Resource();
        resource.setUrl("/proyecto-sisbu/que-es");
        resource.setPath("/views/subprojects/index/proyecto-sisbu/que-es/que-es.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/index/proyecto-sisbu/que-es/que-es.js" + version_project
        });
        this.list_resources.add(resource);
        //PROYECTO SISBU - EQUIPO SISBU
        resource = new Resource();
        resource.setUrl("/proyecto-sisbu/equipo");
        resource.setPath("/views/subprojects/index/proyecto-sisbu/equipo/equipo.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/index/proyecto-sisbu/equipo/equipo.js" + version_project
        });
        this.list_resources.add(resource);
        //PROYECTO SISBU - SER PARTE
        resource = new Resource();
        resource.setUrl("/proyecto-sisbu/ser-parte");
        resource.setPath("/views/subprojects/index/proyecto-sisbu/ser-parte/ser-parte.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/index/proyecto-sisbu/ser-parte/ser-parte.js" + version_project
        });
        this.list_resources.add(resource);

        /*SUBPROJECT DE REGISTRO*/
        //SIGN UP
        resource = new Resource();
        resource.setUrl("/signup");
        resource.setPath("");
        resource.setScripts(new String[]{
            "/views/subprojects/signup/util.methods.js" + version_project,
            "/views/subprojects/signup/signup.js" + version_project
        });
        this.list_resources.add(resource);
        /*SUBPROJECT DE AUTENTICACION*/
        //LOGIN
        resource = new Resource();
        resource.setUrl("/auth/login");
        resource.setPath("/views/subprojects/auth/login/login.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/auth/login/login.js" + version_project
        });
        this.list_resources.add(resource);
        /*SUBPROJECT DE RECOVERY*/
        //RECOVERY
        resource = new Resource();
        resource.setUrl("/recovery");
        resource.setPath("");
        resource.setScripts(new String[]{
            "/views/subprojects/recovery/recovery.js" + version_project
        });
        this.list_resources.add(resource);

        /*SUBPROJECT DE LA APLICACION*/
        //>>>>PARA TODOS LOS USUARIOS (GLOBAL)
        //PEFIL
        resource = new Resource();
        resource.setUrl("/app/perfil");
        resource.setPath("/views/subprojects/app/_global/perfil/perfil.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/_global/perfil/perfil.js" + version_project
        });
        this.list_resources.add(resource);
        //>>>>

        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ATENDIDO 
        //INDEX
        resource = new Resource();
        resource.setUrl("/app/ate/index");
        resource.setPath("/views/subprojects/app/ate/index/index.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/index/index.js" + version_project,
            "/views/subprojects/app/ate/index/video_tutorial.js" + version_project,
            "/views/subprojects/app/ate/index/activation_account.js" + version_project
        });
        this.list_resources.add(resource);

        //PERFIL
        resource = new Resource();
        resource.setUrl("/app/ate/perfil");
        resource.setPath("/views/subprojects/app/ate/perfil/perfil.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/perfil/perfil.js" + version_project
        });
        this.list_resources.add(resource);

        //DATOS
        resource = new Resource();
        resource.setUrl("/app/ate/datos");
        resource.setPath("/views/subprojects/app/ate/datos/datos.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/datos/datos.js" + version_project,
            "/views/subprojects/app/ate/datos/ciclo_academico_c.js" + version_project,
            "/views/subprojects/app/ate/datos/distrito_c.js" + version_project,
            "/views/subprojects/app/ate/datos/escuela_c.js" + version_project,
            "/views/subprojects/app/ate/datos/ocupacion_c.js" + version_project,
            "/views/subprojects/app/ate/datos/familiar.js" + version_project
        });
        this.list_resources.add(resource);

        //EVALUACIONES
        resource = new Resource();
        resource.setUrl("/app/ate/evaluaciones");
        resource.setPath("/views/subprojects/app/ate/evaluaciones/evaluaciones.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/evaluaciones/evaluaciones.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/deporte_c.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/aficion_c.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/distrito_c.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/intento_evaluacion.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/evaluaciones_socieconomica.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/evaluaciones_deportiva.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/evaluaciones_psicologica.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/evaluaciones_obstetricia.js" + version_project,
            "/views/subprojects/app/ate/evaluaciones/evaluaciones_odontologia.js" + version_project
        });
        this.list_resources.add(resource);

        //RESERVAS CITAS
        resource = new Resource();
        resource.setUrl("/app/ate/reservas");
        resource.setPath("/views/subprojects/app/ate/reservas/reservas.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/reservas/reservas.js" + version_project
        });
        this.list_resources.add(resource);

        //MENU SEMANAL
        resource = new Resource();
        resource.setUrl("/app/ate/menu-semanal");
        resource.setPath("/views/subprojects/app/ate/menu-semanal/menu-semanal.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/menu-semanal/menu-semanal.js" + version_project
        });
        this.list_resources.add(resource);

        //NOTICIAS Y EVENTOS
        resource = new Resource();
        resource.setUrl("/app/ate/noticias-eventos");
        resource.setPath("/views/subprojects/app/ate/noticias-eventos/noticias-eventos.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/noticias-eventos/noticias-eventos.js" + version_project
        });
        this.list_resources.add(resource);

        //DOCUMENTOS
        resource = new Resource();
        resource.setUrl("/app/ate/documentos");
        resource.setPath("/views/subprojects/app/ate/documentos/documentos.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/documentos/documentos.js" + version_project
        });
        this.list_resources.add(resource);

        //VIDEOS-TUTORIALES
        resource = new Resource();
        resource.setUrl("/app/ate/videos-tutoriales");
        resource.setPath("/views/subprojects/app/ate/videos-tutoriales/video-tutorial.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ate/videos-tutoriales/video-tutorial.js" + version_project
        });
        this.list_resources.add(resource);

        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>OGBU
        //INDEX
        resource = new Resource();
        resource.setUrl("/app/ogbu/index");
        resource.setPath("/views/subprojects/app/ogbu/index/index.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/index/index.js" + version_project
        });
        this.list_resources.add(resource);

        //SERVICIOS
        //ENFERMERÍA
        ///pacientes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/enfermeria/pacientes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/enfermeria/paciente/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/enfermeria/paciente/paciente.js" + version_project
        });
        this.list_resources.add(resource);
        ///citas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/enfermeria/citas");
        resource.setPath("/views/subprojects/app/servicios/enfermeria/cita/cita.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/enfermeria/cita/cita.js" + version_project
        });
        this.list_resources.add(resource);
        ///reportes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/enfermeria/reportes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/enfermeria/reportes/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/enfermeria/reportes/paciente.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/ciclo_c/ciclo_academico_c.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/escuela_c/escuela_c.js" + version_project
        });
        this.list_resources.add(resource);

        //MEDICO
        ///pacientes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/medicina/pacientes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/medicina/paciente/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/medicina/paciente/paciente.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/medicina/paciente/doctor_c.js" + version_project
        });
        this.list_resources.add(resource);
        ///citas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/medicina/citas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/medicina/cita/cita.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/medicina/cita/cita.js" + version_project
        });
        this.list_resources.add(resource);
        ///reportes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/medicina/reportes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/medicina/reportes/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/medicina/reportes/paciente.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/ciclo_c/ciclo_academico_c.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/escuela_c/escuela_c.js" + version_project
        });
        this.list_resources.add(resource);

        //ODONTOLOGIA
        ///pacientes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/odontologia/pacientes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/odontologia/paciente/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/odontologia/paciente/paciente.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/paciente/doctor_c.js" + version_project
        });
        this.list_resources.add(resource);
        ///citas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/odontologia/citas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/odontologia/cita/cita.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/odontologia/cita/cita.js" + version_project
        });
        this.list_resources.add(resource);
        ///fichas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/odontologia/fichas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/odontologia/fichas/evaluacion.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/evaluacion.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/pregunta.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/pregunta_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/critico_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/inconsistencia_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/alternativa.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/procedimiento_ciclo.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/detalle_procedimiento_ciclo.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/procedimiento_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/area_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/subarea_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/alternativa_global.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/odontologia/fichas/ciclo_academico.js" + version_project
        });
        this.list_resources.add(resource);
        ///reportes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/odontologia/reportes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/odontologia/reportes/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/odontologia/reportes/paciente.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/ciclo_c/ciclo_academico_c.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/escuela_c/escuela_c.js" + version_project
        });
        this.list_resources.add(resource);

        //OBSTETRICIA
        ///evaluaciones
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/obstetricia/evaluaciones");
        resource.setPath("/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/evaluacion.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/evaluacion.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/pregunta.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/pregunta_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/critico_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/inconsistencia_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/alternativa.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/procedimiento_ciclo.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/detalle_procedimiento_ciclo.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/procedimiento_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/area_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/subarea_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/alternativa_global.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/obstetricia/evaluacion/ciclo_academico.js" + version_project
        });
        this.list_resources.add(resource);
        /*
        ///pacientes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/obstetricia/pacientes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/obstetricia/paciente/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/obstetricia/paciente/paciente.js" + version_project
        });
        this.list_resources.add(resource);
         */
        ///citas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/obstetricia/citas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/obstetricia/cita/cita.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/obstetricia/cita/cita.js" + version_project
        });
        this.list_resources.add(resource);

        //FARMACIA
        ///pacientes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/farmacia/pacientes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/farmacia/paciente/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/farmacia/paciente/paciente.js" + version_project
        });
        this.list_resources.add(resource);
        ///unidades de medida
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/farmacia/unidades");
        resource.setPath("/views/subprojects/app/ogbu/servicios/farmacia/unidad-medida/unidad-medida.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/farmacia/unidad-medida/unidad-medida.js" + version_project
        });
        this.list_resources.add(resource);

        ///productos
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/farmacia/productos");
        resource.setPath("/views/subprojects/app/ogbu/servicios/farmacia/producto/producto.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/farmacia/producto/producto.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/producto/unidadMedida_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/producto/categoria_c.js" + version_project
        });
        this.list_resources.add(resource);
        ///categorias
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/farmacia/catalogos");
        resource.setPath("/views/subprojects/app/ogbu/servicios/farmacia/categoria/categoria.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/farmacia/categoria/categoria.js" + version_project
        });
        this.list_resources.add(resource);
        ///entradas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/farmacia/entradas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/farmacia/entrada/entrada.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/farmacia/entrada/class.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/entrada/entrada.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/entrada/detalle_entrada.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/entrada/producto_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/entrada/personal_c.js" + version_project
        });
        this.list_resources.add(resource);
        ///salidas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/farmacia/salidas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/farmacia/salida/salida.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/farmacia/salida/class.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/salida/paciente_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/salida/salida.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/salida/detalle_salida.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/salida/producto_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/farmacia/salida/personal_c.js" + version_project
        });
        this.list_resources.add(resource);

        //PSICOPEDAGOGIA
        ///evaluaciones
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/psicopedagogia/evaluaciones");
        resource.setPath("/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/evaluacion.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/evaluacion.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/pregunta.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/pregunta_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/critico_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/inconsistencia_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/alternativa.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/procedimiento_ciclo.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/detalle_procedimiento_ciclo.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/procedimiento_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/area_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/subarea_psi.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/alternativa_global.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/evaluacion/ciclo_academico.js" + version_project
        });
        this.list_resources.add(resource);
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/psicopedagogia/reportes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/psicopedagogia/reportes/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/reportes/procedimiento_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/reportes/paciente.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/ciclo_c/ciclo_academico_c.js" + version_project,
            "/views/subprojects/app/ogbu/informes/reportes/escuela_c/escuela_c.js" + version_project
        });
        this.list_resources.add(resource);
        ///usuarios
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/psicopedagogia/pacientes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/psicopedagogia/paciente/paciente.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/paciente/respuesta_evaluacion2.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/paciente/evaluacion.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/paciente/paciente.js" + version_project
        });
        this.list_resources.add(resource);
        /*
        ///asignaciones
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/psicopedagogia/asignaciones");
        resource.setPath("/views/subprojects/app/ogbu/servicios/psicopedagogia/asignacion/asignacion.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/asignacion/asignacion.js" + version_project
        });
        this.list_resources.add(resource);
         */
        ///citas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/psicopedagogia/citas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/psicopedagogia/cita/cita.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/psicopedagogia/cita/cita.js" + version_project
        });
        this.list_resources.add(resource);
        //SOCIAL
        ///usuarios
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/social/usuarios");
        resource.setPath("/views/subprojects/app/ogbu/servicios/social/atendido/atendido.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/social/atendido/atendido.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/social/atendido/familiar.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/social/atendido/distrito_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/social/atendido/documentos.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/social/atendido/evaluaciones_socieconomica.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/social/atendido/escuela_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/social/atendido/ocupacion_c.js" + version_project
        });
        this.list_resources.add(resource);

        //COMEDOR UNIVERSITARIO
        ///comidas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/comedor/comidas");
        resource.setPath("/views/subprojects/app/ogbu/servicios/comedor/comida/comida.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/comedor/comida/comida.js" + version_project
        });

        this.list_resources.add(resource);
        ///menus
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/comedor/menus");
        resource.setPath("/views/subprojects/app/ogbu/servicios/comedor/menu/menu.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/comedor/menu/menu.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/comedor/menu/class.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/comedor/menu/comida_c.js" + version_project
        });
        this.list_resources.add(resource);
        ///asistencia
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/comedor/asistencia");
        resource.setPath("/views/subprojects/app/servicios/comedor/asistencia/asistencia.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/comedor/asistencia/asistencia.js" + version_project
        });
        this.list_resources.add(resource);
        ///usuarios
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/comedor/usuarios");
        resource.setPath("/views/subprojects/app/servicios/comedor/usuario/usuario.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/comedor/usuario/usuario.js" + version_project
        });
        this.list_resources.add(resource);

        //RECREACIÓN Y DEPORTE
        ///USAURIOS
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/recreacion-deportes/usuarios");
        resource.setPath("/views/subprojects/app/ogbu/servicios/recreacion-deporte/usuario/usuario.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/usuario/aficion.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/usuario/aficion_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/usuario/documentos.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/usuario/deporte.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/usuario/deporte_c.js" + version_project,
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/usuario/usuario.js" + version_project
        });
        this.list_resources.add(resource);
        ///deportes
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/recreacion-deportes/deportes");
        resource.setPath("/views/subprojects/app/ogbu/servicios/recreacion-deporte/deporte/deporte.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/deporte/deporte.js" + version_project
        });
        this.list_resources.add(resource);
        ///aficiones
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/recreacion-deportes/aficiones");
        resource.setPath("/views/subprojects/app/ogbu/servicios/recreacion-deporte/aficion/aficion.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/servicios/recreacion-deporte/aficion/aficion.js" + version_project
        });
        this.list_resources.add(resource);
        ///fichas
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/recreacion-deportes/fichas");
        resource.setPath("/views/subprojects/app/servicios/recreacion-deportes/ficha/ficha.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/recreacion-deportes/ficha/ficha.js" + version_project
        });
        this.list_resources.add(resource);
        ///usuarios
        resource = new Resource();
        resource.setUrl("/app/ogbu/servicios/recreacion-deportes/usuarios");
        resource.setPath("/views/subprojects/app/servicios/recreacion-deportes/usuario/usuario.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/recreacion-deportes/usuario/usuario.js" + version_project
        });
        this.list_resources.add(resource);

        //CONFIGRUACIONES
        //CICLO ACADEMICO
        resource = new Resource();
        resource.setUrl("/app/ogbu/configuraciones/cicloacademico");
        resource.setPath("/views/subprojects/app/ogbu/configuraciones/cicloAcademico/cicloAcademico.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/configuraciones/cicloAcademico/cicloAcademico.js" + version_project
        });
        this.list_resources.add(resource);

        //MANTENIMIENTOS
        //ALUMNO
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/alumnos");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/alumno/alumno.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/alumno/alumno.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/alumno/usuario.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/alumno/escuela_c.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/alumno/distrito_c.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/alumno/ciclo_c.js" + version_project

        });
        this.list_resources.add(resource);
        //CARGOS
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/cargos");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/cargo/cargo.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/cargo/cargo.js" + version_project
        });
        this.list_resources.add(resource);
        //NOTICIAS
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/noticias");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/noticia/noticia.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/noticia/noticia.js" + version_project
        });
        this.list_resources.add(resource);
        //vIDEO TUTORIAL
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/video/tutorial");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/videoTutorial/videoTutorial.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/videoTutorial/videoTutorial.js" + version_project
        });
        this.list_resources.add(resource);
        //CITAS
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/citas");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/cita/cita.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/cita/cita.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/cita/area.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/cita/personal.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/cita/atendido.js" + version_project
        });
        this.list_resources.add(resource);
        //PERSONAL
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/personal");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/personal/personal.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/personal/personal.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/personal/cargo_c.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/personal/area_c.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/personal/usuario.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/personal/perfil_c.js" + version_project
        });
        this.list_resources.add(resource);
        //FACULTAD
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/facultades");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/facultad/facultad.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/facultad/facultad.js" + version_project
        });
        this.list_resources.add(resource);
        //OFICINAS
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/oficinas");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/oficina/oficina.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/oficina/oficina.js" + version_project
        });
        this.list_resources.add(resource);
        //DETALLE CRONOGRAMA COMEDOR
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/detallecronogramacu");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/detallecronogramacu/detallecronogramacu.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/detallecronogramacu/detallecronogramacu.js" + version_project
        });
        this.list_resources.add(resource);
        //MENUSEMANAL
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/menusemanal");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/menusemanal/menusemanal.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/menusemanal/menusemanal.js" + version_project
        });
        this.list_resources.add(resource);
        //COMIDAS
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/comidas");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/comida/comida.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/comida/comida.js" + version_project
        });
        this.list_resources.add(resource);

        //OCUPACIONES
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/ocupaciones");
        resource.setPath("/views/subprojects/app/mantenimientos/ocupacion/ocupacion.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/mantenimientos/ocupacion/ocupacion.js" + version_project
        });
        this.list_resources.add(resource);
        //UBIGEO
        resource = new Resource();
        resource.setUrl("/app/ogbu/mantenimientos/ubigeo");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/ubigeo/ubigeo.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/ubigeo/ubigeo.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/ubigeo/provincia_c.js" + version_project,
            "/views/subprojects/app/ogbu/mantenimientos/ubigeo/departamento_c.js" + version_project
        });
        this.list_resources.add(resource);

        //PROCESOS
        //UPLOAD
        resource = new Resource();
        resource.setUrl("/app/ogbu/procesos/upload");
        resource.setPath("/views/subprojects/app/ogbu/procesos/upload/upload.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/procesos/upload/xls.core.min.js" + version_project,
            "/views/subprojects/app/ogbu/procesos/upload/xlsx.core.min.js" + version_project,
            "/views/subprojects/app/ogbu/procesos/upload/ciclo_academico.js" + version_project,
            "/views/subprojects/app/ogbu/procesos/upload/upload.js" + version_project
        });
        this.list_resources.add(resource);
        //INFORMES

    }

    private int getResource(String URL) {
        int pos = -1;
        //LOG.info("COMPARANDO: ");
        //LOG.info(URL);
        //LOG.info("CON: ");
        for (int i = 0; i < this.list_resources.size(); i++) {
            //  LOG.info(this.list_resources.get(i).getUrl());
            if (this.list_resources.get(i).getUrl().equals(URL)) {
                pos = i;
                break;
            }
        }
        //LOG.log(Level.INFO, "POS: {0}", pos);
        return pos;
    }

    private String getSubProject(String URL) {
        String[] urls_subproject_base = {
            "/",
            "/index",
            "/news",
            "/downloads",
            //"/offices", no soporta parametros
            "/proyecto-sisbu/que-es",
            "/proyecto-sisbu/equipo",
            "/proyecto-sisbu/ser-parte"
        };
        //VERIFICAMOS QUE NO ESTÉ EN LAS URL's Base
        boolean encontro_base = false;
        for (String url : urls_subproject_base) {
            if (url.equals(URL)) {
                encontro_base = true;
                break;
            }
        }
        //VERIFICAMOS SI ESTA SOLICITANDO INFORMACION DE UNA OFCINA -> /officess/id
        if (URL.contains("/offices")) {
            encontro_base = true;
        }
        if (encontro_base) {
            return this.subProjects.get("/");
        } else {
            //SERÁ EL SEGUNDO SIEMPRE, EL PRIMER ES VACIO POR QUE INICIA EN /
            return this.subProjects.get("/" + URL.split("/")[1]);
        }
    }

}
