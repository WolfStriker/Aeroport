package com.springapp.mvc.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class HelloController {
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
		model.addAttribute("message", "Toto va à l'école!");
		return "hello";
	}

    @RequestMapping(method = RequestMethod.HEAD)
    public void printHead(){
    }

    @RequestMapping(value = "/api/test", method = RequestMethod.GET)
    @ResponseBody
    public String testJSON(ModelMap model) throws JSONException {


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