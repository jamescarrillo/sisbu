/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ogbu.unprg.sisbu.util;

/**
 *
 * @author James Carrillo
 */
public class Resource {

    private String url;
    private String path;
    private String[] scripts;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String[] getScripts() {
        return scripts;
    }

    public void setScripts(String[] scripts) {
        this.scripts = scripts;
    }

    @Override
    public String toString() {
        return "Resource{" + "url=" + url + ", path=" + path + ", scripts=" + scripts + '}';
    }

}
