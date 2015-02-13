package com.springapp.mvc.beans;

/**
 * Created by Antoine on 06/02/2015.
 */
@javax.persistence.Entity
@javax.persistence.Table(name = "ville", schema = "", catalog = "aeroport")
public class VilleBean {
    private int idVille;
    private String nomVille;

    @javax.persistence.Id
    @javax.persistence.Column(name = "idVille")
    public int getIdVille() {
        return idVille;
    }

    public void setIdVille(int idVille) {
        this.idVille = idVille;
    }

    @javax.persistence.Basic
    @javax.persistence.Column(name = "nomVille")
    public String getNomVille() {
        return nomVille;
    }

    public void setNomVille(String nomVille) {
        this.nomVille = nomVille;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VilleBean villeBean = (VilleBean) o;

        if (idVille != villeBean.idVille) return false;
        if (nomVille != null ? !nomVille.equals(villeBean.nomVille) : villeBean.nomVille != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idVille;
        result = 31 * result + (nomVille != null ? nomVille.hashCode() : 0);
        return result;
    }
}
