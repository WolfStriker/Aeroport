package com.springapp.mvc.beans;

/**
 * Created by Antoine on 06/02/2015.
 */
@javax.persistence.Entity
@javax.persistence.Table(name = "hotel", schema = "", catalog = "aeroport")
public class HotelBean {
    private int idHotel;
    private String nomHotel;
    private Integer etoiles;
    private Integer tarif;
    private String hotelcol;

    @javax.persistence.Id
    @javax.persistence.Column(name = "idHotel")
    public int getIdHotel() {
        return idHotel;
    }

    public void setIdHotel(int idHotel) {
        this.idHotel = idHotel;
    }

    @javax.persistence.Basic
    @javax.persistence.Column(name = "nomHotel")
    public String getNomHotel() {
        return nomHotel;
    }

    public void setNomHotel(String nomHotel) {
        this.nomHotel = nomHotel;
    }

    @javax.persistence.Basic
    @javax.persistence.Column(name = "etoiles")
    public Integer getEtoiles() {
        return etoiles;
    }

    public void setEtoiles(Integer etoiles) {
        this.etoiles = etoiles;
    }

    @javax.persistence.Basic
    @javax.persistence.Column(name = "tarif")
    public Integer getTarif() {
        return tarif;
    }

    public void setTarif(Integer tarif) {
        this.tarif = tarif;
    }

    @javax.persistence.Basic
    @javax.persistence.Column(name = "hotelcol")
    public String getHotelcol() {
        return hotelcol;
    }

    public void setHotelcol(String hotelcol) {
        this.hotelcol = hotelcol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HotelBean hotelBean = (HotelBean) o;

        if (idHotel != hotelBean.idHotel) return false;
        if (etoiles != null ? !etoiles.equals(hotelBean.etoiles) : hotelBean.etoiles != null) return false;
        if (hotelcol != null ? !hotelcol.equals(hotelBean.hotelcol) : hotelBean.hotelcol != null) return false;
        if (nomHotel != null ? !nomHotel.equals(hotelBean.nomHotel) : hotelBean.nomHotel != null) return false;
        if (tarif != null ? !tarif.equals(hotelBean.tarif) : hotelBean.tarif != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idHotel;
        result = 31 * result + (nomHotel != null ? nomHotel.hashCode() : 0);
        result = 31 * result + (etoiles != null ? etoiles.hashCode() : 0);
        result = 31 * result + (tarif != null ? tarif.hashCode() : 0);
        result = 31 * result + (hotelcol != null ? hotelcol.hashCode() : 0);
        return result;
    }
}
