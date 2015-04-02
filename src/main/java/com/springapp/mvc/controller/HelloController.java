package com.springapp.mvc.controller;

import java.util.List;

import com.springapp.mvc.Database;
import com.springapp.mvc.beans.HotelBean;
import com.springapp.mvc.beans.VolBean;
import com.springapp.mvc.dao.Dao;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String showForm(){
		return "home";
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
		return "home";
	}

    @RequestMapping(method = RequestMethod.HEAD)
    public void printHead(){
    }
    
    @RequestMapping(value = "/vols", method = RequestMethod.GET)
    @ResponseBody
    public String getVols() throws JSONException{
    	Dao<VolBean> dao = new Dao<VolBean>();
    	List<VolBean> l = dao.selectAll(new VolBean());
    	JSONArray array = new JSONArray();
    	
    	for(VolBean v : l){
    		JSONObject o = new JSONObject();
    		o.put("id", v.getIdVol());
    		o.put("villeDepart", v.getLieuDepart());
    		o.put("villeArrivee", v.getLieuArrivee());
    		o.put("dateDepart", v.getDateDepart());
    		o.put("dateArrivee", v.getDateArrivee());
    		o.put("prix", v.getPrix());
    		array.put(o);
    	}
    	return array.toString();
    }

    @RequestMapping(value = "/hotels", method = RequestMethod.GET)
    @ResponseBody
    public String getHotels() throws JSONException{
    	Dao<HotelBean> dao = new Dao<HotelBean>();
    	List<HotelBean> l = dao.selectAll(new HotelBean());
    	JSONArray array = new JSONArray();
    	
    	for(HotelBean v : l){
    		JSONObject o = new JSONObject();
    		o.put("id", v.getIdHotel());
    		o.put("nom", v.getNomHotel());
    		o.put("prix", v.getTarif());
    		o.put("etoiles", v.getEtoiles());
    		array.put(o);
    	}
    	return array.toString();
    }
    
    @RequestMapping(value="/ajouterVol", method=RequestMethod.GET)
    @ResponseBody
    public VolBean enregistrerVol(@RequestParam("lieuDepart") String lieudepart, 
    		@RequestParam("lieuArrivee") String lieuarrivee,
    		@RequestParam("dateDepart") String datedepart,
    		@RequestParam("dateArrivee") String datearrivee,
    		@RequestParam("prix") String prix) {
    	
    	VolBean vol = new VolBean();
    	vol.setLieuDepart(lieudepart);
    	vol.setLieuArrivee(lieuarrivee);
    	vol.setDateDepart(datedepart);
    	vol.setDateArrivee(datearrivee);
    	vol.setPrix(prix);
    	vol.setIdAeroport(1);
		System.out.println("enregistrerVol : ");
		
		Dao<VolBean> dao = new Dao<VolBean>();
		
		if(dao.save(vol)){
			return vol;
		}
		
		return null;
	}
    
    @RequestMapping(value="/ajouterHotel", method = RequestMethod.GET)
    @ResponseBody
    public HotelBean enregistrerHotel(@RequestParam("nom") String nom, 
    		@RequestParam("etoile") int etoile,
    		@RequestParam("prix") int prix){
    	
    	HotelBean hotel = new HotelBean();
    	hotel.setNomHotel(nom);
    	hotel.setEtoiles(etoile);
    	hotel.setTarif(prix);
    	
    	Dao<HotelBean> dao = new Dao<HotelBean>();
    	
    	
    	if(dao.save(hotel)){
    		return hotel;
    	}
    	return null;
    }
    
    @RequestMapping(value="/supprimerVol", method = RequestMethod.GET)
    public String deleteVol(@RequestParam("id") int id){
    	VolBean vol = new VolBean();
    	vol.setIdVol(id);
    	
    	Dao<VolBean> dao = new Dao<VolBean>();
    	if(dao.delete(vol)){
    		return "success";
    	}
    	else{
    		return "failed";
    	}
    }
    
    @RequestMapping(value="/supprimerHotel", method = RequestMethod.GET)
    public String deleteHotel(@RequestParam("id") int id){
    	HotelBean hotel = new HotelBean();
    	hotel.setIdHotel(id);
    	
    	Dao<HotelBean> dao = new Dao<HotelBean>();
    	if(dao.delete(hotel)){
    		return "success";
    	}
    	else{
    		return "failed";
    	}
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