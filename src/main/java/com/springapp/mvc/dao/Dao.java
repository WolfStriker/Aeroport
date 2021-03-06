package com.springapp.mvc.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.springframework.stereotype.Service;

import com.springapp.mvc.Database;
import com.springapp.mvc.beans.AeroportBean;
import com.springapp.mvc.beans.HotelBean;
import com.springapp.mvc.beans.UserBean;
import com.springapp.mvc.beans.VilleBean;
import com.springapp.mvc.beans.VolBean;

@Service
public class Dao<T> {
	
	EntityManagerFactory emf;
	EntityManager manager;
	
	public Dao() {
		emf = Persistence.createEntityManagerFactory("aeroport");
		manager = emf.createEntityManager();
	}
	
	@SuppressWarnings("unchecked")
    public ArrayList<T> selectAll(T clazz){
        ArrayList<T> list;
        
        if(clazz instanceof VolBean){
        	list = (ArrayList<T>) manager.createQuery("from VolBean").getResultList();
        	return list;
        }
        else if(clazz instanceof HotelBean){
        	list = (ArrayList<T>) manager.createQuery("from HotelBean").getResultList();
        	return list;
        }
        
        return null;

    }

    @SuppressWarnings("unchecked")
    public T findById(T clazz, int id){
        T obj = null;
        Database.openSession();
        if(clazz instanceof AeroportBean){
            AeroportBean p = (AeroportBean) clazz;
            p.setIdAeroport(id);
            obj = (T) Database.getSession().get(clazz.getClass(), p.getIdAeroport());
        }
        else if(clazz instanceof VolBean){
            VolBean c = (VolBean) clazz;
            c.setIdVol(id);
            obj = (T) Database.getSession().get(clazz.getClass(), c.getIdVol());
        }
        else if(clazz instanceof HotelBean){
            HotelBean m = (HotelBean) clazz;
            m.setIdHotel(id);
            obj = (T) Database.getSession().get(clazz.getClass(), m.getIdHotel());
        }
        else if(clazz instanceof VilleBean){
            VilleBean s = (VilleBean) clazz;
            s.setIdVille(id);
            obj = (T) Database.getSession().get(clazz.getClass(), s.getIdVille());
        }
        Database.closeSession();
        return obj;

    }

    public boolean delete(T clazz){
        if(clazz != null){
           EntityTransaction tx = manager.getTransaction();
           tx.begin();
           clazz = manager.merge(clazz);
           manager.remove(clazz);
           tx.commit();
           return true;
        }
        return false;

    }

    public boolean save(T clazz){
        if(clazz != null){
        	EntityTransaction tx = manager.getTransaction();
    		tx.begin();
    		manager.persist(clazz);
    		tx.commit();
            return true;
        }
        return false;
    }

    @SuppressWarnings("unchecked")
    public boolean update(T clazz){
        T obj = null;
        if(clazz instanceof AeroportBean){
            AeroportBean p = (AeroportBean) clazz;
            obj = (T) Database.getSession().get(clazz.getClass(), p.getIdAeroport());
        }
        else if(clazz instanceof VolBean){
            VolBean c = (VolBean) clazz;
            obj = (T) Database.getSession().get(clazz.getClass(), c.getIdVol());
        }
        else if(clazz instanceof VilleBean){
            VilleBean m = (VilleBean) clazz;
            obj = (T) Database.getSession().get(clazz.getClass(), m.getIdVille());
        }
        else if(clazz instanceof HotelBean){
            HotelBean s = (HotelBean) clazz;
            obj = (T) Database.getSession().get(clazz.getClass(), s.getIdHotel());
        }

        if(obj != null){
            Database.openSession();
            Database.getSession().beginTransaction();
            Database.getSession().saveOrUpdate(obj);
            Database.getSession().getTransaction().commit();
            Database.closeSession();
            return true;
        }
        return false;
    }
}
