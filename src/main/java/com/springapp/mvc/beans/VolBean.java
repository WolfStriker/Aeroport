package com.springapp.mvc.beans;

import javax.persistence.*;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "vol", schema = "", catalog = "aeroport")
public class VolBean {
    private int idVol;
    private String lieuDepart;
    private String lieuArrivee;
    private String dateDepart;
    private String dateArrivee;
    private String prix;

    @Id
    @Column(name = "idVol")
    public int getIdVol() {
        return idVol;
    }

    public void setIdVol(int idVol) {
        this.idVol = idVol;
    }

    @Basic
    @Column(name = "lieuDepart")
    public String getLieuDepart() {
        return lieuDepart;
    }

    public void setLieuDepart(String lieuDepart) {
        this.lieuDepart = lieuDepart;
    }

    @Basic
    @Column(name = "lieuArrivee")
    public String getLieuArrivee() {
        return lieuArrivee;
    }

    public void setLieuArrivee(String lieuArrivee) {
        this.lieuArrivee = lieuArrivee;
    }

    @Basic
    @Column(name = "dateDepart")
    public String getDateDepart() {
        return dateDepart;
    }

    public void setDateDepart(String dateDepart) {
        this.dateDepart = dateDepart;
    }

    @Basic
    @Column(name = "dateArrivee")
    public String getDateArrivee() {
        return dateArrivee;
    }

    public void setDateArrivee(String dateArrivee) {
        this.dateArrivee = dateArrivee;
    }

    @Basic
    @Column(name = "prix")
    public String getPrix() {
        return prix;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VolBean volBean = (VolBean) o;

        if (idVol != volBean.idVol) return false;
        if (dateArrivee != null ? !dateArrivee.equals(volBean.dateArrivee) : volBean.dateArrivee != null) return false;
        if (dateDepart != null ? !dateDepart.equals(volBean.dateDepart) : volBean.dateDepart != null) return false;
        if (lieuArrivee != null ? !lieuArrivee.equals(volBean.lieuArrivee) : volBean.lieuArrivee != null) return false;
        if (lieuDepart != null ? !lieuDepart.equals(volBean.lieuDepart) : volBean.lieuDepart != null) return false;
        if (prix != null ? !prix.equals(volBean.prix) : volBean.prix != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idVol;
        result = 31 * result + (lieuDepart != null ? lieuDepart.hashCode() : 0);
        result = 31 * result + (lieuArrivee != null ? lieuArrivee.hashCode() : 0);
        result = 31 * result + (dateDepart != null ? dateDepart.hashCode() : 0);
        result = 31 * result + (dateArrivee != null ? dateArrivee.hashCode() : 0);
        result = 31 * result + (prix != null ? prix.hashCode() : 0);
        return result;
    }
}
