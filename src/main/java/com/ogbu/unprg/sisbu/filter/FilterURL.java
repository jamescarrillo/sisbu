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
import java.util.logging.Level;
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
@WebFilter(urlPatterns = {
    "/*"
})
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
            String subProject = getSubProject(URL);
            //LOG.info(subProject);
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
        version_project += "0.01";
        /*
            0.01 -> 01/08/19
         */
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

        //INDEX
        resource = new Resource();
        resource.setUrl("/app/ogbu/index");
        resource.setPath("/views/subprojects/app/ogbu/index/index.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/index/index.js" + version_project
        });
        this.list_resources.add(resource);
        
        //SERVICIOS
        //ENFERMERÍA
        resource = new Resource();
        resource.setUrl("/app/servicios/enfermeria");
        resource.setPath("/views/subprojects/app/servicios/enfermeria/enfermeria.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/enfermeria/enfermeria.js" + version_project
        });
        this.list_resources.add(resource);
        //MEDICO
        resource = new Resource();
        resource.setUrl("/app/servicios/medico");
        resource.setPath("/views/subprojects/app/servicios/medico/medico.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/medico/medico.js" + version_project
        });
        this.list_resources.add(resource);
        //ODONTOLOGIA
        resource = new Resource();
        resource.setUrl("/app/servicios/odontologia");
        resource.setPath("/views/subprojects/app/servicios/odontologia/odontologia.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/odontologia/odontologia.js" + version_project
        });
        this.list_resources.add(resource);
        //OBSTETRICIA
        resource = new Resource();
        resource.setUrl("/app/servicios/obstetricia");
        resource.setPath("/views/subprojects/app/servicios/obstetricia/obstetricia.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/servicios/obstetricia/obstetricia.js" + version_project
        });
        this.list_resources.add(resource);
        
        
        //MANTENIMIENTOS
        //CARGOS
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/cargos");
        resource.setPath("/views/subprojects/app/mantenimientos/cargo/cargo.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/mantenimientos/cargo/cargo.js" + version_project
        });
        this.list_resources.add(resource);
        //PERSONAL
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/personal");
        resource.setPath("/views/subprojects/app/mantenimientos/personal/personal.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/mantenimientos/personal/personal.js" + version_project
        });
        this.list_resources.add(resource);
        //FACULTAD
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/facultades");
        resource.setPath("/views/subprojects/app/mantenimientos/facultad/facultad.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/mantenimientos/facultad/facultad.js" + version_project
        });
        this.list_resources.add(resource);
        //OFICINAS
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/oficinas");
        resource.setPath("/views/subprojects/app/ogbu/mantenimientos/oficina/oficina.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/ogbu/mantenimientos/oficina/oficina.js" + version_project
        });
        this.list_resources.add(resource);
        //OCUPACIONES
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/ocupaciones");
        resource.setPath("/views/subprojects/app/mantenimientos/ocupacion/ocupacion.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/mantenimientos/ocupacion/ocupacion.js" + version_project
        });
        this.list_resources.add(resource);
        //UBIGEO
        resource = new Resource();
        resource.setUrl("/app/mantenimientos/ubigeo");
        resource.setPath("/views/subprojects/app/mantenimientos/ubigeo/ubigeo.jsp");
        resource.setScripts(new String[]{
            "/views/subprojects/app/mantenimientos/ubigeo/ubigeo.js" + version_project
        });
        this.list_resources.add(resource);
        

    }

    private int getResource(String URL) {
        int pos = -1;
        //LOG.info("COMPARANDO: ");
        //LOG.info(URL);
        //LOG.info("CON: ");
        for (int i = 0; i < this.list_resources.size(); i++) {
            //LOG.info(this.list_resources.get(i).getUrl());
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
