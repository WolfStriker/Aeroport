package com.springapp.mvc.beans;

import javax.persistence.*;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "aeroport", schema = "", catalog = "aeroport")
public class AeroportBean {
    private int idAeroport;
    private String nomAeroport;

    @Id
    @Column(name = "idAeroport")
    public int getIdAeroport() {
        return idAeroport;
    }

    public void setIdAeroport(int idAeroport) {
        this.idAeroport = idAeroport;
    }

    @Basic
    @Column(name = "nomAeroport")
    public String getNomAeroport() {
        return nomAeroport;
    }

    public void setNomAeroport(String nomAeroport) {
        this.nomAeroport = nomAeroport;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AeroportBean that = (AeroportBean) o;

        if (idAeroport != that.idAeroport) return false;
        if (nomAeroport != null ? !nomAeroport.equals(that.nomAeroport) : that.nomAeroport != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idAeroport;
        result = 31 * result + (nomAeroport != null ? nomAeroport.hashCode() : 0);
        return result;
    }
}
