package com.springapp.mvc.beans;

import com.springapp.mvc.beans.HotelHasPubliciteBeanPK;

import javax.persistence.*;

/**
 * Created by Antoine on 13/02/2015.
 */
@Entity
@Table(name = "hotel_has_publicite", schema = "", catalog = "aeroport")
@IdClass(HotelHasPubliciteBeanPK.class)
public class HotelHasPubliciteBean {
    private int hotelIdHotel;
    private int publiciteIdPublicite;

    @Id
    @Column(name = "hotel_idHotel")
    public int getHotelIdHotel() {
        return hotelIdHotel;
    }

    public void setHotelIdHotel(int hotelIdHotel) {
        this.hotelIdHotel = hotelIdHotel;
    }

    @Id
    @Column(name = "publicite_idPublicite")
    public int getPubliciteIdPublicite() {
        return publiciteIdPublicite;
    }

    public void setPubliciteIdPublicite(int publiciteIdPublicite) {
        this.publiciteIdPublicite = publiciteIdPublicite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HotelHasPubliciteBean that = (HotelHasPubliciteBean) o;

        if (hotelIdHotel != that.hotelIdHotel) return false;
        if (publiciteIdPublicite != that.publiciteIdPublicite) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hotelIdHotel;
        result = 31 * result + publiciteIdPublicite;
        return result;
    }
}
