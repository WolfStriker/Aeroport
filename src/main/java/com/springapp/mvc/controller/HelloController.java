package com.springapp.mvc.controller;

import java.util.List;

import com.springapp.mvc.Database;
import com.springapp.mvc.beans.VolBean;
import com.springapp.mvc.dao.Dao;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String showForm(){
		return "home";
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
		model.addAttribute("message", "Toto va à  l'école!");
		return "index";
	}

    @RequestMapping(method = RequestMethod.HEAD)
    public void printHead(){
    }
    
    @RequestMapping(value = "/vols", method = RequestMethod.POST)
    @ResponseBody
    public String getVols() throws JSONException{
    	Dao<VolBean> dao = new Dao<VolBean>();
    	List<VolBean> l = dao.selectAll(new VolBean());
    	JSONArray array = new JSONArray();
    	
    	for(VolBean v : l){
    		JSONObject o = new JSONObject();
    		o.put("id", v.getIdVol());
    		o.put("lieuDepart", v.getLieuDepart());
    		o.put("lieuArrive", v.getLieuArrivee());
    		o.put("depart", v.getDateDepart());
    		o.put("arrivee", v.getDateArrivee());
    		o.put("prix", v.getPrix());
    		array.put(o);
    	}
    	return array.toString();
    }

    @RequestMapping(value = "/api/test", method = RequestMethod.GET)
    @ResponseBody
    public String testJSON(ModelMap model) throws JSONException {

        Database db;
        JSONArray array = new JSONArray();
        JSONObject o = new JSONObject();
        o.put("id", "1");
        o.put("firstName", "Antoine");
        o.put("lastName", "FOUQUE");
        o.put("email", "a.fouque@outlook.com");
        array.put(o);
        o = new JSONObject();
        o.put("id", "2");
        o.put("firstName", "Toto");
        o.put("lastName", "TATA");
        o.put("email", "toto@tata.com");
        array.put(o);
        return array.toString();
    }
}